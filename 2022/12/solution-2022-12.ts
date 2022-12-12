/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

// basic typing

type Position = [number, number];
type Board = string[][];
type QueueElement = [number, Position];

// constant declaration

interface ConstantTypes {
	STARTLETTER: string;
	ENDLETTER: string;
	LOWEST: string;
	HIGHEST: string;
}

const constantCreator = (): ConstantTypes => ({
	STARTLETTER: "S",
	ENDLETTER: "E",
	LOWEST: "a",
	HIGHEST: "z",
});

// helper functions

class Helpers {
	static parser(data: string, constants: ConstantTypes) {
		let start: Position = [-1, -1],
			end: Position = [-1, -1];

		const grid = data.split("\n").map((line, xIndex) => {
			const letters = line.split("");

			if (start[1] === -1) {
				const yIndex = letters.indexOf(constants.STARTLETTER);
				if (yIndex !== -1) {
					start = [xIndex, yIndex];
					letters[yIndex] = constants.LOWEST;
				}
			}
			if (end[1] === -1) {
				const yIndex = letters.indexOf(constants.ENDLETTER);
				if (yIndex !== -1) {
					end = [xIndex, yIndex];
					letters[yIndex] = constants.HIGHEST;
				}
			}

			return letters;
		});

		return { start, end, grid };
	}

	static getSurroundingIndices(pos: Position) {
		return [
			[pos[0] - 1, pos[1]],
			[pos[0] + 1, pos[1]],
			[pos[0], pos[1] - 1],
			[pos[0], pos[1] + 1],
		] as Position[];
	}

	static stringifyPosition(pos: Position) {
		return `${pos[0]},${pos[1]}`;
	}
}

// grid function

interface GridConstructor {
	start: Position;
	end: Position;
	grid: Board;
}

class Grid {
	private startPos: Position;
	public endPos: Position;

	private board: Board;
	private height: number;
	private width: number;

	constructor({ start, end, grid }: GridConstructor) {
		this.startPos = start;
		this.endPos = end;

		this.board = grid;
		this.height = grid.length;
		this.width = grid[0].length;
	}

	findShortestPath(
		searcher: "forward" | "backward",
		start: Position = this.startPos,
		end: Position | string = this.endPos
	) {
		const queue: QueueElement[] = [[0, start]];
		const visitedCells = new Set<string>();

		while (queue.length !== 0) {
			const [distance, position] = queue.shift()!;

			const positionAsString = Helpers.stringifyPosition(position);

			if (typeof end === "string") {
				if (end === this.getCharFromBoard(position)) return distance;
			} else {
				if (positionAsString === Helpers.stringifyPosition(this.endPos))
					return distance;
			}

			if (visitedCells.has(positionAsString)) continue;

			visitedCells.add(positionAsString);

			const searchArray =
				searcher === "forward"
					? this.getForwardNeighbours(position)
					: this.getBackwardNeighbours(position);

			for (const pos of searchArray) {
				if (visitedCells.has(Helpers.stringifyPosition(pos))) continue;
				queue.push([distance + 1, pos]);
			}
		}
	}

	getCharFromBoard = (pos: Position) => {
		return this.board[pos[0]][pos[1]];
	};

	getNeighboursInLimits(pos: Position) {
		return Helpers.getSurroundingIndices(pos).filter(
			surroundingPos =>
				surroundingPos[0] >= 0 &&
				surroundingPos[0] < this.height &&
				surroundingPos[1] >= 0 &&
				surroundingPos[1] < this.width
		);
	}

	getForwardNeighbours(pos: Position) {
		const next = this.getCharFromBoard(pos).charCodeAt(0) + 1;
		const nextNeighbours = this.getNeighboursInLimits(pos);

		return nextNeighbours.filter(neighbourPos => {
			const charCode = this.getCharFromBoard(neighbourPos).charCodeAt(0);
			return charCode <= next;
		});
	}

	getBackwardNeighbours(pos: Position) {
		const next = this.getCharFromBoard(pos).charCodeAt(0) - 1;
		const nextNeighbours = this.getNeighboursInLimits(pos);

		return nextNeighbours.filter(neighbourPos => {
			const charCode = this.getCharFromBoard(neighbourPos).charCodeAt(0);
			return charCode >= next;
		});
	}
}

// questions!

const question1 = (data: string) => {
	const constants = constantCreator();

	const grid = new Grid(Helpers.parser(data, constants));

	return grid.findShortestPath("forward");
};

const question2 = (data: string) => {
	const constants = constantCreator();

	const grid = new Grid(Helpers.parser(data, constants));

	return grid.findShortestPath("backward", grid.endPos, constants.LOWEST);
};

const solution = (data: string) => {
	return question1(data);
	// return question2(data);
};

export default solution;
