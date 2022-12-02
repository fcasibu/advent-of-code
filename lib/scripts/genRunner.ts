import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { dirname, extname, join } from "path";
import mkdirp from "mkdirp";
import { root } from "../utils/store";
import { templateFetcher } from "../utils/templateFetcher";
import { customReplaceAll } from "../utils/customReplaceAll";

const RUNNER_SCRIPT_NAME = "runner.ts.dat";

interface Props {
	day: number;
	year: number;
	fetchAll: boolean;
}

export const genRunner = async ({ day, year, fetchAll }: Props) => {
	const runnerData = templateFetcher(RUNNER_SCRIPT_NAME);

	if (runnerData === undefined)
		throw new Error("The template runner script is missing!");
	const ext = extname(
		runnerData.path.substring(0, runnerData.path.length - 4)
	);

	const route = join(
		root(),
		`${year}`,
		`${day}`.padStart(2, "0"),
		`runner${ext}`
	);

	const replacements = {
		"#{year}": `${year}`,
		"#{day}": `${day}`,
	};

	await mkdirp(dirname(route));
	const newRunner = customReplaceAll(runnerData.data, replacements);
	let existent = existsSync(route);
	if (existent) {
		const existingfile = await readFile(route, "utf-8");
		existent = newRunner === existingfile;
	}
	if (!existent || fetchAll) {
		await writeFile(route, newRunner, "utf-8");
	}
};
