/**
 * • Year - 2022
 * • Day  - 15
 */

type Range = [number, number];

const parse = (data: string) => {
	type regexOutput = [number, number, number, number];
	const I_REGEX =
		/Sensor at x=(-?\d*), y=(-?\d*): closest beacon is at x=(-?\d*), y=(-?\d*)/;

	const dist = ([s0, s1, b0, b1]: regexOutput) =>
		Math.abs(s0 - b0) + Math.abs(s1 - b1);

	return data
		.split("\n")
		.map(line => I_REGEX.exec(line)?.map(Number).slice(1) as regexOutput)
		.map((coordMap, i) => ({
			sensor: [coordMap[0], coordMap[1]],
			beacon: [coordMap[2], coordMap[3]],
			distance: dist(coordMap),
			index: i,
		}));
};

const joinRanges = (ranges: Range[]) =>
	ranges
		.sort((a, b) => a[0] - b[0] || a[1] - b[1])
		.reduce((acc, range) => {
			const last = acc.at(-1) || [];
			if (range[0] <= last[1]! + 1) {
				if (last[1]! < range[1]) {
					last[1] = range[1];
				}
			} else {
				acc.push(range);
			}
			return acc;
		}, [] as Range[]);

const question1 = (data: string) => {
	const parsedData = parse(data);
	const ROW = 2_000_000;

	return (
		joinRanges(
			parsedData
				.filter(
					({ sensor, distance }) =>
						Math.abs(ROW - sensor[1]) < distance
				)
				.map(({ sensor, distance }) => {
					const diff = Math.abs(distance - Math.abs(ROW - sensor[1]));
					return [sensor[0] - diff, sensor[0] + diff] as Range;
				})
		)
			.map(([start, end]) => Math.abs(end + 1 - start))
			.reduce((sum, v) => sum + v) -
		parsedData
			.filter(({ beacon }) => beacon[1] === ROW)
			.filter(
				({ beacon }, i, arr) =>
					i ===
					arr.findIndex(
						part =>
							beacon[0] === part.beacon[0] &&
							beacon[1] === part.beacon[1]
					)
			).length
	);
};

const question2 = (data: string) => {
	const parsedData = parse(data);

	let len: number | false;
	const MAX = 4_000_000;
	let ROW = MAX + 1;

	while (ROW-- > 0 && !len!) {
		const ranges = joinRanges(
			parsedData
				.filter(
					({ sensor, distance }) =>
						Math.abs(ROW - sensor[1]) < distance
				)
				.map(({ sensor, distance }) => {
					const diff = Math.abs(distance - Math.abs(ROW - sensor[1]));
					return [
						Math.max(0, sensor[0] - diff),
						Math.min(MAX, sensor[0] + diff),
					] as Range;
				})
		);
		len = ranges.length > 1 && ranges[0][1];
	}

	return (+len! + 1) * 4000000 + ROW + 1;
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
