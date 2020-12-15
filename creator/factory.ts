// factory pattern

enum computer_types {
	PC,
	SERVER,
}

/**
 * Abstract class, which defines, all the methods for the concrete classes.
 */
abstract class Computer {
	public abstract getRAM(): string;
	public abstract getHDD(): string;
	public abstract getCPU(): string;

	public toString(): string {
		return `"RAM= ${this.getRAM()}, HDD=${this.getHDD()}, CPU=${this.getCPU()}`;
	}
}

/**
 * concrete class which extends the abstract class
 */
class PC extends Computer {
	private ram: string;
	private hdd: string;
	private cpu: string;

	constructor(ram, hdd, cpu) {
		super();
		this.ram = ram;
		this.hdd = hdd;
		this.cpu = cpu;
	}

	public getRAM(): string {
		return this.ram;
	}
	public getHDD(): string {
		return this.hdd;
	}
	public getCPU(): string {
		return this.cpu;
	}
}

/**
 * concrete class which extends the abstract class
 */
class Server extends Computer {
	private ram: string;
	private hdd: string;
	private cpu: string;

	constructor(ram: string, hdd: string, cpu: string) {
		super();
		this.ram = ram;
		this.hdd = hdd;
		this.cpu = cpu;
	}

	public getRAM(): string {
		return this.ram;
	}
	public getHDD(): string {
		return this.hdd;
	}
	public getCPU(): string {
		return this.cpu;
	}
}

/**
 * An consumer class, which helps the client application to get the desired output.
 */
class ComputerFactory {
	getComputer(type: computer_types, ram: string, hdd: string, cpu: string) {
		if (type === computer_types.PC) {
			return new PC(ram, hdd, cpu);
		} else if (type === computer_types.SERVER) {
			return new Server(ram, hdd, cpu);
		}
	}
}

const computerFactory = new ComputerFactory();

const pc = computerFactory.getComputer(
	computer_types.PC,
	"2 GB",
	"500 GB",
	"2.4 GHz"
);
const server = computerFactory.getComputer(
	computer_types.SERVER,
	"20 GB",
	"10 TB",
	"6 GHz"
);

console.log(pc);
console.log(server);
