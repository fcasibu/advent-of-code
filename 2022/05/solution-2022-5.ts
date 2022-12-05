/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const NUMBER_OF_STACKS = 9;
const ELEMENT_POS = 1;
const ELEMENT_SPACE = 4;

class Board {
	private boardMap: string[][] = Array.from(
		{ length: NUMBER_OF_STACKS },
		v => []
	);

	constructor(boardInput: string) {
		for (const line of boardInput.split("\n").slice(0, -1)) {
			for (let i = ELEMENT_POS; i < line.length; i += ELEMENT_SPACE) {
				if (line[i] === " ") continue;
				const stackNumber = Math.floor(i / 4);
				this.boardMap[stackNumber].push(line[i]);
			}
		}
	}

	moveParser(actionQuantities: string[], { reverse }: { reverse: boolean }) {
		const [qty, from, to] = actionQuantities;

		const extracted = this.boardMap[+from - 1].splice(0, +qty);
		const elementsToBePushed = reverse ? extracted.reverse() : extracted;
		this.boardMap[+to - 1].unshift(...elementsToBePushed.reverse());
	}

	getTopStack() {
		return this.boardMap.map(stack => stack[0]).reduce((p, c) => p + c, "");
	}
}

const getData = (action: string) =>
	action.split(" ").filter((v, i) => i % 2 !== 0);

const question = (data: string, part: number) => {
	const [boardInput, instructions] = data.split("\n\n");
	const board = new Board(boardInput);

	instructions
		.split("\n")
		.forEach(action =>
			board.moveParser(
				getData(action),
				part === 1 ? { reverse: true } : { reverse: false }
			)
		);
	return board.getTopStack();
};

const solution = (data: string) => {
	return question(data, 1);
	// return question(data, 2);
};

export default solution;
