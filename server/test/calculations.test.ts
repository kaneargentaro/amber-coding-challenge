import {
	calculateAverageHourlyKwh,
	calculateTotalKwh,
	calculateUsagePeak,
	loadUsage
} from '../loadUsage';
import {
	DailyUsageRecord,
	UsagePeak
} from "../../shared";

const dummyData: DailyUsageRecord[] = [
	{
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
	},
	{
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
	},
	{
		date: '03/Feb/2014',
		estimated: 'N',
		usage: [
			{ period: '00:00 - 00:30', data: 0.183 },
			{ period: '00:30 - 01:00', data: 0.181 },
			{ period: '01:00 - 01:30', data: 0.179 },
			{ period: '01:30 - 02:00', data: 0.18 },
			{ period: '02:00 - 02:30', data: 0.179 },
			{ period: '02:30 - 03:00', data: 0.178 },
			{ period: '03:00 - 03:30', data: 0.178 },
			{ period: '03:30 - 04:00', data: 0.174 },
			{ period: '04:00 - 04:30', data: 0.17 },
			{ period: '04:30 - 05:00', data: 0.165 },
			{ period: '05:00 - 05:30', data: 0.227 },
			{ period: '05:30 - 06:00', data: 0.231 },
			{ period: '06:00 - 06:30', data: 0.112 },
			{ period: '06:30 - 07:00', data: 0.137 },
			{ period: '07:00 - 07:30', data: 0.098 },
			{ period: '07:30 - 08:00', data: 0.12 },
			{ period: '08:00 - 08:30', data: 0.11 },
			{ period: '08:30 - 09:00', data: 0.079 },
			{ period: '09:00 - 09:30', data: 0.082 },
			{ period: '09:30 - 10:00', data: 0.081 },
			{ period: '10:00 - 10:30', data: 0.137 },
			{ period: '10:30 - 11:00', data: 0.557 },
			{ period: '11:00 - 11:30', data: 0.57 },
			{ period: '11:30 - 12:00', data: 0.08 },
			{ period: '12:00 - 12:30', data: 0.075 },
			{ period: '12:30 - 13:00', data: 0.077 },
			{ period: '13:00 - 13:30', data: 0.078 },
			{ period: '13:30 - 14:00', data: 0.133 },
			{ period: '14:00 - 14:30', data: 0.592 },
			{ period: '14:30 - 15:00', data: 0.658 },
			{ period: '15:00 - 15:30', data: 0.334 },
			{ period: '15:30 - 16:00', data: 0.09 },
			{ period: '16:00 - 16:30', data: 0.109 },
			{ period: '16:30 - 17:00', data: 0.208 },
			{ period: '17:00 - 17:30', data: 0.292 },
			{ period: '17:30 - 18:00', data: 0.129 },
			{ period: '18:00 - 18:30', data: 0.131 },
			{ period: '18:30 - 19:00', data: 0.212 },
			{ period: '19:00 - 19:30', data: 0.233 },
			{ period: '19:30 - 20:00', data: 0.298 },
			{ period: '20:00 - 20:30', data: 0.28 },
			{ period: '20:30 - 21:00', data: 0.413 },
			{ period: '21:00 - 21:30', data: 0.217 },
			{ period: '21:30 - 22:00', data: 0.271 },
			{ period: '22:00 - 22:30', data: 0.196 },
			{ period: '22:30 - 23:00', data: 0.193 },
			{ period: '23:00 - 23:30', data: 0.187 },
			{ period: '23:30 - 00:00', data: 0.18 }
		]
	},
	{
		date: '01/Jan/2014',
		estimated: 'N',
		usage: [
			{ period: '00:00 - 00:30', data: 0.051 },
			{ period: '00:30 - 01:00', data: 0.049 },
			{ period: '01:00 - 01:30', data: 0.057 },
			{ period: '01:30 - 02:00', data: 0.056 },
			{ period: '02:00 - 02:30', data: 0.056 },
			{ period: '02:30 - 03:00', data: 0.056 },
			{ period: '03:00 - 03:30', data: 0.058 },
			{ period: '03:30 - 04:00', data: 0.053 },
			{ period: '04:00 - 04:30', data: 0.05 },
			{ period: '04:30 - 05:00', data: 0.051 },
			{ period: '05:00 - 05:30', data: 0.052 },
			{ period: '05:30 - 06:00', data: 0.051 },
			{ period: '06:00 - 06:30', data: 0.056 },
			{ period: '06:30 - 07:00', data: 0.058 },
			{ period: '07:00 - 07:30', data: 0.058 },
			{ period: '07:30 - 08:00', data: 0.06 },
			{ period: '08:00 - 08:30', data: 0.056 },
			{ period: '08:30 - 09:00', data: 0.062 },
			{ period: '09:00 - 09:30', data: 0.051 },
			{ period: '09:30 - 10:00', data: 0.051 },
			{ period: '10:00 - 10:30', data: 0.053 },
			{ period: '10:30 - 11:00', data: 0.052 },
			{ period: '11:00 - 11:30', data: 0.052 },
			{ period: '11:30 - 12:00', data: 0.056 },
			{ period: '12:00 - 12:30', data: 0.058 },
			{ period: '12:30 - 13:00', data: 0.056 },
			{ period: '13:00 - 13:30', data: 0.057 },
			{ period: '13:30 - 14:00', data: 0.053 },
			{ period: '14:00 - 14:30', data: 0.053 },
			{ period: '14:30 - 15:00', data: 0.052 },
			{ period: '15:00 - 15:30', data: 0.05 },
			{ period: '15:30 - 16:00', data: 0.092 },
			{ period: '16:00 - 16:30', data: 0.086 },
			{ period: '16:30 - 17:00', data: 0.059 },
			{ period: '17:00 - 17:30', data: 0.055 },
			{ period: '17:30 - 18:00', data: 0.052 },
			{ period: '18:00 - 18:30', data: 0.051 },
			{ period: '18:30 - 19:00', data: 0.058 },
			{ period: '19:00 - 19:30', data: 0.056 },
			{ period: '19:30 - 20:00', data: 0.056 },
			{ period: '20:00 - 20:30', data: 0.055 },
			{ period: '20:30 - 21:00', data: 0.056 },
			{ period: '21:00 - 21:30', data: 0.058 },
			{ period: '21:30 - 22:00', data: 0.055 },
			{ period: '22:00 - 22:30', data: 0.052 },
			{ period: '22:30 - 23:00', data: 0.051 },
			{ period: '23:00 - 23:30', data: 0.05 },
			{ period: '23:30 - 00:00', data: 0.052 }
		]
	}
]

describe('Calculate Total kWh Tests', () => {

	it('should calculate total kWh for each day', async () => {
		const totalKwhPerDay: Array<number> = [4.795000000000001, 6.479000000000001, 4.986999999999999, 1.3390000000000004];
		for (let i = 0; i < dummyData.length; i++) {
			let calculatedTotalKwh = await calculateTotalKwh(dummyData[i]);
			let calcKwhTotal = dummyData[i].usage.reduce((total, record) => {
				return total + (record.data * 0.5)
			}, 0);

			// Check against a precalculated figure
			expect(calculatedTotalKwh).toEqual(totalKwhPerDay[i]);

			// Check against a calculation done on the fly
			expect(calculatedTotalKwh).toEqual(calcKwhTotal);
		}
	});

	it('should return 0 if there is no data', async () => {
		let noDataRecord: DailyUsageRecord = {
			date: '01/Dec/2013',
			estimated: 'N',
			usage: []
		}
		let totalKwh = await calculateTotalKwh(noDataRecord);
		expect(totalKwh).toEqual(0);
	});

});

describe('Calculate Average Hourly kWh Tests', () => {

	it('should calculate average hourly kWh for each day', async () => {
		const predefinedAvgHourlyKwh: Array<number> = [0.1997916666666667, 0.26995833333333336, 0.20779166666666662, 0.055791666666666684];
		for (let i = 0; i < dummyData.length; i++) {
			let calculatedAvgHourlyKwh = await calculateAverageHourlyKwh(dummyData[i]);

			// Calculate it on the fly
			let calcKwhTotal = dummyData[i].usage.reduce((total, record) => {
				return total + (record.data * 0.5)
			}, 0);
			let calcAvgHourlyKwh = calcKwhTotal / 24;

			// Check against a precalculated figure
			expect(calculatedAvgHourlyKwh).toEqual(predefinedAvgHourlyKwh[i]);

			// Check against a calculation done on the fly
			expect(calculatedAvgHourlyKwh).toEqual(calcAvgHourlyKwh);
		}
	});

	it('should return 0 if there is no data', async () => {
		let noDataRecord: DailyUsageRecord = {
			date: '01/Dec/2013',
			estimated: 'N',
			usage: []
		}
		let calculatedAverageHourlyKwh = await calculateAverageHourlyKwh(noDataRecord);
		expect(calculatedAverageHourlyKwh).toEqual(0);
	});

});

describe('Calculate Peak Demand Tests', () => {

	it('should calculate peak demand for each day', async () => {
		const predefinedPeakDemand: Array<{ hour: string; kw: number }> = [
			{
				hour: "18:00",
				kw: 1.5470000000000002
			}, {
				hour: "16:00",
				kw: 2.9210000000000003
			}, {
				hour: "14:00",
				kw: 1.25
			}, {
				hour: "16:00",
				kw: 0.145
			}
		];

		for (let i = 0; i < dummyData.length; i++) {
			let usagePeak: UsagePeak | null = await calculateUsagePeak(dummyData[i]);
			expect(usagePeak).not.toBeNull();
			expect(usagePeak!).toHaveProperty('hour');
			expect(usagePeak!).toHaveProperty('kw');
			expect(typeof usagePeak!.hour).toBe('string');
			expect(typeof usagePeak!.kw).toBe('number');
			expect(usagePeak!.hour).toEqual(predefinedPeakDemand[i].hour);
			expect(usagePeak!.kw).toEqual(predefinedPeakDemand[i].kw);
		}
	});

	it('should return null if there is no data', async () => {
		let noDataRecord: DailyUsageRecord = {
			date: '01/Dec/2013',
			estimated: 'N',
			usage: []
		}
		let usagePeak: UsagePeak | null = await calculateUsagePeak(noDataRecord);
		expect(usagePeak).toEqual(null);
	});

	it('should ignore duplicate time periods for peak demand', async () => {
	  const predefinedPeakDemand: UsagePeak = { hour: "18:00", kw: 1.5470000000000002 };
	  
		let usagePeak: UsagePeak | null = await calculateUsagePeak({
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
				{ period: '18:00 - 18:30', data: 0.989 }, // multiple duplicates
				{ period: '18:00 - 18:30', data: 0.989 }, // multiple duplicates
				{ period: '18:00 - 18:30', data: 0.989 }, // multiple duplicates
				{ period: '18:00 - 18:30', data: 0.989 }, // multiple duplicates
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
		
		expect(usagePeak).not.toBeNull();
		expect(usagePeak!).toHaveProperty('hour');
		expect(usagePeak!).toHaveProperty('kw');
		expect(typeof usagePeak!.hour).toBe('string');
		expect(typeof usagePeak!.kw).toBe('number');
		expect(usagePeak!.hour).toEqual(predefinedPeakDemand.hour);
		expect(usagePeak!.kw).toEqual(predefinedPeakDemand.kw);
	});

	it('should ignore overlapping granularity time periods for peak demand', async () => {
	  const predefinedPeakDemand: UsagePeak = { hour: "02:00", kw: 0.284 };
	  
		let usagePeak: UsagePeak | null = await calculateUsagePeak({
			date: '01/Dec/2013',
			estimated: 'N',
			usage: [
				{ period: '00:00 - 00:30', data: 0.07 },
				{ period: '00:00 - 00:15', data: 100.07 }, //should ignore
				{ period: '00:30 - 01:00', data: 0.089 },
				{ period: '01:00 - 01:30', data: 0.095 },
				{ period: '01:30 - 02:00', data: 0.127 },
				{ period: '02:00 - 02:30', data: 0.143 },
				{ period: '02:30 - 03:00', data: 0.141 }
			]
		});

		expect(usagePeak).not.toBeNull();
		expect(usagePeak!).toHaveProperty('hour');
		expect(usagePeak!).toHaveProperty('kw');
		expect(typeof usagePeak!.hour).toBe('string');
		expect(typeof usagePeak!.kw).toBe('number');
		expect(usagePeak!.hour).toEqual(predefinedPeakDemand.hour);
		expect(usagePeak!.kw).toEqual(predefinedPeakDemand.kw);
	});

});

describe('loadUsage Tests', () => {

  test('should return the correct usage summary', async () => {
    const loadUsageResult = {
			"startDate": "2013-12-01",
			"endDate": "2014-12-01",
			"totalKwh": 1364.916499999999,
			"averageDailyKwh": 3.7292800546448057,
			"days": [
					{
							"date": "2013-12-01",
							"totalKwh": 4.795000000000001,
							"averageHourlyKwh": 0.1997916666666667,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.5470000000000002
							}
					},
					{
							"date": "2013-12-02",
							"totalKwh": 6.504,
							"averageHourlyKwh": 0.27099999999999996,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.555
							}
					},
					{
							"date": "2013-12-03",
							"totalKwh": 4.2975,
							"averageHourlyKwh": 0.1790625,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.262
							}
					},
					{
							"date": "2013-12-04",
							"totalKwh": 3.6205000000000003,
							"averageHourlyKwh": 0.15085416666666668,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.477
							}
					},
					{
							"date": "2013-12-05",
							"totalKwh": 3.472,
							"averageHourlyKwh": 0.14466666666666667,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.865
							}
					},
					{
							"date": "2013-12-06",
							"totalKwh": 4.02,
							"averageHourlyKwh": 0.16749999999999998,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.885
							}
					},
					{
							"date": "2013-12-07",
							"totalKwh": 2.343500000000001,
							"averageHourlyKwh": 0.09764583333333338,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.7230000000000001
							}
					},
					{
							"date": "2013-12-08",
							"totalKwh": 2.8835,
							"averageHourlyKwh": 0.12014583333333334,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.785
							}
					},
					{
							"date": "2013-12-09",
							"totalKwh": 3.1810000000000005,
							"averageHourlyKwh": 0.1325416666666667,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.534
							}
					},
					{
							"date": "2013-12-10",
							"totalKwh": 2.6205,
							"averageHourlyKwh": 0.10918749999999999,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.554
							}
					},
					{
							"date": "2013-12-11",
							"totalKwh": 3.6339999999999995,
							"averageHourlyKwh": 0.15141666666666664,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.7839999999999999
							}
					},
					{
							"date": "2013-12-12",
							"totalKwh": 2.6585000000000005,
							"averageHourlyKwh": 0.11077083333333336,
							"usagePeak": {
									"hour": "05:00",
									"kw": 0.451
							}
					},
					{
							"date": "2013-12-13",
							"totalKwh": 3.6239999999999997,
							"averageHourlyKwh": 0.151,
							"usagePeak": {
									"hour": "12:00",
									"kw": 0.986
							}
					},
					{
							"date": "2013-12-14",
							"totalKwh": 3.7615000000000007,
							"averageHourlyKwh": 0.1567291666666667,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.717
							}
					},
					{
							"date": "2013-12-15",
							"totalKwh": 3.1150000000000007,
							"averageHourlyKwh": 0.1297916666666667,
							"usagePeak": {
									"hour": "12:00",
									"kw": 0.903
							}
					},
					{
							"date": "2013-12-16",
							"totalKwh": 3.433000000000001,
							"averageHourlyKwh": 0.1430416666666667,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.607
							}
					},
					{
							"date": "2013-12-17",
							"totalKwh": 2.8260000000000005,
							"averageHourlyKwh": 0.11775000000000002,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.6799999999999999
							}
					},
					{
							"date": "2013-12-18",
							"totalKwh": 4.637499999999999,
							"averageHourlyKwh": 0.19322916666666665,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.3719999999999999
							}
					},
					{
							"date": "2013-12-19",
							"totalKwh": 6.25,
							"averageHourlyKwh": 0.2604166666666667,
							"usagePeak": {
									"hour": "20:00",
									"kw": 1.442
							}
					},
					{
							"date": "2013-12-20",
							"totalKwh": 7.023999999999999,
							"averageHourlyKwh": 0.29266666666666663,
							"usagePeak": {
									"hour": "12:00",
									"kw": 3.363
							}
					},
					{
							"date": "2013-12-21",
							"totalKwh": 6.793500000000001,
							"averageHourlyKwh": 0.28306250000000005,
							"usagePeak": {
									"hour": "13:00",
									"kw": 2.8179999999999996
							}
					},
					{
							"date": "2013-12-22",
							"totalKwh": 4.941,
							"averageHourlyKwh": 0.205875,
							"usagePeak": {
									"hour": "11:00",
									"kw": 1.352
							}
					},
					{
							"date": "2013-12-23",
							"totalKwh": 4.280999999999999,
							"averageHourlyKwh": 0.17837499999999995,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.927
							}
					},
					{
							"date": "2013-12-24",
							"totalKwh": 3.5444999999999993,
							"averageHourlyKwh": 0.14768749999999997,
							"usagePeak": {
									"hour": "15:00",
									"kw": 0.65
							}
					},
					{
							"date": "2013-12-25",
							"totalKwh": 3.731,
							"averageHourlyKwh": 0.15545833333333334,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.9590000000000001
							}
					},
					{
							"date": "2013-12-26",
							"totalKwh": 2.1265000000000005,
							"averageHourlyKwh": 0.08860416666666669,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.704
							}
					},
					{
							"date": "2013-12-27",
							"totalKwh": 1.4165,
							"averageHourlyKwh": 0.059020833333333335,
							"usagePeak": {
									"hour": "02:00",
									"kw": 0.14500000000000002
							}
					},
					{
							"date": "2013-12-28",
							"totalKwh": 2.1239999999999997,
							"averageHourlyKwh": 0.08849999999999998,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.362
							}
					},
					{
							"date": "2013-12-29",
							"totalKwh": 2.302000000000001,
							"averageHourlyKwh": 0.0959166666666667,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.7050000000000001
							}
					},
					{
							"date": "2013-12-30",
							"totalKwh": 1.4880000000000004,
							"averageHourlyKwh": 0.06200000000000002,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.259
							}
					},
					{
							"date": "2013-12-31",
							"totalKwh": 1.3885,
							"averageHourlyKwh": 0.05785416666666667,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.219
							}
					},
					{
							"date": "2014-01-01",
							"totalKwh": 1.3390000000000004,
							"averageHourlyKwh": 0.055791666666666684,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.145
							}
					},
					{
							"date": "2014-01-02",
							"totalKwh": 1.4445000000000001,
							"averageHourlyKwh": 0.060187500000000005,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.174
							}
					},
					{
							"date": "2014-01-03",
							"totalKwh": 2.8720000000000003,
							"averageHourlyKwh": 0.11966666666666669,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.6
							}
					},
					{
							"date": "2014-01-04",
							"totalKwh": 3.009,
							"averageHourlyKwh": 0.125375,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.603
							}
					},
					{
							"date": "2014-01-05",
							"totalKwh": 4.4334999999999996,
							"averageHourlyKwh": 0.18472916666666664,
							"usagePeak": {
									"hour": "09:00",
									"kw": 1.0470000000000002
							}
					},
					{
							"date": "2014-01-06",
							"totalKwh": 3.0174999999999996,
							"averageHourlyKwh": 0.12572916666666664,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.739
							}
					},
					{
							"date": "2014-01-07",
							"totalKwh": 5.393500000000001,
							"averageHourlyKwh": 0.22472916666666673,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.916
							}
					},
					{
							"date": "2014-01-08",
							"totalKwh": 4.6995000000000005,
							"averageHourlyKwh": 0.19581250000000003,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.45
							}
					},
					{
							"date": "2014-01-09",
							"totalKwh": 2.735,
							"averageHourlyKwh": 0.11395833333333333,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.754
							}
					},
					{
							"date": "2014-01-10",
							"totalKwh": 2.9515000000000002,
							"averageHourlyKwh": 0.12297916666666668,
							"usagePeak": {
									"hour": "20:00",
									"kw": 1.407
							}
					},
					{
							"date": "2014-01-11",
							"totalKwh": 4.218500000000001,
							"averageHourlyKwh": 0.17577083333333335,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.545
							}
					},
					{
							"date": "2014-01-12",
							"totalKwh": 3.950500000000001,
							"averageHourlyKwh": 0.1646041666666667,
							"usagePeak": {
									"hour": "13:00",
									"kw": 1.139
							}
					},
					{
							"date": "2014-01-13",
							"totalKwh": 6.858000000000001,
							"averageHourlyKwh": 0.28575000000000006,
							"usagePeak": {
									"hour": "20:00",
									"kw": 1.4180000000000001
							}
					},
					{
							"date": "2014-01-14",
							"totalKwh": 2.101000000000001,
							"averageHourlyKwh": 0.0875416666666667,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.366
							}
					},
					{
							"date": "2014-01-15",
							"totalKwh": 10.450499999999998,
							"averageHourlyKwh": 0.4354374999999999,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.4700000000000002
							}
					},
					{
							"date": "2014-01-16",
							"totalKwh": 11.781000000000002,
							"averageHourlyKwh": 0.4908750000000001,
							"usagePeak": {
									"hour": "19:00",
									"kw": 1.465
							}
					},
					{
							"date": "2014-01-17",
							"totalKwh": 5.999499999999999,
							"averageHourlyKwh": 0.24997916666666664,
							"usagePeak": {
									"hour": "19:00",
									"kw": 1.4489999999999998
							}
					},
					{
							"date": "2014-01-18",
							"totalKwh": 4.827999999999999,
							"averageHourlyKwh": 0.20116666666666663,
							"usagePeak": {
									"hour": "03:00",
									"kw": 0.917
							}
					},
					{
							"date": "2014-01-19",
							"totalKwh": 2.979,
							"averageHourlyKwh": 0.124125,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.445
							}
					},
					{
							"date": "2014-01-20",
							"totalKwh": 6.204499999999999,
							"averageHourlyKwh": 0.25852083333333326,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.92
							}
					},
					{
							"date": "2014-01-21",
							"totalKwh": 4.5315,
							"averageHourlyKwh": 0.18881250000000002,
							"usagePeak": {
									"hour": "15:00",
									"kw": 2.2350000000000003
							}
					},
					{
							"date": "2014-01-22",
							"totalKwh": 4.9834999999999985,
							"averageHourlyKwh": 0.20764583333333328,
							"usagePeak": {
									"hour": "16:00",
									"kw": 3.3499999999999996
							}
					},
					{
							"date": "2014-01-23",
							"totalKwh": 6.3965000000000005,
							"averageHourlyKwh": 0.2665208333333334,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.487
							}
					},
					{
							"date": "2014-01-24",
							"totalKwh": 2.903000000000002,
							"averageHourlyKwh": 0.1209583333333334,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.698
							}
					},
					{
							"date": "2014-01-25",
							"totalKwh": 2.5880000000000005,
							"averageHourlyKwh": 0.10783333333333335,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.433
							}
					},
					{
							"date": "2014-01-26",
							"totalKwh": 4.143000000000001,
							"averageHourlyKwh": 0.17262500000000003,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.104
							}
					},
					{
							"date": "2014-01-27",
							"totalKwh": 8.645999999999997,
							"averageHourlyKwh": 0.3602499999999999,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.949
							}
					},
					{
							"date": "2014-01-28",
							"totalKwh": 4.970000000000001,
							"averageHourlyKwh": 0.20708333333333337,
							"usagePeak": {
									"hour": "19:00",
									"kw": 1.302
							}
					},
					{
							"date": "2014-01-29",
							"totalKwh": 5.941000000000001,
							"averageHourlyKwh": 0.2475416666666667,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.339
							}
					},
					{
							"date": "2014-01-30",
							"totalKwh": 6.927999999999999,
							"averageHourlyKwh": 0.2886666666666666,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.51
							}
					},
					{
							"date": "2014-01-31",
							"totalKwh": 6.361000000000003,
							"averageHourlyKwh": 0.2650416666666668,
							"usagePeak": {
									"hour": "13:00",
									"kw": 2.087
							}
					},
					{
							"date": "2014-02-01",
							"totalKwh": 7.738999999999999,
							"averageHourlyKwh": 0.3224583333333333,
							"usagePeak": {
									"hour": "12:00",
									"kw": 1.69
							}
					},
					{
							"date": "2014-02-02",
							"totalKwh": 8.869500000000002,
							"averageHourlyKwh": 0.36956250000000007,
							"usagePeak": {
									"hour": "19:00",
									"kw": 1.666
							}
					},
					{
							"date": "2014-02-03",
							"totalKwh": 4.986999999999999,
							"averageHourlyKwh": 0.20779166666666662,
							"usagePeak": {
									"hour": "14:00",
									"kw": 1.25
							}
					},
					{
							"date": "2014-02-04",
							"totalKwh": 5.683,
							"averageHourlyKwh": 0.23679166666666665,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.471
							}
					},
					{
							"date": "2014-02-05",
							"totalKwh": 6.566000000000002,
							"averageHourlyKwh": 0.2735833333333334,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.5070000000000001
							}
					},
					{
							"date": "2014-02-06",
							"totalKwh": 8.2895,
							"averageHourlyKwh": 0.34539583333333335,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.712
							}
					},
					{
							"date": "2014-02-07",
							"totalKwh": 7.222,
							"averageHourlyKwh": 0.30091666666666667,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.389
							}
					},
					{
							"date": "2014-02-08",
							"totalKwh": 2.5780000000000007,
							"averageHourlyKwh": 0.1074166666666667,
							"usagePeak": {
									"hour": "19:00",
									"kw": 0.598
							}
					},
					{
							"date": "2014-02-09",
							"totalKwh": 2.945500000000001,
							"averageHourlyKwh": 0.12272916666666671,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.082
							}
					},
					{
							"date": "2014-02-10",
							"totalKwh": 6.093000000000001,
							"averageHourlyKwh": 0.253875,
							"usagePeak": {
									"hour": "14:00",
									"kw": 2.643
							}
					},
					{
							"date": "2014-02-11",
							"totalKwh": 4.8345,
							"averageHourlyKwh": 0.20143750000000002,
							"usagePeak": {
									"hour": "20:00",
									"kw": 1.317
							}
					},
					{
							"date": "2014-02-12",
							"totalKwh": 4.7139999999999995,
							"averageHourlyKwh": 0.19641666666666666,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.7639999999999998
							}
					},
					{
							"date": "2014-02-13",
							"totalKwh": 4.152500000000001,
							"averageHourlyKwh": 0.17302083333333337,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.4660000000000002
							}
					},
					{
							"date": "2014-02-14",
							"totalKwh": 4.348,
							"averageHourlyKwh": 0.18116666666666667,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.19
							}
					},
					{
							"date": "2014-02-15",
							"totalKwh": 5.2965,
							"averageHourlyKwh": 0.2206875,
							"usagePeak": {
									"hour": "12:00",
									"kw": 1.549
							}
					},
					{
							"date": "2014-02-16",
							"totalKwh": 3.0235000000000003,
							"averageHourlyKwh": 0.12597916666666667,
							"usagePeak": {
									"hour": "19:00",
									"kw": 0.626
							}
					},
					{
							"date": "2014-02-17",
							"totalKwh": 4.200999999999999,
							"averageHourlyKwh": 0.17504166666666662,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.2690000000000001
							}
					},
					{
							"date": "2014-02-18",
							"totalKwh": 5.4845000000000015,
							"averageHourlyKwh": 0.2285208333333334,
							"usagePeak": {
									"hour": "14:00",
									"kw": 1.5230000000000001
							}
					},
					{
							"date": "2014-02-19",
							"totalKwh": 4.349500000000002,
							"averageHourlyKwh": 0.18122916666666675,
							"usagePeak": {
									"hour": "16:00",
									"kw": 2.691
							}
					},
					{
							"date": "2014-02-20",
							"totalKwh": 3.1724999999999994,
							"averageHourlyKwh": 0.13218749999999999,
							"usagePeak": {
									"hour": "05:00",
									"kw": 0.479
							}
					},
					{
							"date": "2014-02-21",
							"totalKwh": 5.0435,
							"averageHourlyKwh": 0.21014583333333334,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.9180000000000001
							}
					},
					{
							"date": "2014-02-22",
							"totalKwh": 2.6965,
							"averageHourlyKwh": 0.11235416666666666,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.543
							}
					},
					{
							"date": "2014-02-23",
							"totalKwh": 4.313000000000001,
							"averageHourlyKwh": 0.17970833333333336,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.16
							}
					},
					{
							"date": "2014-02-24",
							"totalKwh": 3.659,
							"averageHourlyKwh": 0.15245833333333333,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.464
							}
					},
					{
							"date": "2014-02-25",
							"totalKwh": 5.555999999999999,
							"averageHourlyKwh": 0.23149999999999996,
							"usagePeak": {
									"hour": "15:00",
									"kw": 1.362
							}
					},
					{
							"date": "2014-02-26",
							"totalKwh": 1.9710000000000003,
							"averageHourlyKwh": 0.08212500000000002,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.397
							}
					},
					{
							"date": "2014-02-27",
							"totalKwh": 2.6740000000000013,
							"averageHourlyKwh": 0.11141666666666672,
							"usagePeak": {
									"hour": "05:00",
									"kw": 0.622
							}
					},
					{
							"date": "2014-02-28",
							"totalKwh": 3.985499999999999,
							"averageHourlyKwh": 0.16606249999999997,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.919
							}
					},
					{
							"date": "2014-03-01",
							"totalKwh": 2.1250000000000004,
							"averageHourlyKwh": 0.08854166666666669,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.456
							}
					},
					{
							"date": "2014-03-02",
							"totalKwh": 3.3650000000000007,
							"averageHourlyKwh": 0.14020833333333335,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.28
							}
					},
					{
							"date": "2014-03-03",
							"totalKwh": 5.9095,
							"averageHourlyKwh": 0.2462291666666667,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.671
							}
					},
					{
							"date": "2014-03-04",
							"totalKwh": 6.994,
							"averageHourlyKwh": 0.29141666666666666,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.7069999999999999
							}
					},
					{
							"date": "2014-03-05",
							"totalKwh": 3.1680000000000006,
							"averageHourlyKwh": 0.13200000000000003,
							"usagePeak": {
									"hour": "15:00",
									"kw": 1.098
							}
					},
					{
							"date": "2014-03-06",
							"totalKwh": 3.1859999999999995,
							"averageHourlyKwh": 0.13274999999999998,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.8009999999999999
							}
					},
					{
							"date": "2014-03-07",
							"totalKwh": 3.093,
							"averageHourlyKwh": 0.128875,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.5760000000000001
							}
					},
					{
							"date": "2014-03-08",
							"totalKwh": 6.836499999999999,
							"averageHourlyKwh": 0.28485416666666663,
							"usagePeak": {
									"hour": "17:00",
									"kw": 3.599
							}
					},
					{
							"date": "2014-03-09",
							"totalKwh": 5.783499999999999,
							"averageHourlyKwh": 0.24097916666666663,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.428
							}
					},
					{
							"date": "2014-03-10",
							"totalKwh": 4.2315000000000005,
							"averageHourlyKwh": 0.1763125,
							"usagePeak": {
									"hour": "12:00",
									"kw": 1.517
							}
					},
					{
							"date": "2014-03-11",
							"totalKwh": 3.6930000000000005,
							"averageHourlyKwh": 0.153875,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.197
							}
					},
					{
							"date": "2014-03-12",
							"totalKwh": 3.0315000000000007,
							"averageHourlyKwh": 0.12631250000000002,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.635
							}
					},
					{
							"date": "2014-03-13",
							"totalKwh": 3.3000000000000007,
							"averageHourlyKwh": 0.13750000000000004,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.594
							}
					},
					{
							"date": "2014-03-14",
							"totalKwh": 5.2515,
							"averageHourlyKwh": 0.2188125,
							"usagePeak": {
									"hour": "17:00",
									"kw": 2.96
							}
					},
					{
							"date": "2014-03-15",
							"totalKwh": 8.267999999999999,
							"averageHourlyKwh": 0.3445,
							"usagePeak": {
									"hour": "14:00",
									"kw": 3.706
							}
					},
					{
							"date": "2014-03-16",
							"totalKwh": 2.7665,
							"averageHourlyKwh": 0.11527083333333334,
							"usagePeak": {
									"hour": "15:00",
									"kw": 0.587
							}
					},
					{
							"date": "2014-03-17",
							"totalKwh": 2.3615,
							"averageHourlyKwh": 0.09839583333333334,
							"usagePeak": {
									"hour": "14:00",
									"kw": 0.628
							}
					},
					{
							"date": "2014-03-18",
							"totalKwh": 4.377999999999999,
							"averageHourlyKwh": 0.18241666666666664,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.7169999999999999
							}
					},
					{
							"date": "2014-03-19",
							"totalKwh": 3.819,
							"averageHourlyKwh": 0.159125,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.748
							}
					},
					{
							"date": "2014-03-20",
							"totalKwh": 4.3050000000000015,
							"averageHourlyKwh": 0.17937500000000006,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.383
							}
					},
					{
							"date": "2014-03-21",
							"totalKwh": 3.3154999999999997,
							"averageHourlyKwh": 0.13814583333333333,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.696
							}
					},
					{
							"date": "2014-03-22",
							"totalKwh": 5.067499999999999,
							"averageHourlyKwh": 0.21114583333333328,
							"usagePeak": {
									"hour": "16:00",
									"kw": 3.002
							}
					},
					{
							"date": "2014-03-23",
							"totalKwh": 3.5040000000000004,
							"averageHourlyKwh": 0.14600000000000002,
							"usagePeak": {
									"hour": "12:00",
									"kw": 0.982
							}
					},
					{
							"date": "2014-03-24",
							"totalKwh": 3.595,
							"averageHourlyKwh": 0.14979166666666668,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.7629999999999999
							}
					},
					{
							"date": "2014-03-25",
							"totalKwh": 3.2009999999999996,
							"averageHourlyKwh": 0.133375,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.7070000000000001
							}
					},
					{
							"date": "2014-03-26",
							"totalKwh": 3.500500000000001,
							"averageHourlyKwh": 0.1458541666666667,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.702
							}
					},
					{
							"date": "2014-03-27",
							"totalKwh": 2.967999999999999,
							"averageHourlyKwh": 0.12366666666666663,
							"usagePeak": {
									"hour": "12:00",
									"kw": 0.629
							}
					},
					{
							"date": "2014-03-28",
							"totalKwh": 3.206999999999998,
							"averageHourlyKwh": 0.1336249999999999,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.813
							}
					},
					{
							"date": "2014-03-29",
							"totalKwh": 4.944500000000002,
							"averageHourlyKwh": 0.20602083333333343,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.9489999999999998
							}
					},
					{
							"date": "2014-03-30",
							"totalKwh": 4.813,
							"averageHourlyKwh": 0.20054166666666665,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.689
							}
					},
					{
							"date": "2014-03-31",
							"totalKwh": 4.8900000000000015,
							"averageHourlyKwh": 0.20375000000000007,
							"usagePeak": {
									"hour": "14:00",
									"kw": 1.331
							}
					},
					{
							"date": "2014-04-01",
							"totalKwh": 6.088,
							"averageHourlyKwh": 0.25366666666666665,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.2999999999999998
							}
					},
					{
							"date": "2014-04-02",
							"totalKwh": 4.591,
							"averageHourlyKwh": 0.19129166666666667,
							"usagePeak": {
									"hour": "16:00",
									"kw": 3.003
							}
					},
					{
							"date": "2014-04-03",
							"totalKwh": 4.091,
							"averageHourlyKwh": 0.17045833333333335,
							"usagePeak": {
									"hour": "15:00",
									"kw": 2.248
							}
					},
					{
							"date": "2014-04-04",
							"totalKwh": 3.4495000000000005,
							"averageHourlyKwh": 0.14372916666666669,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.94
							}
					},
					{
							"date": "2014-04-05",
							"totalKwh": 2.8534999999999995,
							"averageHourlyKwh": 0.11889583333333331,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.6910000000000001
							}
					},
					{
							"date": "2014-04-06",
							"totalKwh": 2.7825000000000006,
							"averageHourlyKwh": 0.11593750000000003,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.472
							}
					},
					{
							"date": "2014-04-07",
							"totalKwh": 4.003500000000001,
							"averageHourlyKwh": 0.16681250000000003,
							"usagePeak": {
									"hour": "17:00",
									"kw": 2.012
							}
					},
					{
							"date": "2014-04-08",
							"totalKwh": 2.6935,
							"averageHourlyKwh": 0.11222916666666666,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.537
							}
					},
					{
							"date": "2014-04-09",
							"totalKwh": 4.1185,
							"averageHourlyKwh": 0.17160416666666667,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.298
							}
					},
					{
							"date": "2014-04-10",
							"totalKwh": 4.3155,
							"averageHourlyKwh": 0.17981250000000001,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.542
							}
					},
					{
							"date": "2014-04-11",
							"totalKwh": 2.5240000000000005,
							"averageHourlyKwh": 0.10516666666666669,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.448
							}
					},
					{
							"date": "2014-04-12",
							"totalKwh": 3.8040000000000007,
							"averageHourlyKwh": 0.15850000000000003,
							"usagePeak": {
									"hour": "15:00",
									"kw": 0.675
							}
					},
					{
							"date": "2014-04-13",
							"totalKwh": 3.531000000000001,
							"averageHourlyKwh": 0.14712500000000003,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.537
							}
					},
					{
							"date": "2014-04-14",
							"totalKwh": 3.669,
							"averageHourlyKwh": 0.152875,
							"usagePeak": {
									"hour": "13:00",
									"kw": 1.191
							}
					},
					{
							"date": "2014-04-15",
							"totalKwh": 3.8705000000000007,
							"averageHourlyKwh": 0.16127083333333336,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.7729999999999999
							}
					},
					{
							"date": "2014-04-16",
							"totalKwh": 3.7829999999999995,
							"averageHourlyKwh": 0.157625,
							"usagePeak": {
									"hour": "12:00",
									"kw": 0.677
							}
					},
					{
							"date": "2014-04-17",
							"totalKwh": 3.374000000000001,
							"averageHourlyKwh": 0.14058333333333337,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.6930000000000001
							}
					},
					{
							"date": "2014-04-18",
							"totalKwh": 4.234500000000001,
							"averageHourlyKwh": 0.17643750000000002,
							"usagePeak": {
									"hour": "10:00",
									"kw": 0.808
							}
					},
					{
							"date": "2014-04-19",
							"totalKwh": 4.3315,
							"averageHourlyKwh": 0.18047916666666666,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.988
							}
					},
					{
							"date": "2014-04-20",
							"totalKwh": 2.0115,
							"averageHourlyKwh": 0.0838125,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.901
							}
					},
					{
							"date": "2014-04-21",
							"totalKwh": 1.366,
							"averageHourlyKwh": 0.05691666666666667,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.387
							}
					},
					{
							"date": "2014-04-22",
							"totalKwh": 4.141000000000001,
							"averageHourlyKwh": 0.1725416666666667,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.997
							}
					},
					{
							"date": "2014-04-23",
							"totalKwh": 3.5715000000000003,
							"averageHourlyKwh": 0.14881250000000001,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.738
							}
					},
					{
							"date": "2014-04-24",
							"totalKwh": 3.649499999999999,
							"averageHourlyKwh": 0.15206249999999996,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.538
							}
					},
					{
							"date": "2014-04-25",
							"totalKwh": 4.827,
							"averageHourlyKwh": 0.201125,
							"usagePeak": {
									"hour": "09:00",
									"kw": 2.842
							}
					},
					{
							"date": "2014-04-26",
							"totalKwh": 4.955000000000001,
							"averageHourlyKwh": 0.20645833333333338,
							"usagePeak": {
									"hour": "13:00",
									"kw": 1.2690000000000001
							}
					},
					{
							"date": "2014-04-27",
							"totalKwh": 3.4690000000000003,
							"averageHourlyKwh": 0.14454166666666668,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.528
							}
					},
					{
							"date": "2014-04-28",
							"totalKwh": 3.8925,
							"averageHourlyKwh": 0.1621875,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.746
							}
					},
					{
							"date": "2014-04-29",
							"totalKwh": 2.8689999999999998,
							"averageHourlyKwh": 0.11954166666666666,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.584
							}
					},
					{
							"date": "2014-04-30",
							"totalKwh": 4.4479999999999995,
							"averageHourlyKwh": 0.18533333333333332,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.79
							}
					},
					{
							"date": "2014-05-01",
							"totalKwh": 4.138,
							"averageHourlyKwh": 0.17241666666666666,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.872
							}
					},
					{
							"date": "2014-05-02",
							"totalKwh": 4.42,
							"averageHourlyKwh": 0.18416666666666667,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.7170000000000001
							}
					},
					{
							"date": "2014-05-03",
							"totalKwh": 3.7215000000000003,
							"averageHourlyKwh": 0.15506250000000002,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.879
							}
					},
					{
							"date": "2014-05-04",
							"totalKwh": 5.175,
							"averageHourlyKwh": 0.21562499999999998,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.35
							}
					},
					{
							"date": "2014-05-05",
							"totalKwh": 2.9555000000000007,
							"averageHourlyKwh": 0.12314583333333336,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.534
							}
					},
					{
							"date": "2014-05-06",
							"totalKwh": 3.5045,
							"averageHourlyKwh": 0.14602083333333335,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.061
							}
					},
					{
							"date": "2014-05-07",
							"totalKwh": 5.4064999999999985,
							"averageHourlyKwh": 0.22527083333333328,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.887
							}
					},
					{
							"date": "2014-05-08",
							"totalKwh": 3.2535000000000003,
							"averageHourlyKwh": 0.1355625,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.615
							}
					},
					{
							"date": "2014-05-09",
							"totalKwh": 3.4595000000000007,
							"averageHourlyKwh": 0.14414583333333336,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.6459999999999999
							}
					},
					{
							"date": "2014-05-10",
							"totalKwh": 2.918499999999999,
							"averageHourlyKwh": 0.12160416666666662,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.899
							}
					},
					{
							"date": "2014-05-11",
							"totalKwh": 3.0340000000000003,
							"averageHourlyKwh": 0.12641666666666668,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.5680000000000001
							}
					},
					{
							"date": "2014-05-12",
							"totalKwh": 4.695,
							"averageHourlyKwh": 0.19562500000000002,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.9229999999999999
							}
					},
					{
							"date": "2014-05-13",
							"totalKwh": 5.565500000000001,
							"averageHourlyKwh": 0.23189583333333338,
							"usagePeak": {
									"hour": "17:00",
									"kw": 2.8840000000000003
							}
					},
					{
							"date": "2014-05-14",
							"totalKwh": 4.266,
							"averageHourlyKwh": 0.17775,
							"usagePeak": {
									"hour": "12:00",
									"kw": 0.654
							}
					},
					{
							"date": "2014-05-15",
							"totalKwh": 4.2215,
							"averageHourlyKwh": 0.17589583333333333,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.94
							}
					},
					{
							"date": "2014-05-16",
							"totalKwh": 2.611500000000001,
							"averageHourlyKwh": 0.10881250000000003,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.51
							}
					},
					{
							"date": "2014-05-17",
							"totalKwh": 4.189999999999999,
							"averageHourlyKwh": 0.17458333333333328,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.679
							}
					},
					{
							"date": "2014-05-18",
							"totalKwh": 3.0234999999999994,
							"averageHourlyKwh": 0.12597916666666664,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.8380000000000001
							}
					},
					{
							"date": "2014-05-19",
							"totalKwh": 3.083,
							"averageHourlyKwh": 0.12845833333333334,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.783
							}
					},
					{
							"date": "2014-05-20",
							"totalKwh": 2.9934999999999996,
							"averageHourlyKwh": 0.12472916666666665,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.41100000000000003
							}
					},
					{
							"date": "2014-05-21",
							"totalKwh": 3.698,
							"averageHourlyKwh": 0.15408333333333332,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.85
							}
					},
					{
							"date": "2014-05-22",
							"totalKwh": 3.0465000000000013,
							"averageHourlyKwh": 0.12693750000000006,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.481
							}
					},
					{
							"date": "2014-05-23",
							"totalKwh": 4.4555,
							"averageHourlyKwh": 0.18564583333333332,
							"usagePeak": {
									"hour": "07:00",
									"kw": 1.058
							}
					},
					{
							"date": "2014-05-24",
							"totalKwh": 4.708500000000001,
							"averageHourlyKwh": 0.19618750000000004,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.9710000000000001
							}
					},
					{
							"date": "2014-05-25",
							"totalKwh": 10.995499999999996,
							"averageHourlyKwh": 0.4581458333333332,
							"usagePeak": {
									"hour": "10:00",
									"kw": 2.665
							}
					},
					{
							"date": "2014-05-26",
							"totalKwh": 4.702999999999999,
							"averageHourlyKwh": 0.19595833333333332,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.976
							}
					},
					{
							"date": "2014-05-27",
							"totalKwh": 3.7365,
							"averageHourlyKwh": 0.1556875,
							"usagePeak": {
									"hour": "19:00",
									"kw": 0.523
							}
					},
					{
							"date": "2014-05-28",
							"totalKwh": 4.236499999999999,
							"averageHourlyKwh": 0.17652083333333327,
							"usagePeak": {
									"hour": "15:00",
									"kw": 0.712
							}
					},
					{
							"date": "2014-05-29",
							"totalKwh": 5.023499999999999,
							"averageHourlyKwh": 0.20931249999999998,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.127
							}
					},
					{
							"date": "2014-05-30",
							"totalKwh": 5.057499999999999,
							"averageHourlyKwh": 0.21072916666666663,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.9850000000000001
							}
					},
					{
							"date": "2014-05-31",
							"totalKwh": 2.0195,
							"averageHourlyKwh": 0.08414583333333332,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.516
							}
					},
					{
							"date": "2014-06-01",
							"totalKwh": 0.9199999999999998,
							"averageHourlyKwh": 0.03833333333333332,
							"usagePeak": {
									"hour": "05:00",
									"kw": 0.174
							}
					},
					{
							"date": "2014-06-02",
							"totalKwh": 0.9115,
							"averageHourlyKwh": 0.03797916666666667,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.175
							}
					},
					{
							"date": "2014-06-03",
							"totalKwh": 0.873,
							"averageHourlyKwh": 0.036375,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.08
							}
					},
					{
							"date": "2014-06-04",
							"totalKwh": 0.8979999999999999,
							"averageHourlyKwh": 0.03741666666666666,
							"usagePeak": {
									"hour": "14:00",
									"kw": 0.16599999999999998
							}
					},
					{
							"date": "2014-06-05",
							"totalKwh": 0.8505,
							"averageHourlyKwh": 0.035437500000000004,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.076
							}
					},
					{
							"date": "2014-06-06",
							"totalKwh": 0.7694999999999999,
							"averageHourlyKwh": 0.032062499999999994,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.18
							}
					},
					{
							"date": "2014-06-07",
							"totalKwh": 3.138,
							"averageHourlyKwh": 0.13075,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.008
							}
					},
					{
							"date": "2014-06-08",
							"totalKwh": 6.0809999999999995,
							"averageHourlyKwh": 0.25337499999999996,
							"usagePeak": {
									"hour": "18:00",
									"kw": 2.677
							}
					},
					{
							"date": "2014-06-09",
							"totalKwh": 3.2454999999999994,
							"averageHourlyKwh": 0.13522916666666665,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.528
							}
					},
					{
							"date": "2014-06-10",
							"totalKwh": 3.663499999999999,
							"averageHourlyKwh": 0.1526458333333333,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.625
							}
					},
					{
							"date": "2014-06-11",
							"totalKwh": 3.8674999999999984,
							"averageHourlyKwh": 0.16114583333333327,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.7200000000000001
							}
					},
					{
							"date": "2014-06-12",
							"totalKwh": 3.5280000000000022,
							"averageHourlyKwh": 0.1470000000000001,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.709
							}
					},
					{
							"date": "2014-06-13",
							"totalKwh": 3.596999999999999,
							"averageHourlyKwh": 0.14987499999999995,
							"usagePeak": {
									"hour": "08:00",
									"kw": 1.002
							}
					},
					{
							"date": "2014-06-14",
							"totalKwh": 3.499,
							"averageHourlyKwh": 0.14579166666666668,
							"usagePeak": {
									"hour": "22:00",
									"kw": 1.056
							}
					},
					{
							"date": "2014-06-15",
							"totalKwh": 5.901,
							"averageHourlyKwh": 0.24587499999999998,
							"usagePeak": {
									"hour": "19:00",
									"kw": 2.6159999999999997
							}
					},
					{
							"date": "2014-06-16",
							"totalKwh": 2.7254999999999994,
							"averageHourlyKwh": 0.11356249999999997,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.5589999999999999
							}
					},
					{
							"date": "2014-06-17",
							"totalKwh": 1.8414999999999995,
							"averageHourlyKwh": 0.07672916666666664,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.735
							}
					},
					{
							"date": "2014-06-18",
							"totalKwh": 0.9504999999999999,
							"averageHourlyKwh": 0.03960416666666666,
							"usagePeak": {
									"hour": "22:00",
									"kw": 0.178
							}
					},
					{
							"date": "2014-06-19",
							"totalKwh": 0.9184999999999999,
							"averageHourlyKwh": 0.03827083333333333,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.11699999999999999
							}
					},
					{
							"date": "2014-06-20",
							"totalKwh": 0.8844999999999996,
							"averageHourlyKwh": 0.03685416666666665,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.161
							}
					},
					{
							"date": "2014-06-21",
							"totalKwh": 0.8284999999999998,
							"averageHourlyKwh": 0.03452083333333333,
							"usagePeak": {
									"hour": "23:00",
									"kw": 0.08199999999999999
							}
					},
					{
							"date": "2014-06-22",
							"totalKwh": 1.3785000000000003,
							"averageHourlyKwh": 0.05743750000000001,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.606
							}
					},
					{
							"date": "2014-06-23",
							"totalKwh": 1.6784999999999999,
							"averageHourlyKwh": 0.0699375,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.33099999999999996
							}
					},
					{
							"date": "2014-06-24",
							"totalKwh": 0.8279999999999995,
							"averageHourlyKwh": 0.03449999999999998,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.14900000000000002
							}
					},
					{
							"date": "2014-06-25",
							"totalKwh": 0.8350000000000001,
							"averageHourlyKwh": 0.03479166666666667,
							"usagePeak": {
									"hour": "14:00",
									"kw": 0.153
							}
					},
					{
							"date": "2014-06-26",
							"totalKwh": 0.8795000000000002,
							"averageHourlyKwh": 0.03664583333333334,
							"usagePeak": {
									"hour": "03:00",
									"kw": 0.131
							}
					},
					{
							"date": "2014-06-27",
							"totalKwh": 0.9274999999999999,
							"averageHourlyKwh": 0.03864583333333333,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.138
							}
					},
					{
							"date": "2014-06-28",
							"totalKwh": 0.8264999999999999,
							"averageHourlyKwh": 0.034437499999999996,
							"usagePeak": {
									"hour": "23:00",
									"kw": 0.134
							}
					},
					{
							"date": "2014-06-29",
							"totalKwh": 1.088,
							"averageHourlyKwh": 0.04533333333333334,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.29
							}
					},
					{
							"date": "2014-06-30",
							"totalKwh": 0.8604999999999998,
							"averageHourlyKwh": 0.03585416666666666,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.23399999999999999
							}
					},
					{
							"date": "2014-07-01",
							"totalKwh": 2.064,
							"averageHourlyKwh": 0.08600000000000001,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.716
							}
					},
					{
							"date": "2014-07-02",
							"totalKwh": 2.6569999999999996,
							"averageHourlyKwh": 0.11070833333333331,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.0270000000000001
							}
					},
					{
							"date": "2014-07-03",
							"totalKwh": 1.1784999999999999,
							"averageHourlyKwh": 0.049104166666666664,
							"usagePeak": {
									"hour": "12:00",
									"kw": 0.45699999999999996
							}
					},
					{
							"date": "2014-07-04",
							"totalKwh": 0.7745,
							"averageHourlyKwh": 0.03227083333333333,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.10800000000000001
							}
					},
					{
							"date": "2014-07-05",
							"totalKwh": 0.8305,
							"averageHourlyKwh": 0.034604166666666665,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.131
							}
					},
					{
							"date": "2014-07-06",
							"totalKwh": 0.776,
							"averageHourlyKwh": 0.03233333333333333,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.083
							}
					},
					{
							"date": "2014-07-07",
							"totalKwh": 0.8634999999999997,
							"averageHourlyKwh": 0.03597916666666665,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.165
							}
					},
					{
							"date": "2014-07-08",
							"totalKwh": 0.8524999999999999,
							"averageHourlyKwh": 0.03552083333333333,
							"usagePeak": {
									"hour": "23:00",
									"kw": 0.148
							}
					},
					{
							"date": "2014-07-09",
							"totalKwh": 1.6675,
							"averageHourlyKwh": 0.06947916666666666,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.7549999999999999
							}
					},
					{
							"date": "2014-07-10",
							"totalKwh": 0.8154999999999999,
							"averageHourlyKwh": 0.033979166666666664,
							"usagePeak": {
									"hour": "14:00",
									"kw": 0.14900000000000002
							}
					},
					{
							"date": "2014-07-11",
							"totalKwh": 1.0514999999999997,
							"averageHourlyKwh": 0.04381249999999998,
							"usagePeak": {
									"hour": "15:00",
									"kw": 0.272
							}
					},
					{
							"date": "2014-07-12",
							"totalKwh": 1.1235000000000002,
							"averageHourlyKwh": 0.04681250000000001,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.377
							}
					},
					{
							"date": "2014-07-13",
							"totalKwh": 1.549,
							"averageHourlyKwh": 0.06454166666666666,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.616
							}
					},
					{
							"date": "2014-07-14",
							"totalKwh": 1.5735000000000001,
							"averageHourlyKwh": 0.06556250000000001,
							"usagePeak": {
									"hour": "00:00",
									"kw": 0.40499999999999997
							}
					},
					{
							"date": "2014-07-15",
							"totalKwh": 0.908,
							"averageHourlyKwh": 0.03783333333333334,
							"usagePeak": {
									"hour": "22:00",
									"kw": 0.189
							}
					},
					{
							"date": "2014-07-16",
							"totalKwh": 1.007,
							"averageHourlyKwh": 0.04195833333333333,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.255
							}
					},
					{
							"date": "2014-07-17",
							"totalKwh": 1.7420000000000002,
							"averageHourlyKwh": 0.07258333333333335,
							"usagePeak": {
									"hour": "23:00",
									"kw": 0.56
							}
					},
					{
							"date": "2014-07-18",
							"totalKwh": 4.4705,
							"averageHourlyKwh": 0.18627083333333336,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.895
							}
					},
					{
							"date": "2014-07-19",
							"totalKwh": 4.479,
							"averageHourlyKwh": 0.186625,
							"usagePeak": {
									"hour": "13:00",
									"kw": 1.13
							}
					},
					{
							"date": "2014-07-20",
							"totalKwh": 4.4384999999999994,
							"averageHourlyKwh": 0.18493749999999998,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.649
							}
					},
					{
							"date": "2014-07-21",
							"totalKwh": 4.992999999999999,
							"averageHourlyKwh": 0.20804166666666665,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.029
							}
					},
					{
							"date": "2014-07-22",
							"totalKwh": 4.2935,
							"averageHourlyKwh": 0.17889583333333334,
							"usagePeak": {
									"hour": "15:00",
									"kw": 0.638
							}
					},
					{
							"date": "2014-07-23",
							"totalKwh": 4.982500000000002,
							"averageHourlyKwh": 0.20760416666666673,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.061
							}
					},
					{
							"date": "2014-07-24",
							"totalKwh": 4.845000000000001,
							"averageHourlyKwh": 0.20187500000000003,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.6719999999999999
							}
					},
					{
							"date": "2014-07-25",
							"totalKwh": 4.410500000000001,
							"averageHourlyKwh": 0.18377083333333336,
							"usagePeak": {
									"hour": "10:00",
									"kw": 1.484
							}
					},
					{
							"date": "2014-07-26",
							"totalKwh": 4.966500000000001,
							"averageHourlyKwh": 0.20693750000000002,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.9119999999999999
							}
					},
					{
							"date": "2014-07-27",
							"totalKwh": 4.617,
							"averageHourlyKwh": 0.192375,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.9790000000000001
							}
					},
					{
							"date": "2014-07-28",
							"totalKwh": 3.6350000000000002,
							"averageHourlyKwh": 0.15145833333333333,
							"usagePeak": {
									"hour": "22:00",
									"kw": 0.641
							}
					},
					{
							"date": "2014-07-29",
							"totalKwh": 4.349,
							"averageHourlyKwh": 0.18120833333333333,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.6719999999999999
							}
					},
					{
							"date": "2014-07-30",
							"totalKwh": 3.1279999999999992,
							"averageHourlyKwh": 0.1303333333333333,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.765
							}
					},
					{
							"date": "2014-07-31",
							"totalKwh": 3.847499999999999,
							"averageHourlyKwh": 0.16031249999999994,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.857
							}
					},
					{
							"date": "2014-08-01",
							"totalKwh": 4.866999999999999,
							"averageHourlyKwh": 0.20279166666666662,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.911
							}
					},
					{
							"date": "2014-08-02",
							"totalKwh": 7.148,
							"averageHourlyKwh": 0.29783333333333334,
							"usagePeak": {
									"hour": "16:00",
									"kw": 2.7279999999999998
							}
					},
					{
							"date": "2014-08-03",
							"totalKwh": 6.171000000000001,
							"averageHourlyKwh": 0.25712500000000005,
							"usagePeak": {
									"hour": "17:00",
									"kw": 2.258
							}
					},
					{
							"date": "2014-08-04",
							"totalKwh": 4.3709999999999996,
							"averageHourlyKwh": 0.18212499999999998,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.671
							}
					},
					{
							"date": "2014-08-05",
							"totalKwh": 4.8115,
							"averageHourlyKwh": 0.20047916666666665,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.827
							}
					},
					{
							"date": "2014-08-06",
							"totalKwh": 3.798,
							"averageHourlyKwh": 0.15825,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.615
							}
					},
					{
							"date": "2014-08-07",
							"totalKwh": 5.578999999999999,
							"averageHourlyKwh": 0.2324583333333333,
							"usagePeak": {
									"hour": "09:00",
									"kw": 1.3130000000000002
							}
					},
					{
							"date": "2014-08-08",
							"totalKwh": 4.6160000000000005,
							"averageHourlyKwh": 0.19233333333333336,
							"usagePeak": {
									"hour": "14:00",
									"kw": 0.6739999999999999
							}
					},
					{
							"date": "2014-08-09",
							"totalKwh": 4.9750000000000005,
							"averageHourlyKwh": 0.20729166666666668,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.8660000000000001
							}
					},
					{
							"date": "2014-08-10",
							"totalKwh": 4.179,
							"averageHourlyKwh": 0.174125,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.798
							}
					},
					{
							"date": "2014-08-11",
							"totalKwh": 5.702500000000001,
							"averageHourlyKwh": 0.2376041666666667,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.682
							}
					},
					{
							"date": "2014-08-12",
							"totalKwh": 3.9439999999999995,
							"averageHourlyKwh": 0.1643333333333333,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.67
							}
					},
					{
							"date": "2014-08-13",
							"totalKwh": 4.627999999999999,
							"averageHourlyKwh": 0.1928333333333333,
							"usagePeak": {
									"hour": "18:00",
									"kw": 1.003
							}
					},
					{
							"date": "2014-08-14",
							"totalKwh": 4.466000000000002,
							"averageHourlyKwh": 0.1860833333333334,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.933
							}
					},
					{
							"date": "2014-08-15",
							"totalKwh": 5.176999999999999,
							"averageHourlyKwh": 0.21570833333333328,
							"usagePeak": {
									"hour": "08:00",
									"kw": 1.1139999999999999
							}
					},
					{
							"date": "2014-08-16",
							"totalKwh": 12.367500000000003,
							"averageHourlyKwh": 0.5153125000000002,
							"usagePeak": {
									"hour": "16:00",
									"kw": 3.146
							}
					},
					{
							"date": "2014-08-17",
							"totalKwh": 4.909000000000001,
							"averageHourlyKwh": 0.2045416666666667,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.694
							}
					},
					{
							"date": "2014-08-18",
							"totalKwh": 4.225499999999999,
							"averageHourlyKwh": 0.17606249999999998,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.566
							}
					},
					{
							"date": "2014-08-19",
							"totalKwh": 4.4864999999999995,
							"averageHourlyKwh": 0.18693749999999998,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.534
							}
					},
					{
							"date": "2014-08-20",
							"totalKwh": 5.397999999999999,
							"averageHourlyKwh": 0.22491666666666663,
							"usagePeak": {
									"hour": "17:00",
									"kw": 2.383
							}
					},
					{
							"date": "2014-08-21",
							"totalKwh": 3.5009999999999994,
							"averageHourlyKwh": 0.14587499999999998,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.712
							}
					},
					{
							"date": "2014-08-22",
							"totalKwh": 3.1325000000000003,
							"averageHourlyKwh": 0.13052083333333334,
							"usagePeak": {
									"hour": "22:00",
									"kw": 0.503
							}
					},
					{
							"date": "2014-08-23",
							"totalKwh": 5.1675,
							"averageHourlyKwh": 0.21531250000000002,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.081
							}
					},
					{
							"date": "2014-08-24",
							"totalKwh": 3.4029999999999996,
							"averageHourlyKwh": 0.14179166666666665,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.803
							}
					},
					{
							"date": "2014-08-25",
							"totalKwh": 4.049,
							"averageHourlyKwh": 0.16870833333333335,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.9830000000000001
							}
					},
					{
							"date": "2014-08-26",
							"totalKwh": 3.9825000000000004,
							"averageHourlyKwh": 0.16593750000000002,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.624
							}
					},
					{
							"date": "2014-08-27",
							"totalKwh": 3.992,
							"averageHourlyKwh": 0.16633333333333333,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.601
							}
					},
					{
							"date": "2014-08-28",
							"totalKwh": 4.7465,
							"averageHourlyKwh": 0.19777083333333334,
							"usagePeak": {
									"hour": "09:00",
									"kw": 1.231
							}
					},
					{
							"date": "2014-08-29",
							"totalKwh": 4.7475000000000005,
							"averageHourlyKwh": 0.19781250000000003,
							"usagePeak": {
									"hour": "17:00",
									"kw": 2.3409999999999997
							}
					},
					{
							"date": "2014-08-30",
							"totalKwh": 4.6115,
							"averageHourlyKwh": 0.19214583333333335,
							"usagePeak": {
									"hour": "10:00",
									"kw": 1.039
							}
					},
					{
							"date": "2014-08-31",
							"totalKwh": 4.112499999999999,
							"averageHourlyKwh": 0.1713541666666666,
							"usagePeak": {
									"hour": "22:00",
									"kw": 0.742
							}
					},
					{
							"date": "2014-09-01",
							"totalKwh": 4.9225,
							"averageHourlyKwh": 0.20510416666666667,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.699
							}
					},
					{
							"date": "2014-09-02",
							"totalKwh": 5.3715,
							"averageHourlyKwh": 0.2238125,
							"usagePeak": {
									"hour": "17:00",
									"kw": 2.201
							}
					},
					{
							"date": "2014-09-03",
							"totalKwh": 4.102500000000001,
							"averageHourlyKwh": 0.17093750000000005,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.782
							}
					},
					{
							"date": "2014-09-04",
							"totalKwh": 4.089,
							"averageHourlyKwh": 0.17037500000000003,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.8759999999999999
							}
					},
					{
							"date": "2014-09-05",
							"totalKwh": 4.5630000000000015,
							"averageHourlyKwh": 0.19012500000000007,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.951
							}
					},
					{
							"date": "2014-09-06",
							"totalKwh": 4.292999999999999,
							"averageHourlyKwh": 0.17887499999999998,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.89
							}
					},
					{
							"date": "2014-09-07",
							"totalKwh": 3.9819999999999993,
							"averageHourlyKwh": 0.16591666666666663,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.909
							}
					},
					{
							"date": "2014-09-08",
							"totalKwh": 3.057500000000001,
							"averageHourlyKwh": 0.12739583333333337,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.7190000000000001
							}
					},
					{
							"date": "2014-09-09",
							"totalKwh": 2.341,
							"averageHourlyKwh": 0.09754166666666668,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.30300000000000005
							}
					},
					{
							"date": "2014-09-10",
							"totalKwh": 2.6009999999999995,
							"averageHourlyKwh": 0.10837499999999999,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.476
							}
					},
					{
							"date": "2014-09-11",
							"totalKwh": 3.9709999999999988,
							"averageHourlyKwh": 0.1654583333333333,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.723
							}
					},
					{
							"date": "2014-09-12",
							"totalKwh": 4.209499999999999,
							"averageHourlyKwh": 0.1753958333333333,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.621
							}
					},
					{
							"date": "2014-09-13",
							"totalKwh": 4.290000000000001,
							"averageHourlyKwh": 0.17875000000000005,
							"usagePeak": {
									"hour": "13:00",
									"kw": 1.0590000000000002
							}
					},
					{
							"date": "2014-09-14",
							"totalKwh": 3.664,
							"averageHourlyKwh": 0.15266666666666667,
							"usagePeak": {
									"hour": "19:00",
									"kw": 0.665
							}
					},
					{
							"date": "2014-09-15",
							"totalKwh": 3.4459999999999997,
							"averageHourlyKwh": 0.1435833333333333,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.48
							}
					},
					{
							"date": "2014-09-16",
							"totalKwh": 4.782500000000001,
							"averageHourlyKwh": 0.19927083333333337,
							"usagePeak": {
									"hour": "15:00",
									"kw": 0.7
							}
					},
					{
							"date": "2014-09-17",
							"totalKwh": 3.6885000000000012,
							"averageHourlyKwh": 0.15368750000000006,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.978
							}
					},
					{
							"date": "2014-09-18",
							"totalKwh": 3.4684999999999993,
							"averageHourlyKwh": 0.1445208333333333,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.622
							}
					},
					{
							"date": "2014-09-19",
							"totalKwh": 4.131500000000001,
							"averageHourlyKwh": 0.17214583333333336,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.872
							}
					},
					{
							"date": "2014-09-20",
							"totalKwh": 4.839000000000001,
							"averageHourlyKwh": 0.20162500000000005,
							"usagePeak": {
									"hour": "09:00",
									"kw": 1.009
							}
					},
					{
							"date": "2014-09-21",
							"totalKwh": 3.6014999999999993,
							"averageHourlyKwh": 0.15006249999999996,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.616
							}
					},
					{
							"date": "2014-09-22",
							"totalKwh": 4.244500000000001,
							"averageHourlyKwh": 0.17685416666666673,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.704
							}
					},
					{
							"date": "2014-09-23",
							"totalKwh": 3.5490000000000004,
							"averageHourlyKwh": 0.147875,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.67
							}
					},
					{
							"date": "2014-09-24",
							"totalKwh": 3.6345000000000005,
							"averageHourlyKwh": 0.15143750000000003,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.596
							}
					},
					{
							"date": "2014-09-25",
							"totalKwh": 3.2075,
							"averageHourlyKwh": 0.13364583333333332,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.456
							}
					},
					{
							"date": "2014-09-26",
							"totalKwh": 3.013,
							"averageHourlyKwh": 0.12554166666666666,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.9490000000000001
							}
					},
					{
							"date": "2014-09-27",
							"totalKwh": 1.4515,
							"averageHourlyKwh": 0.06047916666666667,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.25
							}
					},
					{
							"date": "2014-09-28",
							"totalKwh": 1.5815000000000008,
							"averageHourlyKwh": 0.06589583333333336,
							"usagePeak": {
									"hour": "12:00",
									"kw": 0.28600000000000003
							}
					},
					{
							"date": "2014-09-29",
							"totalKwh": 1.6415,
							"averageHourlyKwh": 0.06839583333333334,
							"usagePeak": {
									"hour": "14:00",
									"kw": 0.269
							}
					},
					{
							"date": "2014-09-30",
							"totalKwh": 1.8014999999999999,
							"averageHourlyKwh": 0.07506249999999999,
							"usagePeak": {
									"hour": "10:00",
									"kw": 0.45599999999999996
							}
					},
					{
							"date": "2014-10-01",
							"totalKwh": 1.04,
							"averageHourlyKwh": 0.043333333333333335,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.124
							}
					},
					{
							"date": "2014-10-02",
							"totalKwh": 2.9050000000000007,
							"averageHourlyKwh": 0.1210416666666667,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.85
							}
					},
					{
							"date": "2014-10-03",
							"totalKwh": 4.180500000000001,
							"averageHourlyKwh": 0.17418750000000005,
							"usagePeak": {
									"hour": "08:00",
									"kw": 1.085
							}
					},
					{
							"date": "2014-10-04",
							"totalKwh": 4.3309999999999995,
							"averageHourlyKwh": 0.1804583333333333,
							"usagePeak": {
									"hour": "08:00",
									"kw": 1.083
							}
					},
					{
							"date": "2014-10-05",
							"totalKwh": 2.9925,
							"averageHourlyKwh": 0.1246875,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.594
							}
					},
					{
							"date": "2014-10-06",
							"totalKwh": 4.1345,
							"averageHourlyKwh": 0.17227083333333335,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.131
							}
					},
					{
							"date": "2014-10-07",
							"totalKwh": 4.2755,
							"averageHourlyKwh": 0.17814583333333334,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.7040000000000001
							}
					},
					{
							"date": "2014-10-08",
							"totalKwh": 3.942500000000001,
							"averageHourlyKwh": 0.16427083333333337,
							"usagePeak": {
									"hour": "07:00",
									"kw": 1.072
							}
					},
					{
							"date": "2014-10-09",
							"totalKwh": 3.9935,
							"averageHourlyKwh": 0.16639583333333333,
							"usagePeak": {
									"hour": "17:00",
									"kw": 2.175
							}
					},
					{
							"date": "2014-10-10",
							"totalKwh": 4.888499999999999,
							"averageHourlyKwh": 0.20368749999999994,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.441
							}
					},
					{
							"date": "2014-10-11",
							"totalKwh": 2.7150000000000007,
							"averageHourlyKwh": 0.11312500000000003,
							"usagePeak": {
									"hour": "08:00",
									"kw": 1.044
							}
					},
					{
							"date": "2014-10-12",
							"totalKwh": 1.9965,
							"averageHourlyKwh": 0.0831875,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.512
							}
					},
					{
							"date": "2014-10-13",
							"totalKwh": 4.933999999999998,
							"averageHourlyKwh": 0.20558333333333326,
							"usagePeak": {
									"hour": "16:00",
									"kw": 2.724
							}
					},
					{
							"date": "2014-10-14",
							"totalKwh": 4.563,
							"averageHourlyKwh": 0.190125,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.685
							}
					},
					{
							"date": "2014-10-15",
							"totalKwh": 3.335500000000001,
							"averageHourlyKwh": 0.1389791666666667,
							"usagePeak": {
									"hour": "16:00",
									"kw": 0.771
							}
					},
					{
							"date": "2014-10-16",
							"totalKwh": 3.9735000000000005,
							"averageHourlyKwh": 0.16556250000000003,
							"usagePeak": {
									"hour": "15:00",
									"kw": 1.2389999999999999
							}
					},
					{
							"date": "2014-10-17",
							"totalKwh": 4.0135,
							"averageHourlyKwh": 0.16722916666666665,
							"usagePeak": {
									"hour": "14:00",
									"kw": 2.2279999999999998
							}
					},
					{
							"date": "2014-10-18",
							"totalKwh": 3.7775000000000003,
							"averageHourlyKwh": 0.15739583333333335,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.7929999999999999
							}
					},
					{
							"date": "2014-10-19",
							"totalKwh": 3.6125000000000007,
							"averageHourlyKwh": 0.15052083333333335,
							"usagePeak": {
									"hour": "09:00",
									"kw": 1.0190000000000001
							}
					},
					{
							"date": "2014-10-20",
							"totalKwh": 3.4875000000000007,
							"averageHourlyKwh": 0.14531250000000004,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.591
							}
					},
					{
							"date": "2014-10-21",
							"totalKwh": 3.3140000000000005,
							"averageHourlyKwh": 0.13808333333333336,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.679
							}
					},
					{
							"date": "2014-10-22",
							"totalKwh": 2.836500000000001,
							"averageHourlyKwh": 0.11818750000000004,
							"usagePeak": {
									"hour": "19:00",
									"kw": 0.5309999999999999
							}
					},
					{
							"date": "2014-10-23",
							"totalKwh": 2.684000000000001,
							"averageHourlyKwh": 0.11183333333333338,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.515
							}
					},
					{
							"date": "2014-10-24",
							"totalKwh": 4.948499999999998,
							"averageHourlyKwh": 0.20618749999999994,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.463
							}
					},
					{
							"date": "2014-10-25",
							"totalKwh": 3.749999999999999,
							"averageHourlyKwh": 0.15624999999999997,
							"usagePeak": {
									"hour": "09:00",
									"kw": 1.255
							}
					},
					{
							"date": "2014-10-26",
							"totalKwh": 3.222,
							"averageHourlyKwh": 0.13425,
							"usagePeak": {
									"hour": "19:00",
									"kw": 1.307
							}
					},
					{
							"date": "2014-10-27",
							"totalKwh": 2.4669999999999996,
							"averageHourlyKwh": 0.10279166666666666,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.42700000000000005
							}
					},
					{
							"date": "2014-10-28",
							"totalKwh": 3.1249999999999996,
							"averageHourlyKwh": 0.13020833333333331,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.578
							}
					},
					{
							"date": "2014-10-29",
							"totalKwh": 3.278000000000001,
							"averageHourlyKwh": 0.13658333333333336,
							"usagePeak": {
									"hour": "20:00",
									"kw": 0.595
							}
					},
					{
							"date": "2014-10-30",
							"totalKwh": 3.7044999999999986,
							"averageHourlyKwh": 0.1543541666666666,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.776
							}
					},
					{
							"date": "2014-10-31",
							"totalKwh": 2.426,
							"averageHourlyKwh": 0.10108333333333334,
							"usagePeak": {
									"hour": "07:00",
									"kw": 1.049
							}
					},
					{
							"date": "2014-11-01",
							"totalKwh": 1.5385,
							"averageHourlyKwh": 0.06410416666666667,
							"usagePeak": {
									"hour": "11:00",
									"kw": 0.28400000000000003
							}
					},
					{
							"date": "2014-11-02",
							"totalKwh": 1.8280000000000003,
							"averageHourlyKwh": 0.07616666666666667,
							"usagePeak": {
									"hour": "19:00",
									"kw": 0.773
							}
					},
					{
							"date": "2014-11-03",
							"totalKwh": 3.426000000000001,
							"averageHourlyKwh": 0.14275000000000004,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.734
							}
					},
					{
							"date": "2014-11-04",
							"totalKwh": 3.1040000000000005,
							"averageHourlyKwh": 0.12933333333333336,
							"usagePeak": {
									"hour": "19:00",
									"kw": 0.858
							}
					},
					{
							"date": "2014-11-05",
							"totalKwh": 2.6325000000000003,
							"averageHourlyKwh": 0.10968750000000001,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.026
							}
					},
					{
							"date": "2014-11-06",
							"totalKwh": 3.0230000000000006,
							"averageHourlyKwh": 0.12595833333333337,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.99
							}
					},
					{
							"date": "2014-11-07",
							"totalKwh": 4.464499999999999,
							"averageHourlyKwh": 0.1860208333333333,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.6429999999999998
							}
					},
					{
							"date": "2014-11-08",
							"totalKwh": 3.646499999999999,
							"averageHourlyKwh": 0.15193749999999998,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.5230000000000001
							}
					},
					{
							"date": "2014-11-09",
							"totalKwh": 3.1020000000000008,
							"averageHourlyKwh": 0.12925000000000003,
							"usagePeak": {
									"hour": "17:00",
									"kw": 0.8029999999999999
							}
					},
					{
							"date": "2014-11-10",
							"totalKwh": 3.9365000000000006,
							"averageHourlyKwh": 0.16402083333333337,
							"usagePeak": {
									"hour": "16:00",
									"kw": 1.3150000000000002
							}
					},
					{
							"date": "2014-11-11",
							"totalKwh": 2.4005000000000014,
							"averageHourlyKwh": 0.10002083333333339,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.351
							}
					},
					{
							"date": "2014-11-12",
							"totalKwh": 2.384,
							"averageHourlyKwh": 0.09933333333333333,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.37
							}
					},
					{
							"date": "2014-11-13",
							"totalKwh": 4.401000000000001,
							"averageHourlyKwh": 0.18337500000000004,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.357
							}
					},
					{
							"date": "2014-11-14",
							"totalKwh": 2.4145,
							"averageHourlyKwh": 0.10060416666666666,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.319
							}
					},
					{
							"date": "2014-11-15",
							"totalKwh": 1.7519999999999998,
							"averageHourlyKwh": 0.073,
							"usagePeak": {
									"hour": "07:00",
									"kw": 0.33699999999999997
							}
					},
					{
							"date": "2014-11-16",
							"totalKwh": 1.2355,
							"averageHourlyKwh": 0.051479166666666666,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.158
							}
					},
					{
							"date": "2014-11-17",
							"totalKwh": 1.199,
							"averageHourlyKwh": 0.049958333333333334,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.17099999999999999
							}
					},
					{
							"date": "2014-11-18",
							"totalKwh": 1.1585,
							"averageHourlyKwh": 0.04827083333333334,
							"usagePeak": {
									"hour": "14:00",
									"kw": 0.121
							}
					},
					{
							"date": "2014-11-19",
							"totalKwh": 1.2319999999999995,
							"averageHourlyKwh": 0.051333333333333314,
							"usagePeak": {
									"hour": "00:00",
									"kw": 0.15999999999999998
							}
					},
					{
							"date": "2014-11-20",
							"totalKwh": 1.2269999999999999,
							"averageHourlyKwh": 0.051125,
							"usagePeak": {
									"hour": "05:00",
									"kw": 0.172
							}
					},
					{
							"date": "2014-11-21",
							"totalKwh": 1.2839999999999996,
							"averageHourlyKwh": 0.053499999999999985,
							"usagePeak": {
									"hour": "08:00",
									"kw": 0.174
							}
					},
					{
							"date": "2014-11-22",
							"totalKwh": 1.2609999999999997,
							"averageHourlyKwh": 0.05254166666666665,
							"usagePeak": {
									"hour": "10:00",
									"kw": 0.16299999999999998
							}
					},
					{
							"date": "2014-11-23",
							"totalKwh": 2.245,
							"averageHourlyKwh": 0.09354166666666668,
							"usagePeak": {
									"hour": "19:00",
									"kw": 0.876
							}
					},
					{
							"date": "2014-11-24",
							"totalKwh": 4.079,
							"averageHourlyKwh": 0.16995833333333332,
							"usagePeak": {
									"hour": "09:00",
									"kw": 0.726
							}
					},
					{
							"date": "2014-11-25",
							"totalKwh": 2.9074999999999998,
							"averageHourlyKwh": 0.12114583333333333,
							"usagePeak": {
									"hour": "18:00",
									"kw": 0.475
							}
					},
					{
							"date": "2014-11-26",
							"totalKwh": 3.8995000000000006,
							"averageHourlyKwh": 0.1624791666666667,
							"usagePeak": {
									"hour": "13:00",
									"kw": 0.734
							}
					},
					{
							"date": "2014-11-27",
							"totalKwh": 3.4665,
							"averageHourlyKwh": 0.1444375,
							"usagePeak": {
									"hour": "21:00",
									"kw": 0.606
							}
					},
					{
							"date": "2014-11-28",
							"totalKwh": 2.8570000000000015,
							"averageHourlyKwh": 0.11904166666666673,
							"usagePeak": {
									"hour": "06:00",
									"kw": 0.40900000000000003
							}
					},
					{
							"date": "2014-11-29",
							"totalKwh": 5.688,
							"averageHourlyKwh": 0.237,
							"usagePeak": {
									"hour": "09:00",
									"kw": 2.8680000000000003
							}
					},
					{
							"date": "2014-11-30",
							"totalKwh": 5.470500000000001,
							"averageHourlyKwh": 0.22793750000000004,
							"usagePeak": {
									"hour": "17:00",
									"kw": 1.541
							}
					},
					{
							"date": "2014-12-01",
							"totalKwh": 6.479000000000001,
							"averageHourlyKwh": 0.26995833333333336,
							"usagePeak": {
									"hour": "16:00",
									"kw": 2.9210000000000003
							}
					}
			]
		}
    const result = await loadUsage();
    expect(result).toEqual(loadUsageResult);
  });
});