/**
 * visitor is the interface which can be supplied to the concrete class
 *
 * Monitor, Laptop are the vistor, which can be supplied to the ChristmasShoppingCart
 * which takes and provides additional functionality
 */

interface IShoppingCategory {
	getPrice();
	add(shoppingItem: IShoppingCart): number;
}

interface IShoppingCart {
	laptopOffer(shoppingItem: Laptop);
	monitorOffer(shoppingItem: Monitor);
}

class Laptop implements IShoppingCategory {
	price: number = 98363;

	getPrice() {
		return this.price;
	}

	add(shoppingItem: IShoppingCart) {
		return shoppingItem.laptopOffer(this);
	}
}

class Monitor implements IShoppingCategory {
	price: number = 12398;

	getPrice() {
		return this.price;
	}

	add(shoppingItem: IShoppingCart) {
		return shoppingItem.monitorOffer(this);
	}
}

class ChristmasShoppingCart implements IShoppingCart {
	offerPercentage: number = 2.7;

	laptopOffer(shoppingItem: Laptop) {
		return shoppingItem.getPrice() * ((100 - this.offerPercentage) / 100);
	}
	monitorOffer(shoppingItem: Monitor) {
		return shoppingItem.getPrice() * ((100 - this.offerPercentage) / 100);
	}
}

const laptop = new Laptop();
const monitor = new Monitor();

const christmasShoppingCart = new ChristmasShoppingCart();

console.log(laptop.add(christmasShoppingCart));
console.log(monitor.add(christmasShoppingCart));
