/**
 * Strategy pattern, executes the logic on the basis of the recent strategy set (context set)
 *
 * e.g. here based addition or subtraction, the application is behaving based on different strategies
 */

interface ICalcStrategy {
	execute(valOne: number, valTwo: number): number;
}

interface ICalcContext {
	setStrategy(strategy: ICalcStrategy): void;
	execute(valOne: number, valTwo: number): number;
}

class Add implements ICalcStrategy {
	execute(valOne: number, valTwo: number): number {
		return valOne + valTwo;
	}
}

class Multiply implements ICalcStrategy {
	execute(valOne: number, valTwo: number): number {
		return valOne * valTwo;
	}
}

class SimpleCalc implements ICalcContext {
	strategy: ICalcStrategy;

	setStrategy(strategy: ICalcStrategy): void {
		this.strategy = strategy;
	}

	execute(valOne: number, valTwo: number): number {
		return this.strategy.execute(valOne, valTwo);
	}
}

const calculator = new SimpleCalc();
const add = new Add();
const multiply = new Multiply();

calculator.setStrategy(add);
console.log("ADD ", calculator.execute(10, 10));

calculator.setStrategy(multiply);
console.log("Multiply ", calculator.execute(5, 2));
