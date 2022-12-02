import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import { dirname, join } from "path";
import nodeFetch from "cross-fetch";
import mkdirp from "mkdirp";

import { root } from "../utils/store";
import { getSessionToken } from "../utils/getToken";
import {
	getLatestPuzzleDate,
	getAllPuzzleYears,
	getReleaseTime,
} from "../utils/getPuzzleDate";

import { genRunner } from "./genRunner";
import { genFile } from "./genFile";

interface ArgsInterface {
	sessionToken: string;
	year: number[];
	fetchAll: boolean;
	wait: boolean;
	noRunner: boolean;
	noSolution: boolean;
}

const config: ArgsInterface = {
	year: [],
	sessionToken: "",
	fetchAll: false,
	wait: false,
	noRunner: false,
	noSolution: false,
};

const thatDaysData = async ({ day, year }: { day: number; year: number }) => {
	const res = await nodeFetch(
		`https://adventofcode.com/${year}/day/${day}/input`,
		{
			headers: {
				cookie: `session=${config.sessionToken}`,
			},
		}
	);

	if (res.status === 200) return res.text();
	if (res.status === 404) throw new Error("Error 404 - puzzle not found.");
	throw new Error(
		"The puzzle wasn't found - please try again after resetting the session token."
	);
};

const parseArgs = (latest: { day: number; year: number }) => {
	const args = process.argv.slice(3);

	const yearArgIndex = args.findIndex(arg => /-(y|-years?)/gi.test(arg));
	const yearArg =
		yearArgIndex >= 0 ? args[yearArgIndex + 1] : `${latest.year}`;
	config.year =
		yearArg === "all" ? getAllPuzzleYears(latest.year) : [+yearArg];

	const fetchIndex = args.findIndex(arg => /-(all|-fetchAll)/gi.test(arg));
	config.fetchAll = fetchIndex >= 0;
	const waitIndex = args.findIndex(arg => /-(w|-wait)/gi.test(arg));
	config.wait = waitIndex >= 0;

	const noRunnerIndex = args.findIndex(arg => /-(nr|-no-runner)/gi.test(arg));
	config.noRunner = noRunnerIndex >= 0;
	const noSolutionIndex = args.findIndex(arg => /-(ns|-no-soln)/gi.test(arg));
	config.noSolution = noSolutionIndex >= 0;

	config.sessionToken = getSessionToken();
};

const fetchDay = async (day: number, year: number) => {
	const route = join(
		root(),
		`${year}`,
		`${day}`.padStart(2, "0"),
		"data.txt"
	);

	if (!existsSync(route) || config.fetchAll) {
		const releaseTime = getReleaseTime({ day, year });
		if (new Date().getTime() < releaseTime.getTime()) return true;

		const data = await thatDaysData({ day, year });

		const dir = dirname(route);
		await mkdirp(dir);
		await writeFile(route, data.trim(), "utf-8");
	}

	return false;
};

const fetch = async () => {
	const latest = getLatestPuzzleDate();

	parseArgs(latest);

	if (config.wait) {
		const nextLatestPuzzle = getLatestPuzzleDate(
			new Date(Date.now() + 86400000)
		);

		if (
			latest.day === nextLatestPuzzle.day &&
			latest.year === nextLatestPuzzle.year
		) {
			throw new Error(
				"The next puzzle doesn't release for 24+ hours. Please try later."
			);
		}

		const waitTime =
			getReleaseTime(nextLatestPuzzle).getTime() -
			new Date().getTime() +
			10000;

		console.log(`
=-=-=-=-=-=-=-=-=-=-=
      Waiting..
=-=-=-=-=-=-=-=-=-=-=

 • [${new Date(waitTime).toISOString().slice(11, 19)}] left.
    ↳ You can press Crtl+C to cancel.
`);

		await new Promise(r => setTimeout(r, waitTime));
	}

	const NUMBER_OF_DAYS = 25;

	for (const year of config.year) {
		for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
			const done = await fetchDay(i, year);

			if (!config.noRunner && !done)
				await genRunner({ day: i, year, fetchAll: config.fetchAll });
			if (!config.noSolution && !done)
				await genFile({ day: i, year, fetchAll: config.fetchAll });

			if (done) {
				console.log(
					`Finished fetcing for year ${year} at day ${i - 1}`
				);
				return;
			}
			await new Promise(r => setTimeout(r, 100));
		}
	}
};
export default fetch;
