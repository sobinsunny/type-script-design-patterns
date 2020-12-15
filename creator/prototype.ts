/**
 * Cloning an object, which is costly to create
 */

interface IClonable {
	clone();
}

class Clonable implements IClonable {
	clone() {
		return Object.create(this);
	}
}

type TBook = {
	bid: string;
	name: string;
	author: string;
	publication_year: number;
};

class Book extends Clonable {
	books: Array<TBook> = [];

	constructor() {
		super();
		for (let i = 0; i < 10000; i++) {
			this.books.push({
				bid: i + "_BOOKID",
				name: "BOOK_STR_" + i,
				author: "Gayle laakmann",
				publication_year: 1991,
			});
		}
	}

	remove(index) {
		this.books.splice(index, 1);
	}

	count() {
		return this.books.length;
	}

	toString(): string {
		return `Book (${JSON.stringify(this.books)})`;
	}

	clone() {
		return super.clone();
	}
}

class Client {
	clonedBook: Book;
	constructor() {
		console.time("BOOK");
		const b = new Book();

		console.log(b.count());
		b.remove(100);
		console.log(b.count());
		console.timeEnd("BOOK");

		console.time("CLONE");
		this.clonedBook = <Book>b.clone();
		//console.log(this.clonedBook);
		console.log(this.clonedBook.count());
		console.timeEnd("CLONE");
	}
}

new Client();
