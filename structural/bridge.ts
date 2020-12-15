/**
 * Bridge the implementation between two interface without knowing its concerte classes
 *
 * Here the vehile interface and workshop interface communicates without knowing concrete classes.
 */

abstract class Vehicle {
	protected workShop1: Workshop;
	protected workShop2: Workshop;

	constructor(workShop1: Workshop, workShop2: Workshop) {
		this.workShop1 = workShop1;
		this.workShop2 = workShop2;
	}

	public abstract manufacture(): void;
}

// Refine abstraction 1 in bridge pattern
class Car extends Vehicle {
	workShop1: Workshop;
	workShop2: Workshop;

	constructor(workShop1: Workshop, workShop2: Workshop) {
		super(workShop1, workShop2);

		this.workShop1 = workShop1;
		this.workShop2 = workShop2;
	}

	public manufacture(): void {
		console.log("Car ");
		this.workShop1.work();
		this.workShop2.work();
	}
}

// Refine abstraction 2 in bridge pattern
class Bike extends Vehicle {
	workShop1: Workshop;
	workShop2: Workshop;

	constructor(workShop1: Workshop, workShop2: Workshop) {
		super(workShop1, workShop2);

		this.workShop1 = workShop1;
		this.workShop2 = workShop2;
	}

	public manufacture(): void {
		console.log("BIKE ");
		this.workShop1.work();
		this.workShop2.work();
	}
}

// Implementor for bridge pattern
interface Workshop {
	work(): void;
}

// Concrete implementation 1 for bridge pattern
class Produce implements Workshop {
	public work(): void {
		console.log("Produced");
	}
}

// Concrete implementation 2 for bridge pattern
class Assemble implements Workshop {
	public work(): void {
		console.log(" And");
		console.log(" Assembled.");
	}
}

// Demonstration of bridge design pattern
class BridgePattern {
	vehicle1: Vehicle;
	vehicle2: Vehicle;
	constructor() {
		this.vehicle1 = new Car(new Produce(), new Assemble());
		this.vehicle1.manufacture();
		this.vehicle2 = new Bike(new Produce(), new Assemble());
		this.vehicle2.manufacture();
	}
}

new BridgePattern();
