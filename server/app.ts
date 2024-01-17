import express from "express";
import { UsageSummary } from "../shared";
// import { sampleUsage } from "./sampleUsage";
import { loadUsage } from "./loadUsage";

const app = express();

// TODO: It would be better if the csv file could be uploaded to this api, or another type of identifier
// was implemented to get the 'usage' for something specific. Sounds like it's out of the scope for this
// technical task.
app.get("/api/usage", async (_req, res) => {
	// console.log("GET /api/usage");

	// FRONTEND ORIENTED CANDIDATES:
	// we sleep here to encourage you to implement a loading state
	// await simulateSlowNetwork();
	// const usageData: UsageSummary = sampleUsage();

	// BACKEND ORIENTED CANDIDATES:
	// Changing variable name to 'usageData' from 'usageDate' because it looks like a typo
	const usageData: UsageSummary | undefined = await loadUsage();

	// TODO: build out route logic to return meaningful messages
	if (usageData === undefined) {
		return res.status(500).send("Data is missing or invalid");
	}

	res.setHeader("Content-Type", "application/json");
	return res.end(JSON.stringify(usageData));
});

function simulateSlowNetwork(delayMs = 1500): Promise<void> {
	console.log(
		`Simulating network delay of ${delayMs}ms (comment me out if you're bored)`
	);
	return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export { app };
