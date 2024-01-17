import { app } from "../app";
import request from "supertest";

// // BACKEND ORIENTED CANDIDATES: use your own preferred test structure
// // this test is just here to give a helping hand figuring out plumbing
// // rather than an endorsement or guideline on testing style
describe("/api/usage", () => {
	test("it returns 200 OK with correct data structure", async () => {
		const resp = await request(app).get("/api/usage");
		expect(resp.status).toBe(200);
		expect(resp.body).toEqual(expect.objectContaining({
			startDate: expect.any(String),
			endDate: expect.any(String),
			totalKwh: expect.any(Number),
			averageDailyKwh: expect.any(Number),
			days: expect.arrayContaining([
				expect.objectContaining({
					date: expect.any(String),
					totalKwh: expect.any(Number),
					averageHourlyKwh: expect.any(Number),
					usagePeak: expect.objectContaining({
						hour: expect.any(String),
						kw: expect.any(Number)
					})
				})
			])
		}));
	});
});

