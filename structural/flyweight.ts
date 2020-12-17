/**
 * Flyweight pattern is also refered as cache pattern, where the object are cached based on the required
 * objects behaviour.
 *
 * e.g. here the hot choclate factory caches the object and skips instanting new instance every time
 * based on the type of instance the client wants.
 *
 * This sounds like creational pattern but this is structural pattern because it defines how the objects structured
 * inside the concerete factory class
 *
 * same object properties will be customized so that we can avoid creating new objects.
 *
 * when a match is found old one will be customized, else new one will be used.
 * it will reduce objects and helps in structuring the object.
 */
class HotChoclate {
	getHotChoclate(): void {
		console.log("This is your hot choclate...");
	}
}

class BrownieChoclate {
	getBrownieChoclate(): void {
		console.log("This is your brownie choclate...");
	}
}

class ChoclateFactory {
	hotChoclateCache: any;
	brownieChoclateCache: any;

	constructor() {}

	prepateHotChoclate(): any {
		if (!this.hotChoclateCache) {
			this.hotChoclateCache = new HotChoclate();
		}

		return this.hotChoclateCache;
	}

	prepareBrownieChoclate(): any {
		if (!this.brownieChoclateCache) {
			this.brownieChoclateCache = new BrownieChoclate();
		}

		return this.brownieChoclateCache;
	}
}

const choclateFactory = new ChoclateFactory();

console.time("flyweight");
for (let i = 0; i < 100000; i++) {
	const hotChoclate = choclateFactory.prepateHotChoclate();
	const brownieChoclate = choclateFactory.prepareBrownieChoclate();
	hotChoclate.getHotChoclate();
	brownieChoclate.getBrownieChoclate();
}
console.timeEnd("flyweight");
