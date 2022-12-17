/**
 * • Year - 2022
 * • Day  - 15
 */

type range = [number, number];

/**
 * parser
 * @param data input
 * @returns array with sensors, beacons, distance between them, and sensorID
 */
const parser = (data: string) => {
	type numberCoords = [typeof NaN, number, number, number, number];
	const INPUT_REGEX =
		/Sensor at x=(-?\d*), y=(-?\d*): closest beacon is at x=(-?\d*), y=(-?\d*)/;

	const dist = (coordMap: numberCoords) =>
		Math.abs(coordMap[1] - coordMap[3]) +
		Math.abs(coordMap[2] - coordMap[4]);

	return data
		.split("\n")
		.map(line => INPUT_REGEX.exec(line)?.map(Number) as numberCoords)
		.map((coordMap, i) => ({
			sensor: [coordMap[1], coordMap[2]],
			beacon: [coordMap[3], coordMap[4]],
			distance: dist(coordMap),
			index: i,
		}));
};

/**
 * rowCoverageParsed
 * @description first, filters out the sensors that don't reach the row given, then calculates how much area is covered by those that do reach
 * @param data input
 * @param row the row whose cover is to be found
 * @returns an array of ranges which are covered by the sensors in the given row
 */
const rowCoverage = (data: string, row: number) =>
	parser(data)
		.filter(({ sensor, distance }) => Math.abs(row - sensor[1]) < distance)
		.map(({ sensor, distance }) => {
			const rowDistance = Math.abs(distance - Math.abs(row - sensor[1]));
			return [sensor[0] - rowDistance, sensor[0] + rowDistance] as range;
		});

/**
 * removeOverlapFromRanges
 * @param ranges range array
 * @returns non-overlapped range array
 */
const removeOverlapFromRanges = (ranges: range[]) =>
	ranges
		// this sorter first sorts by the starting position. If it starts are same, sorts by endings
		// so [[1,2], [2,3], [3,4], [2,4]] => [[1,2], [2,3], [2,4], [3,4]]
		.sort((a, b) => a[0] - b[0] || a[1] - b[1])
		.reduce((acc, range, i) => {
			// just add the first number
			if (i === 0) return [range];

			// as the array is sorted, the last is the max range, and last[0] < next range[0] -(1)
			const last = acc[acc.length - 1];

			// checking if the new range, is totally disjoint, if it is, add it
			if (last[1] + 1 < range[0]) acc.push(range);
			// else, as we know from comment #(1), we can just extend the range to include the next
			else {
				if (last[1] < range[1]) last[1] = range[1];
			}

			return acc;
		}, [] as range[]);

/**
 * getNetLengthOfRanges
 * @param ranges non-overlapping ranges
 * @returns length covered by the non-overlapping ranges
 */
const getNetLengthOfRanges = (ranges: range[]) =>
	ranges.map(([s, e]) => Math.abs(s - e + 1)).reduce((acc, n) => acc + n);

/**
 * numberOfBeaconsInARow
 * @param data input
 * @param row row where number of double counted beacons it to be found
 * @returns number of doubly counted beacons in a row
 */
const numberOfBeaconsInARow = (data: string, row: number) =>
	parser(data)
		// Filters all the beacons in the nth row
		.filter(({ beacon }) => beacon[1] === row)
		// Filters out all the duplicate beacons detected
		.filter(
			({ beacon }, i, array) =>
				i ===
				array.findIndex(
					pair =>
						beacon[0] === pair.beacon[0] &&
						beacon[1] === pair.beacon[1]
				)
		).length;

const question1 = (data: string) => {
	const ROW = 2_000_000;

	const coveredRanges = removeOverlapFromRanges(rowCoverage(data, ROW));

	return (
		getNetLengthOfRanges(coveredRanges) - numberOfBeaconsInARow(data, ROW)
	);
};

const question2 = (data: string) => {};

const solution = (data: string) => {
	return question1(data);
	// return question2(data);
};

export default solution;
