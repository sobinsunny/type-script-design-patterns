/**
 * Mediator pattern is used to reduce communication complexity between multiple objects or classes.
 * This pattern provides a mediator class which normally handles all the communications between
 * different classes and supports easy maintenance of the code by loose coupling.
 * Mediator pattern falls under behavioral pattern category.
 *
 * e.g. Both inventory and shipping needs to be infomed on placement of order to update their state
 * based on some condition or dependent condition like only if inventory is there, then update shipping.
 */

interface IOrderMediator {
	informPlacedOrder(noOfItems: number): void;
}

interface IOrderColleagues {
	executeOrder(noOfItems: number): boolean;
}

class OrderMediator implements IOrderMediator {
	inventory: IOrderColleagues;
	shipping: IOrderColleagues;

	constructor(inventory: IOrderColleagues, shipping: IOrderColleagues) {
		this.inventory = inventory;
		this.shipping = shipping;
	}

	informPlacedOrder(noOfItems: number) {
		const orderPlaced = this.inventory.executeOrder(noOfItems);

		if (orderPlaced) {
			this.shipping.executeOrder(noOfItems);
		}
	}
}

class InventoryStore implements IOrderColleagues {
	noOfItems: number;

	constructor(noOfItems: number) {
		this.noOfItems = noOfItems;
	}

	executeOrder(noOfItems: number): boolean {
		if (this.noOfItems - noOfItems >= 0) {
			this.noOfItems -= noOfItems;
			console.log("Inventory updated, has  " + this.noOfItems + " items now");
			return true;
		}
		return false;
	}
}

class Shipping implements IOrderColleagues {
	executeOrder(noOfItems: number): boolean {
		console.log("shipped " + noOfItems + " item....");
		return true;
	}
}

const inventory = new InventoryStore(10);
const shipping = new Shipping();

const orderMediator = new OrderMediator(inventory, shipping);

orderMediator.informPlacedOrder(8);
