/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const fmtInput = (data: string) =>
	data.split("\n").map(cmd => {
		const [direction, val] = cmd.split(" ");
		return [direction, +val];
	});

type Directions = "U" | "D" | "L" | "R";

class Knot {
	constructor(public x: number, public y: number) {}

	moveOnce(direction: Directions) {
		if (direction === "D") this.y -= 1;
		if (direction === "U") this.y += 1;
		if (direction === "R") this.x += 1;
		if (direction === "L") this.x -= 1;
	}

	follow(leader: Knot) {
		const dx = leader.x - this.x;
		const dy = leader.y - this.y;

		if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) return;
		this.x += Math.sign(dx);
		this.y += Math.sign(dy);
	}
}

class Counter {
	public set = new Set<string>([`0,0`]);

	writePosition({ x, y }: Knot) {
		this.set.add(`${x},${y}`);
	}
}

const question1 = (data: (number | string)[][]) => {
	const counter = new Counter();

	const [head, tail] = Array.from({ length: 2 }, _ => new Knot(0, 0));

	for (const [direction, tiles] of data) {
		Array.from({ length: tiles as number }).forEach(() => {
			head.moveOnce(direction as Directions);
			tail.follow(head);
			counter.writePosition(tail);
		});
	}

	return counter.set.size;
};

const question2 = (data: (number | string)[][]) => {
	const counter = new Counter();

	const knots = Array.from({ length: 10 }, _ => new Knot(0, 0));

	for (const [direction, tiles] of data) {
		Array.from({ length: tiles as number }).forEach(() => {
			knots[0].moveOnce(direction as Directions);
			knots.slice(0, -1).forEach((_, i) => knots[i + 1].follow(knots[i]));
			counter.writePosition(knots[knots.length - 1]);
		});
	}

	return counter.set.size;
};

const solution = (input: string) => {
	const data = fmtInput(input);
	// return question1(data);
	return question2(data);
};

export default solution;
