// ISO8601 ie 2021-02-28
export type DateString = string;

// HH:MM in 24hr format ie 17:00
export type TimeString = string;

export interface UsageSummary {
  totalKwh: number;
  averageDailyKwh: number;
  startDate: DateString;
  endDate: DateString;
  days: DailyUsage[];
}

export interface DailyUsage {
  date: DateString;
  totalKwh: number;
  averageHourlyKwh: number;
  usagePeak?: UsagePeak;
}

export interface UsagePeak {
  hour: TimeString;
  kw: number;
}

// Row entries from the CSV file excluding columns we can 'ignore'
export interface DailyUsageRecord {
	date: string,
	estimated: string,
	usage: Array<UsageRecord>
}
  
// Half hourly kW readings from the csv file
export interface UsageRecord {
	period: string, // TODO: change to start/end time?
	data: number
}