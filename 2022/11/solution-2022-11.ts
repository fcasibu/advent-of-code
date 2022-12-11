/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

type Operation = (input: number) => number;
type Operators = "+" | "-" | "*" | "/";
type Test = {
	divisibleBy: (input: number) => number;
	whomToThrow: number[];
};
type ThrowConfig = {
	product: number;
};

class Monkey {
	public items: number[] = [];
	public operation: Operation;
	public test: Test;

	public inspectionCounter = 0;
	public divisor: number;

	constructor(monkeyData: string) {
		const [_, itemsLine, operationLine, testLine, truthLine, falseLine] =
			monkeyData.split("\n");

		const STATEMENT_SIZE_FOR_ITEMS = 17;
		const STATEMENT_SIZE_FOR_OPS = 23;
		const STATEMENT_SIZE_FOR_DIV_LINE = 21;
		const STATEMENT_SIZE_FOR_TRUTH_LINE = 29;
		const STATEMENT_SIZE_FOR_FALSY_LINE = 30;

		this.items = itemsLine
			.slice(STATEMENT_SIZE_FOR_ITEMS)
			.split(", ")
			.map(v => +v);

		const [operation, by] = operationLine
			.slice(STATEMENT_SIZE_FOR_OPS)
			.split(" ");
		this.operation = MonkeyHelper.getOperations(operation as Operators)(
			by === "old" ? undefined : +by
		);

		this.divisor = +testLine.slice(STATEMENT_SIZE_FOR_DIV_LINE);
		const divisibilityTest = (input: number) => {
			return Number(input % this.divisor !== 0);
		};
		const toThrowMonkeys = [
			+truthLine.slice(STATEMENT_SIZE_FOR_TRUTH_LINE),
			+falseLine.slice(STATEMENT_SIZE_FOR_FALSY_LINE),
		];
		this.test = {
			divisibleBy: divisibilityTest,
			whomToThrow: toThrowMonkeys,
		};
	}

	throwItems(
		allMonkeys: Monkey[],
		worryMultiplier: number,
		config?: ThrowConfig
	) {
		while (this.items.length !== 0) {
			this.inspectionCounter += 1;
			const item = this.operation(this.items.shift() as number);
			const boredValue =
				config === undefined
					? Math.floor(item / worryMultiplier)
					: item % config!.product;
			const sendToIndex = this.test.divisibleBy(boredValue);
			allMonkeys[this.test.whomToThrow[sendToIndex]].receiveItems(
				boredValue
			);
		}
	}

	receiveItems(input: number) {
		this.items.push(input);
	}
}

class MonkeyHelper {
	static getOperations(operation: Operators) {
		switch (operation) {
			case "+":
				return (by: number | undefined) => (input: number) =>
					input + (by ?? input);
			case "-":
				return (by: number | undefined) => (input: number) =>
					input - (by ?? input);
			case "*":
				return (by: number | undefined) => (input: number) =>
					input * (by ?? input);
			case "/":
				return (by: number | undefined) => (input: number) =>
					input / (by ?? input);
		}
	}
}

const question1 = (data: string) => {
	const monkeys = data.split("\n\n").map(statement => new Monkey(statement));

	const NUMBER_OF_ROUNDS = 20;
	const WORRY_MUPLTLE = 3;

	for (let i = 0; i < NUMBER_OF_ROUNDS; i++)
		monkeys.forEach(monkey => monkey.throwItems(monkeys, WORRY_MUPLTLE));

	const [mostActive, secondMostActive, ...rest] = monkeys
		.map(monkey => monkey.inspectionCounter)
		.sort((a, b) => b - a);

	return mostActive * secondMostActive;
};

const question2 = (data: string) => {
	const monkeys = data.split("\n\n").map(statement => new Monkey(statement));

	const NUMBER_OF_ROUNDS = 10_000;
	const WORRY_MUPLTLE = 1;
	const productOfAllDivisors = monkeys.reduce(
		(acc, monkey) => (acc *= monkey.divisor),
		1
	);

	for (let i = 0; i < NUMBER_OF_ROUNDS; i++)
		monkeys.forEach(monkey =>
			monkey.throwItems(monkeys, WORRY_MUPLTLE, {
				product: productOfAllDivisors,
			})
		);

	const [mostActive, secondMostActive, ...rest] = monkeys
		.map(monkey => monkey.inspectionCounter)
		.sort((a, b) => b - a);

	return mostActive * secondMostActive;
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
