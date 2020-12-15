/**
 * Director to build, director build the original product.
 */

interface IComputer {
	ram: string;
	cpu: string;
	hdd: string;
	screen_size: number;
	battery_size: number;

	setScreenSize(size: number): IComputer;
	setBatterSize(size: number): IComputer;
}

interface IComputerBuilder {
	buildPC(): IComputer;
	buildServer(): IComputer;
}

class PC implements IComputer {
	ram: string;
	cpu: string;
	hdd: string;
	screen_size: number = 14;
	battery_size: number = 6000;

	constructor(ram: string, cpu: string, hdd: string) {
		this.ram = ram;
		this.cpu = cpu;
		this.hdd = hdd;
	}
	setScreenSize(size: number): IComputer {
		this.screen_size = size;
		return this;
	}
	setBatterSize(size: number): IComputer {
		this.battery_size = size;
		return this;
	}
}

class Director implements IComputerBuilder {
	buildPC(): IComputer {
		return new PC("4GB", "Intel i7", "250GB")
			.setBatterSize(7000)
			.setScreenSize(14);
	}
	buildServer(): IComputer {
		return new PC("16GB", "Intel i7", "500GB")
			.setBatterSize(9000)
			.setScreenSize(16);
	}
}

const director = new Director();

console.log(director.buildPC());
console.log(director.buildServer());
