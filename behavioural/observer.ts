/**
 * Observer pattern is like pub sub, where the observers needs to be registered/unregister with the publisher for events
 *
 * e.g. Here campaign class is listening to the order class to generate new coupon based on the no.of orders places, so everytime
 * an new order is placed, the observer will be updated.
 */

const ORDER_PLACED = "order_placed";
const ORDER_RETURNED = "order_returned";

interface IObserver {
	on(topic: string, data: any): void;
}

class Order {
	observers: Array<IObserver> = [];

	constructor() {}

	addObserver(observer: IObserver) {
		this.observers.push(observer);
	}

	placeOrder(str: string) {
		console.log("Placing order....");
		this.observers.forEach((observer) => {
			observer.on(ORDER_PLACED, str);
		});
	}

	returnOrder(str: string) {
		console.log("Returning order....");
		this.observers.forEach((observer) => {
			observer.on(ORDER_RETURNED, str);
		});
	}
}

class CustomerCampaign implements IObserver {
	placedOrder: number = 0;
	couponEligibility: number = 3;

	on(topic: string, data: any): void {
		if (topic == ORDER_PLACED) {
			this.placedOrder++;
		} else if (topic == ORDER_RETURNED) {
			this.placedOrder--;
		}

		if (this.placedOrder >= this.couponEligibility) {
			console.log("You are eligible for the `FLAT50` coupon code ");
		} else {
			console.log(
				"Still " +
					(this.couponEligibility - this.placedOrder) +
					" orders need to be placed for coupon code "
			);
		}
	}
}

const order = new Order();
order.addObserver(new CustomerCampaign());

order.placeOrder("Product - 1");
order.placeOrder("Product - 2");
order.placeOrder("Product - 3");

order.returnOrder("Product - 3");
