/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const DIGIT_TEXT_REGEX = /\d+/;

class Pointer {
	public pointer: string[] = [];
	constructor() {}

	moveInto(element: string) {
		this.pointer.push(element);
	}

	moveOut() {
		this.pointer.pop();
	}

	print() {
		return this.pointer.reduce((fs, dir) => `${fs}%${dir}`);
	}
}

const instructionParser = (
	systemStacks: Map<string, number>,
	pointer: Pointer,
	instruction: string
) => {
	const args = instruction.split(" ");

	if (args[0] === "$")
		switch (args[1]) {
			case "cd":
				if (args[2] === "..") {
					pointer.moveOut();
					break;
				}

				pointer.moveInto(args[2]);

			default:
				return;
		}

	if (DIGIT_TEXT_REGEX.test(args[0])) {
		let reducer = pointer.print();
		while (reducer !== "") {
			systemStacks.set(
				reducer,
				+args[0] + (systemStacks.get(reducer) ?? 0)
			);
			reducer = reducer.split("%").slice(0, -1).join("%");
		}
	}
};

const question1 = (data: string) => {
	const systemStacks = new Map<string, number>();
	const pointer = new Pointer();

	data.split("\n").forEach(instruction => {
		instructionParser(systemStacks, pointer, instruction);
	});

	return [...systemStacks.values()].reduce(
		(total, size) => (size <= 100_000 ? size + total : total),
		0
	);
};

const question2 = (data: string) => {
	const systemStacks = new Map<string, number>();
	const pointer = new Pointer();

	data.split("\n").forEach(instruction => {
		instructionParser(systemStacks, pointer, instruction);
	});

	const DISK_SIZE = 70_000_000;
	const REQUIRED_FREE_SPACE = 30_000_000;
	const TO_DELETE = Math.abs(
		DISK_SIZE - systemStacks.get("/")! - REQUIRED_FREE_SPACE
	);

	return [...systemStacks.values()].reduce((acc, cur) => {
		if (cur > TO_DELETE && cur < acc) return cur;
		return acc;
	}, Number.POSITIVE_INFINITY);
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
