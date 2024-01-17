import { 
	convertToDateString, 
	updateUsagePeriodDates,
} from '../loadUsage';
import { DateString } from "../../shared";

const unconvertedDates: Array<DateString> = ['01/Dec/2013', '01/Dec/2014', '30/Apr/2014', '12/Jun/2014'];
const predefinedDateStrings: Array<DateString> = ['2013-12-01', '2014-12-01', '2014-04-30', '2014-06-12'];
const invalidDates: Array<DateString> = ['34/Dec/2013', '01/December/2013', 'Dec 30th 2013', '1/Dec/2013', '01/01/2023', '01/Deb/2023'];

describe('Process DateStrings', () => {

  it('should convert Dates to DateStrings', async () => {
	for (let i = 0; i < unconvertedDates.length; i++) {
		let convertedDateSting = await convertToDateString(unconvertedDates[i]);
		expect(convertedDateSting).toEqual(predefinedDateStrings[i]);
	}
  });

  it('should return null for invalid dates', async () => {
	for (let i = 0; i < invalidDates.length; i++) {
		let convertedDateSting = await convertToDateString(invalidDates[i]);
		expect(convertedDateSting).toEqual(null);
	}
  });

});


describe('Update Usage Periods (compare DateStrings)', () => {

	it('should replace the start date', async () => {
		let startDate: DateString  = '2023-01-01';
  	let endDate: DateString  = '2023-12-01'
		let date: DateString = '2021-12-01';
		({startDate, endDate} = updateUsagePeriodDates(date, startDate, endDate));
		expect(startDate).toEqual(date);
		expect(endDate).toEqual(endDate);
	});
  
	it('should replace the end date', async () => {
		let startDate: DateString  = '2023-01-01';
  	let endDate: DateString  = '2023-12-01'
		let date: DateString = '2030-11-01';
		({startDate, endDate} = updateUsagePeriodDates(date, startDate, endDate));
		expect(startDate).toEqual(startDate);
		expect(endDate).toEqual(date);
	});

	it('start date should remain the same', async () => {
		let startDate: DateString  = '2023-01-01';
  	let endDate: DateString  = '2023-12-01'
		let date: DateString = '2023-01-01';
		({startDate, endDate} = updateUsagePeriodDates(date, startDate, endDate));
		expect(startDate).toEqual(startDate);
		expect(endDate).toEqual(endDate);
	});

	it('should replace the start and end date', async () => {
		let startDate: DateString | undefined  = undefined;
  	let endDate: DateString | undefined  = undefined;
		let date: DateString = '2023-01-01';
		({startDate, endDate} = updateUsagePeriodDates(date, startDate, endDate));
		expect(startDate).toEqual(date);
		expect(endDate).toEqual(date);
	});
	
});