/**
 * memento pattern introduce state maintainance without disturbing other implementation details of the originator, where more business logics
 * might be expected.
 *
 * Memento has originator, memento, caretaker, where caretaker takes care of restoring the originator state.
 *
 * Memento - single object / single memory.
 * Caretaker - maintans all the list of values.
 * Originator - Originator originates and save state to memento, and return memento (state), which can be stored to caretaker.
 */

interface IMemento {
	state: any;
}

interface IOrignator {
	data: any;
}

class Memento implements IMemento {
	state: any;

	constructor(state) {
		this.state = state;
	}

	getState() {
		return this.state;
	}
}

class Originator implements IOrignator {
	data: any;

	constructor() {}

	saveState() {
		return new Memento(this.data);
	}

	setState(data) {
		this.data = data;
		return this;
	}

	getState() {
		return this.data;
	}

	getStateFromMemento(memento: Memento) {
		this.data = memento.getState();
	}
}

class CareTaker {
	memento: Array<Memento> = [];

	add(memento: Memento) {
		this.memento.push(memento);
	}

	get(index: number): Memento {
		return this.memento[index];
	}
}

class Client {
	constructor() {
		const originator = new Originator();
		const careTaker = new CareTaker();

		originator.setState("State #1");
		originator.setState("State #2");
		careTaker.add(originator.saveState());

		originator.setState("State #3");
		careTaker.add(originator.saveState());

		originator.setState("State #4");
		console.log("Current State: " + originator.getState());

		originator.getStateFromMemento(careTaker.get(0));
		console.log("First saved State: " + originator.getState());
		originator.getStateFromMemento(careTaker.get(1));
		console.log("Second saved State: " + originator.getState());
	}
}

new Client();
