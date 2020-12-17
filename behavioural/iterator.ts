/**
 * Iterator pattern is very commonly used design pattern in Java and .Net programming environment.
 * This pattern is used to get a way to access the elements of a collection object
 * in sequential manner without any need to know its underlying representation.
 */
interface IIterator {
	read(): any;
	hasMore(): boolean;
}

interface ICollection {
	getIterator(): IIterator;
	getItems(): Array<any>;
}

class SequenceIterator implements IIterator {
	index: number = 0;
	collection: ICollection;

	constructor(collection: ICollection) {
		this.collection = collection;
	}
	hasMore() {
		if (this.collection.getItems()[this.index]) {
			return true;
		}

		return false;
	}
	read() {
		const data = this.collection.getItems()[this.index];
		this.index++;
		return data;
	}
}

class StringCollection implements ICollection {
	collection: Array<any> = [];

	addData(data: any): void {
		this.collection.push(data);
	}

	getItems(): Array<any> {
		return this.collection;
	}

	getIterator(): IIterator {
		return new SequenceIterator(this);
	}
}

const stringData = new StringCollection();
stringData.addData("sample-1");
stringData.addData("sample-2");
stringData.addData("sample-3");
stringData.addData("sample-4");

const iterator = stringData.getIterator();

while (iterator.hasMore()) {
	console.log(iterator.read());
}
