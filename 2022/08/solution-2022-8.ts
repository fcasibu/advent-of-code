/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const getNeighbors = (grid: number[][], xIndex: number, yIndex: number) => {
	return [
		grid[xIndex].slice(0, yIndex).reverse(), // @LEFT
		grid[xIndex].slice(yIndex + 1), // @RIGHT
		grid[xIndex] // @UP
			.map((_, i) => grid[i][yIndex])
			.slice(0, xIndex)
			.reverse(),
		grid[xIndex].map((_, i) => grid[i][yIndex]).slice(xIndex + 1), // @DOWN
	];
};

const question1 = (data: string) => {
	const grid = data.split("\n").map(line => line.split("").map(t => +t));

	return grid
		.flatMap((row, yIndex) =>
			row.map((_, xIndex) =>
				getNeighbors(grid, xIndex, yIndex)
					.map(dir => dir.every(tree => tree < grid[xIndex][yIndex]))
					.some(Boolean)
			)
		)
		.reduce((stack, v) => stack + Number(v), 0);
};

const question2 = (data: string) => {
	const grid = data.split("\n").map(line => line.split("").map(t => +t));

	return Math.max(
		...grid.flatMap((row, yIndex) =>
			row.map((_, xIndex) =>
				getNeighbors(grid, xIndex, yIndex)
					.map(dir => {
						const taller = dir.findIndex(
							value => !(value < grid[xIndex][yIndex])
						);

						return taller === -1 ? dir.length : taller + 1;
					})
					.reduce((product, n) => product * n, 1)
			)
		)
	);
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
