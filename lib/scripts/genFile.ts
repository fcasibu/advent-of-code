import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { dirname, extname, join } from "path";
import mkdirp from "mkdirp";
import { root } from "../utils/store";
import { templateFetcher } from "../utils/templateFetcher";
import { customReplaceAll } from "../utils/customReplaceAll";

const SOLUTION_SCRIPT_NAME = "solution.ts.dat";

interface Props {
	day: number;
	year: number;
	fetchAll: boolean;
}

export const genFile = async ({ day, year, fetchAll }: Props) => {
	const solutionData = templateFetcher(SOLUTION_SCRIPT_NAME);

	if (solutionData === undefined)
		throw new Error("The template solution script is missing!");
	const ext = extname(
		solutionData.path.substring(0, solutionData.path.length - 4)
	);

	const route = join(
		root(),
		`${year}`,
		`${day}`.padStart(2, "0"),
		`solution-${year}-${day}${ext}`
	);

	const replacements = {
		"#{YEAR}": `${year}`,
		"#{DAY}": `${day}`,
	};

	await mkdirp(dirname(route));
	const newSolution = customReplaceAll(solutionData.data, replacements);
	let existent = existsSync(route);
	if (existent) {
		const existingfile = await readFile(route, "utf-8");
		existent = newSolution === existingfile;
	}
	if (!existent || fetchAll) {
		await writeFile(route, newSolution, "utf-8");
	}
};
