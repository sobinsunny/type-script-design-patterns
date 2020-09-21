/**
 * template pattern is all about just extending the behaviour of the callses.
 */
class Parser {
    str: string

    read(str: string):  void {
        this.str = str;
    }

    parse(): string {
        return this.str;
    }

    print(): string {
        return this.str;
    }
}

class IntegerParser extends Parser {
    constructor() {
        super();
    }

    parse(): string {
        this.str = this.str.replace(/\d/, "");
        return this.str;
    }
}

class EmptyParser extends Parser {
    constructor() {
        super();
    }

    parse(): string {
        this.str = this.str.replace(/\s/, " _ ");
        return this.str;
    }

}

const intParser = new IntegerParser();
const emptyParser = new EmptyParser();

intParser.read("on 1 fine day");
const parsedData = intParser.parse();

console.log(parsedData);

emptyParser.read(parsedData);
console.log(emptyParser.parse());
