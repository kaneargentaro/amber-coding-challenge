import { parseCSV } from '../loadUsage';
import { DailyUsageRecord } from "../../shared";

describe('CSV Parser Tests', () => {
  it('should correctly parse a valid CSV file', async () => {
    const result: DailyUsageRecord[] = await parseCSV('./server/data/example-04-vic-ausnetservices-email-17122014-MyPowerPlanner.csv');
    expect(result).toBeInstanceOf(Array);

		// 366 days (rows) of data excluding headings
    expect(result).toHaveLength(366);
	
		// Copy and paste the first row to make sure that parsed properly
		expect(result[0]).toEqual({
			date: '01/Dec/2013',
			estimated: 'N',
			usage: [
				{ period: '00:00 - 00:30', data: 0.07 },
				{ period: '00:30 - 01:00', data: 0.089 },
				{ period: '01:00 - 01:30', data: 0.095 },
				{ period: '01:30 - 02:00', data: 0.127 },
				{ period: '02:00 - 02:30', data: 0.143 },
				{ period: '02:30 - 03:00', data: 0.141 },
				{ period: '03:00 - 03:30', data: 0.135 },
				{ period: '03:30 - 04:00', data: 0.117 },
				{ period: '04:00 - 04:30', data: 0.14 },
				{ period: '04:30 - 05:00', data: 0.14 },
				{ period: '05:00 - 05:30', data: 0.148 },
				{ period: '05:30 - 06:00', data: 0.113 },
				{ period: '06:00 - 06:30', data: 0.133 },
				{ period: '06:30 - 07:00', data: 0.273 },
				{ period: '07:00 - 07:30', data: 0.143 },
				{ period: '07:30 - 08:00', data: 0.077 },
				{ period: '08:00 - 08:30', data: 0.198 },
				{ period: '08:30 - 09:00', data: 0.258 },
				{ period: '09:00 - 09:30', data: 0.188 },
				{ period: '09:30 - 10:00', data: 0.085 },
				{ period: '10:00 - 10:30', data: 0.089 },
				{ period: '10:30 - 11:00', data: 0.135 },
				{ period: '11:00 - 11:30', data: 0.114 },
				{ period: '11:30 - 12:00', data: 0.102 },
				{ period: '12:00 - 12:30', data: 0.083 },
				{ period: '12:30 - 13:00', data: 0.086 },
				{ period: '13:00 - 13:30', data: 0.083 },
				{ period: '13:30 - 14:00', data: 0.08 },
				{ period: '14:00 - 14:30', data: 0.081 },
				{ period: '14:30 - 15:00', data: 0.067 },
				{ period: '15:00 - 15:30', data: 0.096 },
				{ period: '15:30 - 16:00', data: 0.109 },
				{ period: '16:00 - 16:30', data: 0.079 },
				{ period: '16:30 - 17:00', data: 0.517 },
				{ period: '17:00 - 17:30', data: 0.525 },
				{ period: '17:30 - 18:00', data: 0.467 },
				{ period: '18:00 - 18:30', data: 0.989 },
				{ period: '18:30 - 19:00', data: 0.558 },
				{ period: '19:00 - 19:30', data: 0.152 },
				{ period: '19:30 - 20:00', data: 0.214 },
				{ period: '20:00 - 20:30', data: 0.192 },
				{ period: '20:30 - 21:00', data: 0.283 },
				{ period: '21:00 - 21:30', data: 0.327 },
				{ period: '21:30 - 22:00', data: 0.48 },
				{ period: '22:00 - 22:30', data: 0.197 },
				{ period: '22:30 - 23:00', data: 0.339 },
				{ period: '23:00 - 23:30', data: 0.217 },
				{ period: '23:30 - 00:00', data: 0.116 }
			]
		});

		// Copy and paste the last row to make sure that parsed properly
		expect(result[365]).toEqual({
			date: '01/Dec/2014',
			estimated: 'N',
			usage: [
				{ period: '00:00 - 00:30', data: 0.083 },
				{ period: '00:30 - 01:00', data: 0.09 },
				{ period: '01:00 - 01:30', data: 0.091 },
				{ period: '01:30 - 02:00', data: 0.077 },
				{ period: '02:00 - 02:30', data: 0.066 },
				{ period: '02:30 - 03:00', data: 0.08 },
				{ period: '03:00 - 03:30', data: 0.079 },
				{ period: '03:30 - 04:00', data: 0.077 },
				{ period: '04:00 - 04:30', data: 0.085 },
				{ period: '04:30 - 05:00', data: 0.052 },
				{ period: '05:00 - 05:30', data: 0.198 },
				{ period: '05:30 - 06:00', data: 0.173 },
				{ period: '06:00 - 06:30', data: 0.08 },
				{ period: '06:30 - 07:00', data: 0.089 },
				{ period: '07:00 - 07:30', data: 0.082 },
				{ period: '07:30 - 08:00', data: 0.204 },
				{ period: '08:00 - 08:30', data: 0.407 },
				{ period: '08:30 - 09:00', data: 0.845 },
				{ period: '09:00 - 09:30', data: 0.432 },
				{ period: '09:30 - 10:00', data: 0.517 },
				{ period: '10:00 - 10:30', data: 0.273 },
				{ period: '10:30 - 11:00', data: 0.16 },
				{ period: '11:00 - 11:30', data: 0.147 },
				{ period: '11:30 - 12:00', data: 0.143 },
				{ period: '12:00 - 12:30', data: 0.136 },
				{ period: '12:30 - 13:00', data: 0.163 },
				{ period: '13:00 - 13:30', data: 0.225 },
				{ period: '13:30 - 14:00', data: 0.451 },
				{ period: '14:00 - 14:30', data: 0.245 },
				{ period: '14:30 - 15:00', data: 0.159 },
				{ period: '15:00 - 15:30', data: 0.153 },
				{ period: '15:30 - 16:00', data: 0.148 },
				{ period: '16:00 - 16:30', data: 1.053 },
				{ period: '16:30 - 17:00', data: 1.868 },
				{ period: '17:00 - 17:30', data: 0.778 },
				{ period: '17:30 - 18:00', data: 0.767 },
				{ period: '18:00 - 18:30', data: 0.874 },
				{ period: '18:30 - 19:00', data: 0.268 },
				{ period: '19:00 - 19:30', data: 0.171 },
				{ period: '19:30 - 20:00', data: 0.191 },
				{ period: '20:00 - 20:30', data: 0.227 },
				{ period: '20:30 - 21:00', data: 0.1 },
				{ period: '21:00 - 21:30', data: 0.069 },
				{ period: '21:30 - 22:00', data: 0.084 },
				{ period: '22:00 - 22:30', data: 0.08 },
				{ period: '22:30 - 23:00', data: 0.066 },
				{ period: '23:00 - 23:30', data: 0.069 },
				{ period: '23:30 - 00:00', data: 0.083 }
			]
		});
  });

  it('should handle empty CSV files gracefully', async () => {
    const result = await parseCSV('./server/test/emptyCSV.csv');
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
  });

	it('should handle CSV files with missing NMI, METER SERIAL NUMBER, and CON/GEN columns', async () => {
    const result = await parseCSV('./server/test/missingOptionalColumn.csv');
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
		result.forEach(item => {
			expect(item).not.toHaveProperty('NMI');
			expect(item).not.toHaveProperty('CON/GEN');
			expect(item).not.toHaveProperty('METER SERIAL NUMBER');
		});
  });

	it('should handle CSV files with missing DATE columns', async () => {
    const result = await parseCSV('./server/test/missingDateColumn.csv');
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
		result.forEach(item => {
			expect(item).toHaveProperty('date');
			expect(item.date).toEqual(undefined);
		});
  });

	it('should handle CSV files with additional columns by ignoring them', async () => {
    const result = await parseCSV('./server/test/additionalColumn.csv');
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
		result.forEach(item => {
			expect(item).not.toHaveProperty('NEW HEADER');
		});
  });

  it('should return an empty array for non-existent files', async () => {
		const result = await parseCSV('./server/test/NotValid.csv');
		expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(0);
	});

//   it('should throw an error for non-existent files', async () => {
// 		const filePath: string = './server/test/NotValid.csv'
//     await expect(() => parseCSV(filePath)).toThrow(`Requested file does not exist ${filePath}`);
//   });
});