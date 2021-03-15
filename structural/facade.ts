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

class Milk {
	constructor() {
		console.log("Making Milk....");
	}
}

class Sugar {
	constructor() {
		console.log("Adding Sugar...");
	}
}

class Coffee {
	constructor() {
		console.log("Adding Coffee Powder...");
	}
}

class DrinkFacade {
	constructor() {}

	makeDrink() {
		new Milk(); // sub-system
		new Coffee(); // sub-system
		new Sugar(); // sub-system
	}
}
new DrinkFacade().makeDrink();
