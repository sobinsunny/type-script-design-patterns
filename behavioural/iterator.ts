
/**
 * Iterator pattern, helps in traversing the collection, without knowing its underlying data structure.
 * e.g. Here the sequenceIteractor iterates thhroug StringCOllection, so the collections can be of any data structure
 * such as stack, queue, graph, but the client application can only do sequential iteration over the data.
 */
interface IIterator {
    read(): any
    hasMore(): boolean
}

interface ICollection {
    getIterator(): IIterator
    getItems(): Array<any>
}

class SequenceIterator implements IIterator {
    index: number = 0;
    collection: ICollection;

    constructor(collection: ICollection) {
        this.collection = collection
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
    collection: Array<any> = []

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

while(iterator.hasMore()) {
    console.log(iterator.read());
}