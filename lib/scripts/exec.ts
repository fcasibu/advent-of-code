import { existsSync } from "fs";
import { join } from "path";
import { root } from "../utils/store";
import { getLatestPuzzleDate } from "../utils/getPuzzleDate";

interface configInterface {
	year: string;
	date: string;
}

const config: configInterface = {
	year: "",
	date: "",
};

const NUMBER_OF_DAYS = 25;
const START_YEAR = 2015;
const END_YEAR_OF_SUPPORT = 2030;

const verifyTimes = ({ day, year }: { day: string; year: string }) => {
	const condition =
		+day >= 1 &&
		+day <= NUMBER_OF_DAYS &&
		+year >= START_YEAR &&
		+year <= END_YEAR_OF_SUPPORT;

	if (!condition) throw new Error("The date of the question is incorrect!");
};

const parseArgs = ({ day, year }: { day: number; year: number }) => {
	const args = process.argv.slice(3);

	const dateIndex = args.findIndex(arg => /-(d|-date)/gi.test(arg));
	if (dateIndex >= 0) {
		const [inputyear, inputday] = args[dateIndex + 1].split("-");
		verifyTimes({ day: inputday, year: inputyear });
		config.year = inputyear;
		config.date = inputday;
	} else {
		config.year = `${year}`;
		config.date = `${day}`;
	}
};

const exec = () => {
	const latest = getLatestPuzzleDate();

	parseArgs(latest);

	const route = join(
		root(),
		`${config.year}`,
		`${config.date}`.padStart(2, "0"),
		"runner.ts"
	);

	if (!existsSync(route))
		throw new Error("The script to run the solution does not exist.");

	require(route);
};

export default exec;
