/**
 * • Year - ${YEAR}
 * • Day  - ${DAY}
 */

const detectInCycles = [20, 60, 100, 140, 180, 220];

class Counter {
	public strengthStore = 0;
	constructor(public cycles: number, public X: number) {}

	tally() {
		if (detectInCycles.includes(this.cycles)) {
			this.strengthStore += this.cycles * this.X;
			console.log(this.cycles, this.X, this.strengthStore);
		}
	}

	noop() {
		this.cycles += 1;
		this.tally();
	}

	addX(V: number) {
		this.noop();
		this.noop();
		this.X += V;
	}
}

const question1 = (data: string) => {
	const counter = new Counter(0, 1);

	data.split("\n").forEach(line => {
		const [_, val] = line.split(" ");
		if (val === undefined) counter.noop();
		else counter.addX(+val);
	});

	return counter.strengthStore;
};

const [HEIGHT, WIDTH] = [6, 40];

class CRT {
	public screen = Array.from({ length: HEIGHT }, () =>
		Array.from({ length: WIDTH }, () => ".")
	);
	constructor() {}

	findPosition(X: number, col: number) {
		return X - 1 <= col && X + 1 >= col ? "█" : " ";
	}

	draw(cycle: number, X: number) {
		const col = cycle % WIDTH;
		const row = Math.floor(cycle / WIDTH);
		this.screen[row][col] = this.findPosition(X, col).repeat(2);
	}
}

const question2 = (data: string) => {
	const counter = new Counter(0, 1);
	const crt = new CRT();

	const execCycle = () => {
		crt.draw(counter.cycles, counter.X);
		counter.noop();
	};

	data.split("\n").forEach(line => {
		const [_, val] = line.split(" ");
		if (val === undefined) {
			execCycle();
		} else {
			execCycle();
			execCycle();
			counter.X += +val;
		}
	});

	console.log(crt.screen);
};

const solution = (data: string) => {
	// return question1(data);
	return question2(data);
};

export default solution;
