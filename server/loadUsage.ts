import { promisify } from "util";
import { readFile, existsSync } from "fs";
import {
	UsageSummary,
	DateString,
	DailyUsage,
	DailyUsageRecord,
	UsagePeak,
	TimeString
} from "../shared/index";
import { parse } from 'csv-parse/sync';

const readFilePromise = promisify(readFile);

// Note: I'm just returning all errors as "undefined" and handling them with a generic
// error message in the api. Ideally, I would like to return specific errors and handle
// each use case, such as missing file, invalid or missing data/fields, etc.
// However, that level of complexity is out of the scope for the task and the 4 hour time limit.
export async function loadUsage(): Promise<UsageSummary | undefined> {

	// Variables for holding the first and last date of this usage period
	let startDate: DateString | undefined = undefined;
	let endDate: DateString | undefined = undefined;

	// Store the running list here so we don't have to loop through again unnecessarily
	let totalKwh = 0;

	// Parse the CSV to get the usage records
	// TODO: this should not be hardcoded
	const dailyUsageRecordsArray: Array<DailyUsageRecord> = await parseCSV(`${__dirname}/data/example-04-vic-ausnetservices-email-17122014-MyPowerPlanner.csv`);
	if (dailyUsageRecordsArray.length === 0) return undefined;

	// Process energy usage records
	const days: DailyUsage[] = [];
	for (const dailyUsageRecord of dailyUsageRecordsArray) {

		// TODO error handling
		const date = convertToDateString(dailyUsageRecord.date);
		if (date === null) return undefined;

		// Update the start and end dates
		({ startDate, endDate } = updateUsagePeriodDates(date, startDate, endDate));

		// Total kW for the day
		const totalDailyKwh = calculateTotalKwh(dailyUsageRecord);

		// Average Hourly kWh
		const averageHourlyKwh = calculateAverageHourlyKwh(dailyUsageRecord);

		// Calculate Usage Peak
		const usagePeak = calculateUsagePeak(dailyUsageRecord);

		// Add this day to our running list of days
		days.push({
			date,
			totalKwh: totalDailyKwh,
			averageHourlyKwh: averageHourlyKwh,
			usagePeak: usagePeak ? usagePeak : undefined
		});

		// Update our Total kWh total
		totalKwh += totalDailyKwh;
	}

	// Calculate the Average Daily kWh for the whole period
	const averageDailyKwh = totalKwh / days.length;

	return {
		startDate: startDate ? startDate.toString() : "",
		endDate: endDate ? endDate.toString() : "",
		totalKwh: totalKwh,
		averageDailyKwh: averageDailyKwh,
		days: days
	};
}

/**
 * Convert DD/MMM/YYYY string to DateString
 * 
 * @param {string} day - DD/MMM/YYYY format string. eg. 01/Mar/1990
 * @returns {DateString} - ISO8601 ie 2021-02-28
 */
export function convertToDateString(dateString: string): DateString | null {

	// Regex for DD/MMM/YYYY format eg. 01/Mar/1990
	const regex = /^(\d{2})\/([A-Za-z]{3})\/(\d{4})$/;
	if (!regex.test(dateString)) {
		// throw new Error('Invalid date format. Expected DD/MMM/YYYY (eg. 01/Mar/1990)');
		return null;
	}

	// Abbreviated month names and their corresponding number position
	const months: { [key: string]: string } = {
		jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
		jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
	};

	const parts = dateString.split('/');
	const day: string = parts[0];
	const month: string = months[parts[1].toLowerCase()];
	const year: string = parts[2];

	// TODO: validate actual days in any given month
	if (!day || parseFloat(day) < 1 || parseFloat(day) > 31 || !month || !year) {
		// throw new Error('Invalid date components');
		return null;
	}

	return `${year}-${month}-${day}`;
}

/**
 * Updates the start and end dates of a usage period based on a new date.
 * If the new date is earlier than the current start date, or if no start date is set,
 * the start date is updated to this new date. Similarly, if the new date is later
 * than the current end date, or if no end date is set, the end date is updated to this new date.
 * 
 * Note: I did not convert to a date object for the comparison because there is no timezone data, 
 * and it's just a string.
 *
 * @param {DateString} date - The new date to compare with the current start and end dates.
 * @param {DateString} [currentStartDate] - The current start date of the usage period.
 * @param {DateString} [currentEndDate] - The current end date of the usage period.
 * @returns {{startDate: DateString, endDate: DateString}} An object containing the updated start and end dates.
 */
export function updateUsagePeriodDates(date: DateString, currentStartDate?: DateString, currentEndDate?: DateString): { startDate: DateString, endDate: DateString } {
	const startDate = currentStartDate === undefined || date < currentStartDate ? date : currentStartDate;
	const endDate = currentEndDate === undefined || date > currentEndDate ? date : currentEndDate;
	return { startDate, endDate };
}

/**
 * Asynchronously parses a CSV file to extract daily electricity usage records.
 * 
 * This function reads a CSV file from a given file path and parses it into an array
 * of DailyUsageRecord objects. Each record contains the date, a flag indicating if the
 * usage is estimated, and an array of usage data for different time periods within the day.
 * 
 * The CSV file is expected to have columns with date, estimated flag, and various time periods
 * formatted as 'HH:MM - HH:MM' representing the usage data in 24 hour format. The function uses a 
 * regex to identify these time period columns and includes them in the usage array of each record.
 * 
 * @param {string} filePath - The path to the CSV file to be parsed.
 * @returns {Promise<DailyUsageRecord[]>} A promise that resolves to an array of DailyUsageRecord objects.
 * 
 * @typedef {Object} DailyUsageRecord
 * @property {string} date - The date of the usage record.
 * @property {string} estimated - Flag indicating if the usage data is estimated.
 * @property {Array<UsageRecord>} usage - Array of usage data for different time periods.
 */
export async function parseCSV(filePath: string): Promise<DailyUsageRecord[]> {

	/* TODO: improve error handling. I am assuming the files are coming from internal sources and 
			that the fields are present and correct. To improve this, implement additional logic to handle
			missing entries, or bad csv files. Return error messages specifying what the problem is, and where
			the problem occurs in the csv. */

	// Requested file does not exist
	if (!existsSync(filePath)) return []; //throw new Error(`Requested file does not exist ${filePath}`);

	// Read the file into memory
	const data: Buffer = await readFilePromise(filePath);

	// Parse csv file into an array of objects
	const rows: any[] = parse(data, {
		columns: true,
		skip_empty_lines: true,
	});

	// Map data into a format we recognise 
	return rows.map(row => {
		const dailyUsage: DailyUsageRecord = {
			date: row['DATE'],
			estimated: row['ESTIMATED?'],
			usage: []
		};

		for (const key in row) {
			if (key.match(/^\d{2}:\d{2} - \d{2}:\d{2}$/)) { // TODO: There has to be a better way to do this
				dailyUsage.usage.push({
					period: key,
					data: parseFloat(row[key]) // Convert the kW data from a String to a Number
				});
			}
		}

		return dailyUsage;
	});
}

/**
 * Calculate the total kilowatt-hours (kWh) based on the daily usage records provided.
 * 
 * Add up all records and half them, because we are only getting half hourly records.
 * 
 * @param {DailyUsageRecord} dailyUsageRecord - A row of data from the csv. Each row contains multiple half hourly period data of kW.
 * @returns {number} the total kWh (kilowatt-hours) calculated from the daily usage records.
 */
export function calculateTotalKwh(dailyUsageRecord: DailyUsageRecord): number {
	if (dailyUsageRecord.usage.length === 0) return 0;

	return dailyUsageRecord.usage.reduce((total, record) => {
		return total + (record.data * 0.5); // Convert kW to kWh for a half-hour period
	}, 0);
}

/**
 * Calculates the average hourly kWh usage based on a daily usage record.
 * 
 * Formula: Get the total kWh value for all entries, and then divide them by the total number hours in the day.
 * 
 * @param {DailyUsageRecord} dailyUsageRecord -  A row of data from the csv. Each row contains multiple half hourly period data of kW.
 * @returns {number} the average hourly kilowatt-hour (kWh) usage based on the provided daily usage record.
 */
export function calculateAverageHourlyKwh(dailyUsageRecord: DailyUsageRecord): number {
	if (dailyUsageRecord.usage.length === 0) return 0;

	const totalKwh = calculateTotalKwh(dailyUsageRecord);
	return totalKwh / 24;
}

/**
 * Calculates the peak power demand within a day from a record of power usage.
 * 
 * This function processes a record of power usage for a day, which includes
 * usage data in 30-minute intervals. It identifies the one-hour block with the
 * highest total demand (sum of two consecutive 30-minute usage data points) and
 * returns the time of this peak hour along with the corresponding kW demand.
 *
 * @param {DailyUsageRecord} dailyUsageRecord - A record containing power usage data for a day.
 * @returns {UsagePeak | null} - The peak power demand with the hour and kW, or null if no usage data is present.
 *
 * @example
 * // For a dailyUsageRecord with various 30-minute usage data points
 * calculateUsagePeak(dailyUsageRecord);
 * // returns { hour: '17:00', kw: 1.042 } if 17:00 - 18:00 is the peak demand hour
 */
export function calculateUsagePeak(dailyUsageRecord: DailyUsageRecord): UsagePeak | null {
	let maxDemand: number = 0;
	let peakHour: TimeString = '';
	let currentHour: number = 0;
	let currentDemand: number = 0;
	let processedPeriods = new Set();

	if (dailyUsageRecord.usage.length === 0) return null;

	// Process all records. Keep processing until the hour changes.
	// Afterwards, store the highest peak demand we've recorded for this day.
	dailyUsageRecord.usage.forEach((record, index) => {

		/**
		 * Comment: Kane 14/01/2023
		 * Deprecated formula for calculating peak demand.
		 * Moved from determining the HOUR by using a string, which was initially fine because
		 * I assumed that the data keys were always going to be the same. However, different
		 * granularities, or duplicate data won't be handled nicely. So I've converted the 
		 * time period to a date to provide easier calculations.
		 */
		// Get the current hour
		//   const hour = record.period.split(' - ')[0].substring(0, 2);

		//   // Process previous hours data
		//   if (hour !== currentHour) {
		//       // Update highest known max demand
		//       if (currentDemand > maxDemand) {
		//           maxDemand = currentDemand;
		//           peakHour = `${currentHour}:00`;;
		//       }
		//       // Reset for the next hour
		//       currentHour = hour;
		//       currentDemand = 0;
		//   }

		//   // Accumulate kW demand
		//   currentDemand += record.data;

		//   // Check if this is the last record of the hour or the last record in the array
		//   if (index === dailyUsageRecord.usage.length - 1 || dailyUsageRecord.usage[index + 1].period.split(' - ')[0].substring(0, 2) !== hour) {
		//       if (currentDemand > maxDemand) {
		//           maxDemand = currentDemand;
		//           peakHour = `${hour}:00`;
		//       }
		//   }

		/* Refactored calculations using DATE object */
		// Parse the start of the period into a date object - use default date because we only care about HH:MM in 24 hour time.
		const period: string = record.period.split(' - ')[0];
		const periodStart: Date = new Date('1970-01-01 ' + period);

		// Skip this record if the period has already been processed to avoid duplicates
		// This should never occur or be a problem for the given csv file though.
		if (processedPeriods.has(period)) {
			return;
		}
		processedPeriods.add(period);

		// Check if we've moved to a new hour
		if (periodStart.getHours() !== currentHour) {
			// Update peak demand if necessary
			if (currentDemand > maxDemand) {
				maxDemand = currentDemand;
				peakHour = `${currentHour.toString().padStart(2, '0')}:00`;
			}
			// Reset for the next hour
			currentHour = periodStart.getHours();
			currentDemand = 0;
		}

		// Accumulate kW demand
		currentDemand += record.data;

		// Check if this is the last record of the hour or the last record in the array
		const nextRecord = dailyUsageRecord.usage[index + 1];
		const nextPeriodStart = nextRecord ? new Date('1970-01-01 ' + nextRecord.period.split(' - ')[0]) : null;
		if (index === dailyUsageRecord.usage.length - 1 || (nextPeriodStart && nextPeriodStart.getHours() !== currentHour)) {
			if (currentDemand > maxDemand) {
				maxDemand = currentDemand;
				peakHour = `${periodStart.getHours().toString().padStart(2, '0')}:00`;
			}
		}
	});

	return { hour: peakHour, kw: maxDemand };
}