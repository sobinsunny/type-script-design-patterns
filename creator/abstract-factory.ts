/**
 * This is an factory of factories.
 */
abstract class Product {
	abstract getDetails(): string;
}

class Chair extends Product {
	getDetails(): string {
		console.log("Chair brand unknown...");
		return "Chair Brand Unknown";
	}
}

class Table extends Product {
	getDetails(): string {
		console.log("table brand unknown...");
		return "Table Brand Unknown";
	}
}

class Mobile extends Product {
	getDetails(): string {
		console.log("mobile brand unknown...");
		return "Mobile Brand Unknown";
	}
}

class SmartWatch extends Product {
	getDetails(): string {
		console.log("smart brand unknown...");
		return "smart watch Unknown";
	}
}

enum product_categories {
	FURNITURE,
	GADGETS,
}

enum products {
	TABLE,
	CHAIR,
	MOBILE,
	SMART_WATCH,
}

abstract class AbstractFactory {
	constructor() {}

	abstract getProduct(type: products): Product;
}

class FurnitureFacrory extends AbstractFactory {
	getProduct(type: products): Product {
		console.log("Looking into the furniture factory....");
		switch (type) {
			case products.CHAIR:
				return new Chair();
			case products.TABLE:
				return new Table();
		}
	}
}

class GadgetsFactory extends AbstractFactory {
	getProduct(type: products): Product {
		console.log("Looking into the Gadgets factory....");
		switch (type) {
			case products.MOBILE:
				return new Mobile();
			case products.SMART_WATCH:
				return new SmartWatch();
		}
	}
}

class WareHouse {
	getFactory(type: product_categories): AbstractFactory {
		switch (type) {
			case product_categories.FURNITURE:
				return new FurnitureFacrory();
			case product_categories.GADGETS:
				return new GadgetsFactory();
		}
	}
}

class Client {
	constructor() {
		const wareHouse = new WareHouse();

		wareHouse
			.getFactory(product_categories.FURNITURE)
			.getProduct(products.CHAIR)
			.getDetails();

		wareHouse
			.getFactory(product_categories.FURNITURE)
			.getProduct(products.TABLE)
			.getDetails();

		wareHouse
			.getFactory(product_categories.GADGETS)
			.getProduct(products.MOBILE)
			.getDetails();
		wareHouse
			.getFactory(product_categories.GADGETS)
			.getProduct(products.SMART_WATCH)
			.getDetails();
	}
}

const client = new Client();
