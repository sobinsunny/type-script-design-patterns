// Builder pattern (Builder, Director, concrete classes)

interface Builder {
    setCPU(cpu: string): void
    setMemory(memory: string): void
    setHDD(hdd: string): void
}

class PC implements Builder {
    private cpu: string
    private memory: string
    private hdd: string

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

class Director {
    private builder: Builder

    public setBuilder(builder: Builder) {
        this.builder = builder;
    }

    public makePC() {
        this.builder.setCPU("2.7 GHz");
        this.builder.setMemory("8 GB");
        this.builder.setHDD("250 GB");
    }

    public makeServer() {
        this.builder.setCPU("6 GHz");
        this.builder.setMemory("20 GB");
        this.builder.setHDD("10 TB");
    }

    public getProduct() {
        return this.builder;
    }
}

const director = new Director();

director.setBuilder(new PC());

director.makePC();
console.log(director.getProduct())
director.makeServer();
console.log(director.getProduct())

