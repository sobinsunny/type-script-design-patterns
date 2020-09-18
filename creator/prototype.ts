// clonable interface, concrete class, registry class

interface Clonable {
    clone()
}

class PrototypeClass implements Clonable {
    constructor() {
        // time consuming instance.
        for (let i = 0; i < 100000; i++) {}
    }
    clone() {
        return (<any>Object).assign({}, this)
    }
    
}


class Registry {
    private prototypeInstance: Clonable
    getInstance(): Clonable {
        console.time("Getting NEW instance..");
        this.prototypeInstance = new PrototypeClass();
        console.timeEnd("Getting NEW instance..");
        return this.prototypeInstance;
    }

    getClone(): Clonable {
        console.time("Getting CLONED instance..");
        const clonedInstance = this.prototypeInstance.clone();
        console.timeEnd("Getting CLONED instance..");
        return clonedInstance
    }
}


const registry = new Registry();

registry.getInstance();
registry.getClone();

