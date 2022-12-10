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
		this.cycles += 1;
		this.X += V;
		this.tally();
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

const question2 = (data: string) => {};

const solution = (data: string) => {
	return question1(data);
	// return question2(data);
};

export default solution;
