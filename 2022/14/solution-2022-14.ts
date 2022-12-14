/**
 * • Year - 2022
 * • Day  - 14
 */

type Coord = [number, number];
type Hash = "#" | "o";
type filterFunction = (arg?: number) => boolean;

const SOURCE = 500;

const parse = (data: string) =>
	data
		.split("\n")
		.map(line =>
			line.split(" -> ").map(p => p.split(",").map(Number) as Coord)
		)
		.flatMap(scan =>
			scan.reduce((coords, value, index) => {
				// always adds the first coords
				if (index === 0) return coords.concat([value]);

				// pop out the last coord and get the sign by comparing both
				let prev = coords[coords.length - 1];
				const dir = prev.map((c, i) => Math.sign(value[i] - c));

				// detect if the destination (value) is reached by prev
				while (value.some((c, i) => c !== prev[i])) {
					// gets the very next coords according to the sign and add it to the path list
					prev = dir.map((c, i) => prev[i] + c) as Coord;
					coords.push(prev);
				}

				// return all the paths
				return coords;
			}, [] as Coord[])
		)
		.map(([x, y]) => x | (y << 16)) // stuff the y number over x (yyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxx)
		.reduce(
			({ map, max }, coord) => ({
				map: map.set(coord, "#"),
				max: max > coord ? max : coord,
			}), // gets the map to "#" for every rock block and a maximum
			{ map: new Map<number, Hash>(), max: 0 }
		);

const count = (caveCoords: Map<number, Hash>) =>
	[...caveCoords].filter(([_, fillerType]) => fillerType === "o").length;

const update = (
	caveCoords: Map<number, Hash>,
	pos: number,
	filter: filterFunction = () => true
) => {
	const next = [0, -1, 1] // the move order
		.map(move => pos + move + (1 << 16)) // gets all next moves
		.filter(filter) // uses a filter on them
		.find(p => !caveCoords.has(p)); // finds the first unblocked position

	// if it has no next move, set the sand and set the next to be the source again
	if (!next) {
		caveCoords.set(pos, "o");
	}
	return next || SOURCE;
};

// export const part2 = input => {
// 	const [cave, max] = parse(input);
// 	const newMax = (max & 0xffff0000) + (2 << 16);
// 	let pos = SOURCE;
// 	while (!cave.has(SOURCE)) {
// 		pos = update(cave, pos, p => p <= newMax);
// 	}
// 	return count(cave);
// };

const question1 = (data: string) => {
	const { map, max } = parse(data);

	let pos = SOURCE;
	// pos evaluates to x < 0 and max checks for the right limit
	while (pos && pos <= max) {
		pos = update(map, pos);
	}

	return count(map);
};

const question2 = (data: string) => {
	const { map, max } = parse(data);

	// max & 0xffff0000 forces it to a 32-digit binary pair, and adds 1 << 17 to get a floor
	const floorMax = (max & 0xffff0000) + (1 << 17);

	let pos = SOURCE;
	while (!map.has(SOURCE)) {
		pos = update(map, pos, arg => arg! <= floorMax);
	}

	return count(map);
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
