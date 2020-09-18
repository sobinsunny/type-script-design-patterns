/**
 * Bridge is similiar to Adapter. But the key difference is to decouple the implementation  and abstraction.
 * 
 * e.g. Here class Mac has an implementation to set cpu, memory, and hdd. But we dont want the user to set them, we 
 * build an new entity (asbtraction) called apple store, which handles upgrading the spec for you.
 */

interface ComputerSpec {
    setCPU(cpu: string): void;
    setMemory(memory: string): void;
    setHDD(hdd: string): void;
}

class Mac implements ComputerSpec {
    private cpu: string;
    private memory: string;
    private hdd: string;

    constructor(memory: string, cpu: string, hdd: string) {
        this.memory = memory;
        this.cpu = cpu;
        this.hdd = hdd;
    }

    setCPU(cpu: string): void {
        this.cpu = cpu;
    }
    setMemory(memory: string): void {
        this.memory = memory;
    }
    setHDD(hdd: string): void {
        this.hdd = hdd;
    }
}

class AbstractAppleStore {
    private computer: ComputerSpec;

    register(computer: ComputerSpec) {
        this.computer = computer;
    }

    upgradeMemory(ram: string) {
        this.computer.setMemory(ram);
    }

    upgradeHDD(hdd: string) {
        this.computer.setHDD(hdd);
    }

    upgradeCPU(cpu: string) {
        this.computer.setCPU(cpu);
    }

    getComputer(): ComputerSpec {
        console.log(this.computer);
        return this.computer;
    }
}

const mac = new Mac("2 GB", "1.4 GHZ", "80 GB");

const appleStoreAbstraction = new AbstractAppleStore();

appleStoreAbstraction.register(mac);

appleStoreAbstraction.getComputer();
appleStoreAbstraction.upgradeCPU("2.4 GHz");
appleStoreAbstraction.upgradeHDD("500 GB");
appleStoreAbstraction.upgradeMemory("8 GB");
appleStoreAbstraction.getComputer();
