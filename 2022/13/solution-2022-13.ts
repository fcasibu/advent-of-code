/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */
const lineParser = (line: string) =>
	line
		.split("\n")
		.filter(e => e !== "")
		.map(e => JSON.parse(e));

const compareTheNumbers = (l: number, r: number) => (l === r ? null : l < r);

const makeIntoArray = (a: any) => (typeof a === "number" ? [a] : a);

const comparer = (pair: any[]): any => {
	const [l, r] = pair;

	if (typeof l === "number" && typeof r === "number")
		return compareTheNumbers(l, r);
	else if (Array.isArray(l) && Array.isArray(r)) {
		for (let i = 0; i < Math.min(l.length, r.length); i++) {
			const res: any = comparer([l[i], r[i]]);
			if (res !== null) return res;
		}

		return l.length === r.length ? null : l.length < r.length;
	} else return comparer([makeIntoArray(l), makeIntoArray(r)]);
};

const question1 = (data: string) => {
	return data
		.split("\n\n")
		.reduce(
			(a, line, i) => (comparer(lineParser(line)) ? (a += i + 1) : a),
			0
		);
};

const question2 = (data: string) => {
	const PRESET_DATA = [[[2]], [[6]]];

	const lines = lineParser(data);
	lines.push(...PRESET_DATA);
	lines.sort((l: any, r: any) => {
		let res = comparer([l, r]);
		return res === null ? 0 : res ? -1 : 1;
	});

	let f = -1,
		s = -1;

	for (let i = 0; i < lines.length; i++) {
		if (JSON.stringify(lines[i]) === "[[2]]") f = i + 1;
		if (JSON.stringify(lines[i]) === "[[6]]") s = i + 1;
	}

	return f * s;
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
