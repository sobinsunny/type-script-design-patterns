/**
 * Chain of responsibilities are like an class is build using the next operation via interface,
 * which may or may not affect the state of the application.
 *
 * e.g. Here we dont know, who will make the requested drink, either, coffee, tea, or beer class but someone
 * takes responsibility or all, incase you want to mix coffee with beer, you could still achieve that the implementation
 */

interface Drink {
	registerNextDrinkHandler(drink: Drink): void;
	makeDrink(requestedDrink: MyDrink): void;
}

class Coffee implements Drink {
	nextDrink: Drink;

	makeDrink(requestedDrink: MyDrink): void {
		if (requestedDrink.getDrinkType() == "coffee") {
			console.log("Making coffee...");
		} else if (this.nextDrink) {
			console.log("so you dont like coffee...");
			this.nextDrink.makeDrink(requestedDrink);
		}
	}

	registerNextDrinkHandler(drink: Drink) {
		this.nextDrink = drink;
	}
}

class Tea implements Drink {
	nextDrink: Drink;

	makeDrink(requestedDrink: MyDrink): void {
		if (requestedDrink.getDrinkType() == "tea") {
			console.log("Making tea...");
		} else if (this.nextDrink) {
			console.log("so you dont like tea...");
			this.nextDrink.makeDrink(requestedDrink);
		}
	}

	registerNextDrinkHandler(drink: Drink) {
		this.nextDrink = drink;
	}
}

class Beer implements Drink {
	nextDrink: Drink;

	makeDrink(requestedDrink: MyDrink): void {
		if (requestedDrink.getDrinkType() == "beer") {
			console.log("Making beer...");
		} else if (this.nextDrink) {
			this.nextDrink.makeDrink(requestedDrink);
		}
	}

	registerNextDrinkHandler(drink: Drink) {
		this.nextDrink = drink;
	}
}

class MyDrink {
	drinkType: string;
	constructor(drinkType: string) {
		this.drinkType = drinkType;
	}

	getDrinkType(): string {
		return this.drinkType;
	}
}

const myDrink = new MyDrink("beer");

const coffee = new Coffee();
const tea = new Tea();
const beer = new Beer();

coffee.registerNextDrinkHandler(tea);
tea.registerNextDrinkHandler(beer);

coffee.makeDrink(myDrink);
