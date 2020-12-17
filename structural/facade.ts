/**
 * Facade pattern introduce encapsulation internal sub systems functionalities and provide the
 * required function.
 *
 * e.g. The DrinkFacade hides Coffee and Beer classes and provide the required function by the client.
 * when the client says, coffee it initiates coffee, if it says beer it initiates beer.
 *
 * Hides complexity and provide an interface for the client to access the original / concrete class
 *
 * Note: The subsystems can be implemented from common interface, to make the classes more discipline
 */

class Coffee {
	constructor() {
		console.log("Making Coffee....");
	}
}

class Beer {
	constructor() {
		console.log("Brewing Beer....");
	}
}

class DrinkFacade {
	constructor(drink: String) {
		if (drink == "Coffee") {
			return new Coffee();
		} else if (drink == "Beer") {
			return new Beer();
		} else {
			// throw new Error('Unknown drink...')
		}
	}
}

const coffee = new DrinkFacade("Coffee");
const beer = new DrinkFacade("Beer");

const unknown = new DrinkFacade("tea");
