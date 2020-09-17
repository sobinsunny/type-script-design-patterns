// Abstract factory pattern


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
 * Abstract factory interface, which defines the concrete factory classes implementation
 */
interface AbstractComputerFactory {
    createComputer(): Computer;
}

/**
 * Concrete PC factory class to help defining the methods
 */
class PCFactory implements AbstractComputerFactory {
    private ram: string;
	private hdd: string;
	private cpu: string;
	
	constructor(ram: string, hdd: string, cpu: string){
		this.ram = ram;
		this.hdd = hdd;
		this.cpu = cpu;
    }
    
	public createComputer(): Computer {
		return new PC(this.ram, this.hdd, this.cpu);
    }
}

/**
 * Concrete server factory class to help defining the methods
 */
class ServerFactory implements AbstractComputerFactory {
    private ram: string;
	private hdd: string;
	private cpu: string;
	
	constructor(ram: string, hdd: string, cpu: string){
		this.ram = ram;
		this.hdd = hdd;
		this.cpu = cpu;
    }
    
	public createComputer(): Computer {
		return new Server(this.ram, this.hdd, this.cpu);
    }
}

/**
 * An consumer class, which helps the client application to get the desired output.
 */
class ComputerFactory {
    getComputer(factory: AbstractComputerFactory){
		return factory.createComputer();
	}    
}

const computerFactory = new ComputerFactory();

const pc = computerFactory.getComputer(new PCFactory("2 GB", "500 GB", "2.4 GHz"));
const server = computerFactory.getComputer(new ServerFactory("20 GB", "10 TB", "6 GHz"));

console.log(pc);
console.log(server);
