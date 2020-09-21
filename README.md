# Design patterns
------------------

### Creator
It provides various mechanism to recreate / reuse the objects
* Factory
* Abstract Factory
* Builder
* Prototype
* Singleton

### Structural
It makes sure the integration and structure of the objects aligned

* Adapter
* Bridge
* Composite
* Decarator
* Facade
* Flyweight
* Proxy

### Behavioural
It make sure the algorithm seperation and assignment of responsibilities are aligned.

* Chain of responsibility
* Command
* Iterator
* Mediator
* Memento
* Observer
* State
* Strategy
* Template
* Visitor

-----

### Creational Patterns


#### Factory Method Pattern
Factory pattern extend base class and provide factory method in a class, which allows to decide the targeted object.

```typescript
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
    getComputer(type: string, ram: string, hdd: string, cpu: string) {
		if (type === 'PC') {
            return new PC(ram, hdd, cpu);
        }
        else if (type === 'Server') {
            return new Server(ram, hdd, cpu);
        }
	}    
}

const computerFactory = new ComputerFactory();

const pc = computerFactory.getComputer("PC", "2 GB", "500 GB", "2.4 GHz");
const server = computerFactory.getComputer("Server", "20 GB", "10 TB", "6 GHz");

console.log(pc);
console.log(server);
```


#### Abstract Factory Pattern
Abstract factory pattern is like factory pattern, but here the concrete classes are abstracted further, where the factory knows the definition, but doesnt instiate the objects by itself

```typescript
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

```

#### Builder Pattern
Builder pattern helps in building step by step objects, instead of making the single object heavy, where individual components of an big objects can be split further, and can be build using the "director" class. The right example would be house construction, but here, simplified using an very simple example, where CPU, RAM, HDD can even be converted to individual objects.

```typescript
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

```

#### Prototype Pattern
Prototype pattern allows to clone an instance as a new instead of creating one, which will be very useful in heavy lifting, where the object instantion requires more time. "Registry" takes care of cloning the instance.

```typescript
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

```

#### Singleton Pattern
Singletone pattern is the most commonly used creator pattern, where the instance creation is done only once in the life cycle, which is also called cache pattern.

```typescript
class Database {
    private instance: Date // can be db instance type

    public getInstance() {
        if (!this.instance) {
            this.instance = new Date(); // can be new database connection
        }

        return this.instance;
    }
}

const database = new Database();

console.log(database.getInstance());
setTimeout(() => 
{
    // same timestamp even after 1 second
    console.log(database.getInstance()); 
}, 1000)
```

--------

### Structural Patterns

#### Adapter Pattern
As the name implies, the adapter pattern helps integrating two or more incompatible interfaces. "Adapter class" is been used to collabrate.

```typescript
/**
 * The adapter pattern introduces abstract class, to make two or more incompatible interfaces look similar via abstract class
 * e.g. Both Mac and DELL has two different ports to connect displays.
 * But the adapter class introduce an wrapper for both the devices to connect "VGA connector"
 * */

interface VGA {
    connectDockToVGA()
}

interface ThunderBolt {
    connectDockerToThunderBolt()
}

class DELL implements VGA {
        connectDockToVGA() {
            console.log('Connected VGA port....');
        }
}

class Mac implements ThunderBolt {
    connectDockerToThunderBolt() {
        console.log('Connect to thunderbolt port...');
    }
}

class MacThunderBoltToVGAAdapter implements VGA {
    private macBook: Mac

    constructor (macBook: Mac) {
        this.macBook = macBook;
    }

    connectDockToVGA() {
        console.log('VGA is converted to adapt thunderbolt...');
        this.macBook.connectDockerToThunderBolt();
    }
}

const dellLaptop = new DELL();
dellLaptop.connectDockToVGA();

const macVGAAdapter = new MacThunderBoltToVGAAdapter(new Mac());
macVGAAdapter.connectDockToVGA();
```

#### Bridge Pattern
Bridge pattern splits large functionality into seperate classes and bridge relation between them using the interface. The abstraction can be extended further to build multiple bridge to the original class or class to be integrated

```typescript
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
```

#### Composite Pattern
Composite pattern helps composing the objects which are like tree / hierarchy. Where the "composite class" is the one which makes sure the hierarchy of its own, or there can be an "leaf class"

```typescript
/**
 * Composite pattern, helps structuring hierarchy and tree like components. where composite class make sure the hierarchy.
 * e.g. Here the Supervisor is the composite class, which composite and forms the tree structure for object of same type Employee.
 * Waiter is an leaf component, which is of type Employee, but doesnt take the role of composite class.
 * so the interface here should be generic for both composite and leaf class.
 * 
 * Note: An single class can also be an composite class and leaf class, by not assigning an child. e.g. Just an Employee class, which 
 * doesnt has any child can be treated as leaf class.
 */

interface Employee {
    getId(): string;
    introduce(): void
}

class Supervisor implements Employee {
    private subOrdinates: Array<Employee> = [];
    private employeeId: string;

    constructor(id: string) {
        this.employeeId = id;
    }
    getId(): string {
        return this.employeeId;
    }

    introduce(): void {
        console.log(`I'm ${this.employeeId}, I do supervising...`);
    }

    add(subOrdinate: Employee) {
        this.subOrdinates.push(subOrdinate);
    }

    remove(subOrdinate: Employee) {
        const indexOfSubOrdinate = this.subOrdinates.indexOf(subOrdinate);

        if (indexOfSubOrdinate > -1) {
            this.subOrdinates.splice(indexOfSubOrdinate, 1);
        }
    }

    getSubordinates(): Array<Employee> {
        console.log(this.subOrdinates);
        return this.subOrdinates;
    }
}

class Waiter implements Employee {
    private employeeId: string;

    constructor(id: string) {
        this.employeeId = id;
    }
    getId(): string {
        return this.employeeId;
    }

    introduce(): void {
        console.log(`I'm ${this.employeeId}, I take order and deliver to table....`);
    }
}

const supervisor1 = new Supervisor("s1");
supervisor1.introduce();

const supervisor2 = new Supervisor("s2");
supervisor2.introduce();

const waiter1 = new Waiter("w1");
waiter1.introduce();

const waiter2 = new Waiter("w2");
waiter2.introduce();

supervisor1.add(waiter1);
supervisor2.add(waiter2);
supervisor1.add(supervisor2);

supervisor1.getSubordinates();
```

#### Decorator Pattern
Decorator patterns ensures base class (base decorator) functionalities to be availble to the sub classes, and make sure the base decorator function is been called.

```typescript
/**
 * Decorator pattern, modify the behavior of an instance at runtime, ensure all the concrete classes implements
 * same flow by introducing common interface and decorator, decorator takes care of the object, and the 
 * component class takes care common functionalities for those classes.
 * 
 * e.g. Any choclate should have eat functionality, either its brownie, hotchoclate, all goes through
 * single decorator, where choclate component class has common functioanlity which is unwrapping the choclate. 
 */

interface Choclate {
    eat(): void
}

class cocoChoclate implements Choclate {
    eat(): void {
        console.log('unwrapping choclate...')
    }
}

class ChoclateDecorator implements Choclate {
    private choclate: Choclate

    constructor (choclate: Choclate) {
        this.choclate = choclate;
    }

    eat(): void {
        this.choclate.eat();
    }
}

class BrownieChoclate extends ChoclateDecorator {
    constructor(choclate: Choclate) {
        super(choclate);
    }

    eat(): void {
        super.eat();
        console.log('Brownie is tasty....')
    }
}

const tastChoclate = new BrownieChoclate(new cocoChoclate());
tastChoclate.eat();

```

#### Facade Pattern
Facade pattern provides interface to set of classes or functionalities. 

```typescript
/**
 * Facade pattern introduce encapsulation internal sub systems functionalities and provide the
 * required function.
 * 
 * e.g. The DrinkFacade hides Coffee and Beer classes and provide the required function by the client.
 * when the client says, coffee it initiates coffee, if it says beer it initiates beer.
 * 
 * Note: The subsystems can be implemented from common interface, to make the classes more discipline
 */

class Coffee {
    constructor() {
        console.log("Making Coffee....");
    }
}

class Beer {
    constructor() {
        console.log("Brewing Beer....");
    }
}

class DrinkFacade {
    constructor(drink: String) {
        if (drink == 'Coffee') {
            return new Coffee();
        } else if (drink == 'Beer') {
            return new Beer();
        } else {
            // throw new Error('Unknown drink...')
        }
    }
}

const coffee = new DrinkFacade("Coffee");
const beer = new DrinkFacade("Beer");

const unknown = new DrinkFacade("tea");
``` 

#### Flyweight Pattern

Flyweight is also called caching, because it keeps single object in memory, may change the properties accordingly, it helps minimizing the memory usage.

```typescript
/**
 * Flyweight pattern is also refered as cache pattern, where the object are cached based on the required
 * objects behaviour.
 * 
 * e.g. here the hot choclate factory caches the object and skips instanting new instance every time
 * based on the type of instance the client wants.
 */
class HotChoclate {
    getHotChoclate(): void {
        console.log("This is your hot choclate...");
    }
}

class BrownieChoclate {
    getBrownieChoclate(): void {
        console.log("This is your brownie choclate...");
    }
}

class ChoclateFactory {
    hotChoclateCache: any
    brownieChoclateCache: any

    constructor() {}

    prepateHotChoclate(): any {
        if (!this.hotChoclateCache) {
            this.hotChoclateCache = new HotChoclate();
        }

        return this.hotChoclateCache;
    }

    prepareBrownieChoclate(): any {
        if (!this.brownieChoclateCache) {
            this.brownieChoclateCache = new BrownieChoclate();
        }

        return this.brownieChoclateCache;
    }
}

const choclateFactory = new ChoclateFactory();

console.time("flyweight")
for (let i = 0; i < 100000; i++) {
    const hotChoclate = choclateFactory.prepateHotChoclate();
    const brownieChoclate = choclateFactory.prepareBrownieChoclate();
    hotChoclate.getHotChoclate();
    brownieChoclate.getBrownieChoclate();
}
console.timeEnd("flyweight")

```

#### Proxy Pattern
As the name implies, an proxy can be introduced between the class and the client application, so the caller may or may not have some additional restriction or functionalities over the wire.

```typescript
/**
 * Proxy pattern ensures accessibility by introducing an proxy class between client and the real class
 * 
 * e.g. To have an coffee, you can't reach to the coffeeMaker, without your wife's daily limit checl.
 */
interface CoffeeI {
    getMeACoffee(): void
}

class CoffeeMaker implements CoffeeI {
    getMeACoffee(): void {
        console.log("Here is your coffee....");
    }
}

class Wife implements CoffeeI {
    count: number = 0
    coffeeMaker : CoffeeMaker 
    constructor() {
        this.coffeeMaker = new CoffeeMaker();
    }

    getMeACoffee(): void {
        if (this.count < 2) {
            this.coffeeMaker.getMeACoffee();
            this.count++;
        } else {
            //throw new Error("Exceeded today's limit...");
            console.log("Exceeded today's limit...")
        }
    }
}

const wife = new Wife();
wife.getMeACoffee();
wife.getMeACoffee()
wife.getMeACoffee();

```

#### Chain of Responsibility Pattern
Chain of responsibility lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

```typescript
/**
 * chain of responsibility, will let you pass the object along different handlers, whenever you are not sure, who handles it
 * or you want all the responsible classes should be involved in the process.
 * 
 * e.g. Here we dont know, who will make the requested drink, either, coffee, tea, or beer class but someone
 * takes responsibility or all, incase you want to mix coffee with beer, you could still achieve that the implementation
 */

interface Drink {
    registerNextDrinkHandler(drink: Drink): void
    makeDrink(requestedDrink: MyDrink): void
}

class Coffee implements Drink {
    nextDrink: Drink

    makeDrink(requestedDrink: MyDrink): void {
        if (requestedDrink.getDrinkType() == "coffee") {
            console.log("Making coffee...");   
        } else if (this.nextDrink) {
            console.log("so you dont like coffee...")
            this.nextDrink.makeDrink(requestedDrink);
        }
    }

    registerNextDrinkHandler(drink: Drink) {
        this.nextDrink = drink;
    }

}

class Tea implements Drink {
    nextDrink: Drink

    makeDrink(requestedDrink: MyDrink): void {
        if (requestedDrink.getDrinkType() == "tea") {
            console.log("Making tea...");   
        } else if (this.nextDrink) {
            console.log("so you dont like tea...")
            this.nextDrink.makeDrink(requestedDrink);
        }
    }

    registerNextDrinkHandler(drink: Drink) {
        this.nextDrink = drink;
    }
}

class Beer implements Drink {
    nextDrink: Drink

    makeDrink(requestedDrink: MyDrink): void {
        if (requestedDrink.getDrinkType() == "beer") {
            console.log("Making beer...");   
        } else if (this.nextDrink) {
            this.nextDrink.makeDrink(requestedDrink);
        }
    }

    registerNextDrinkHandler(drink: Drink) {
        this.nextDrink = drink;
    }
}

class MyDrink {
    drinkType: string
    constructor(drinkType: string) {
        this.drinkType = drinkType;
    }

    getDrinkType(): string {
        return this.drinkType;
    }
}

const myDrink = new MyDrink("beer");

const coffee = new Coffee();
const tea = new Tea();
const beer = new Beer();

coffee.registerNextDrinkHandler(tea);
tea.registerNextDrinkHandler(beer);

coffee.makeDrink(myDrink);

```

#### Command Pattern
Command pattern  turns a request into a stand-alone object that contains all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request’s execution, and support undoable operations.

```typescript
/**
 * Command pattern seperate the request logic from reciever, and makes the request object to extend from the reciever
 * state can be maintained in reciever, and also the global state can be maintained in invoker, command is various 
 * functions to change the state
 * 
 * e.g. Here the light and ac are reciever, think of an IOT based light and ac, where there can be different controls/commands possible
 * and should support extending these functionalities, the mobile app here can be treated as an invoker, just executes the command, and maintain
 * some caches, and acts as a proxy.
 */

interface SignalReciever {
    toggle(): void
}

interface Command {
    execute(): void
}

class Light implements SignalReciever {
    lightState = false
    toggle(): void {
        if (!this.lightState) {
            this.lightState = true;
            console.log("Turning on light, its now ON");
        } else {
            this.lightState = false;
            console.log("Turning off light, its now OFF");
        }
    }
}

class AC implements SignalReciever {
    acState = false
    toggle(): void {
        if (!this.acState) {
            this.acState = true;
            console.log("Turning on AC, its now ON");
        } else {
            this.acState = false;
            console.log("Turning off AC, its now OFF");
        }
    }
}

class TurnOn implements Command {
    reciever: SignalReciever;
    
    constructor(reciever: SignalReciever) {
        this.reciever = reciever;
    }

    execute(): void {
        console.log("Turning on...");
        this.reciever.toggle();
    }
}
class TurnOff implements Command {
    reciever: SignalReciever;
    
    constructor(reciever: SignalReciever) {
        this.reciever = reciever;
    }

    execute(): void {
        console.log("Turning off...");
        this.reciever.toggle();
    }
}

class MobileAppInvoker {
    invoke(command: Command) {
        command.execute();
    }
}

const light = new Light();
const ac = new AC();

const turnOnAC = new TurnOn(ac);
const turnOnLight = new TurnOn(light);

const turnOffAC = new TurnOff(ac);
const turnOffLight = new TurnOff(light);

const invoker = new MobileAppInvoker();

invoker.invoke(turnOnAC);
invoker.invoke(turnOnLight);

invoker.invoke(turnOffAC);
invoker.invoke(turnOffLight);
```

#### Iterator Pattern
Iterator pattern define iteration flow/logic for an collection of datatypes.

```typescript

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
```

#### Mediator Pattern
Mediator pattern reduce dependencies between objects, and introduce mediator to make the dependent calls using depdency injection.

```typescript
/**
 * mediator pattern is also like observer pattern, but the key difference is decoupling publishers and 
 * subscriber in mediator via mediator class, and here any object can be publisher and listener.
 * and the pub-sub is driven by business logic.
 * 
 * e.g. Both inventory and shipping needs to be infomed on placement of order to update their state
 * based on some condition or dependent condition like only if inventory is there, then update shipping.
 */

interface IOrderMediator {
    informPlacedOrder(noOfItems: number): void
}

interface IOrderColleagues {
    executeOrder(noOfItems: number): boolean
}

class OrderMediator implements IOrderMediator {
    inventory: IOrderColleagues
    shipping: IOrderColleagues

    constructor(inventory: IOrderColleagues, shipping: IOrderColleagues) {
        this.inventory = inventory
        this.shipping = shipping
    }

    informPlacedOrder(noOfItems: number) {
        const orderPlaced = this.inventory.executeOrder(noOfItems);

        if (orderPlaced) {
            this.shipping.executeOrder(noOfItems);
        }
    }
}

class InventoryStore implements IOrderColleagues {
    noOfItems: number

    constructor(noOfItems: number) {
        this.noOfItems = noOfItems;
    }

    executeOrder(noOfItems: number): boolean {
        if (this.noOfItems - noOfItems >= 0) {
            this.noOfItems -= noOfItems;
            console.log("Inventory updated, has  " + this.noOfItems + " items now");
            return true;
        }
        return false;
    }
}

class Shipping implements IOrderColleagues {
    executeOrder(noOfItems: number): boolean {
        console.log("shipped " + noOfItems + " item....");
        return true;
    }
}

const inventory = new InventoryStore(10);
const shipping = new Shipping();

const orderMediator = new OrderMediator(inventory, shipping);

orderMediator.informPlacedOrder(8);

```

#### Memento Pattern
Memento pattern, is also like an database, where memento stores the state information, and the originator class communicates back to the memento.

```typescript

/**
 * memento pattern introduce state maintainance without disturbing other implementation details of the originator, where more business logics
 * might be expected.
 * 
 * e.g. The fileEditor can have various functionality other than state maintance, here the state mainataince is moved to the Mementostore
 * which decouples the file editor business logic from the store.
 */

interface IMemento {
    getSavedState()
}

interface IOriginator {
    saveToMemento(): IMemento
    restoreFromMemento(memento: IMemento)
}

class MementoStore implements IMemento {
    states: Array<string> = []

    constructor(states) {
        console.log("saving to memento....", states)
        states.forEach(state => {
            this.states.push(state);
        });
    }

    getSavedState() {
        return this.states;
    }
}

class FileEditor implements IOriginator {
    state: Array<string>
    constructor() {
        this.state = []
    }

    add(str: string) {
        console.log("adding to editor " + str);
        this.state.push(str);
    }

    saveToMemento(): IMemento {
        return new MementoStore(this.state);
    }

    getData(): Array<string> {
        return this.state;
    }
    
    restoreFromMemento(memento: IMemento) {
        this.state = memento.getSavedState();
    }
}

class ClientCareTaker {
    fileEditor = new FileEditor();

    constructor() {
        this.fileEditor.add("state-1");
        this.fileEditor.add("state-2");

        const savedState = this.fileEditor.saveToMemento();

        this.fileEditor.add("state-3");
        this.fileEditor.add("state-4");

        this.fileEditor.restoreFromMemento(savedState);

        console.log("Doing undo......");
        console.log(this.fileEditor.getData());
    }
}

new ClientCareTaker();
```

#### Observer Pattern
Observer pattern is also an pub-sub pattern, where the subscribers needs to register themselves to the publisher.

```typescript
/**
 * Observer pattern is like pub sub, where the observers needs to be registered/unregister with the publisher for events
 * 
 * e.g. Here campaign class is listening to the order class to generate new coupon based on the no.of orders places, so everytime
 * an new order is placed, the observer will be updated.
 */

const ORDER_PLACED = "order_placed";
const ORDER_RETURNED = "order_returned"

interface IObserver {
    on(topic: string, data: any): void
}

class Order {
    observers: Array<IObserver> = [];

    constructor() {
    }

    addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    placeOrder(str: string) {
        console.log("Placing order....")
        this.observers.forEach((observer) => {
            observer.on(ORDER_PLACED, str);
        });
    }

    returnOrder(str: string) {
        console.log("Returning order....")
        this.observers.forEach((observer) => {
            observer.on(ORDER_RETURNED, str);
        });
    }
}

class CustomerCampaign implements IObserver {
    placedOrder: number = 0;
    couponEligibility: number = 3;

    on(topic: string, data: any): void {
        if (topic == ORDER_PLACED) {
            this.placedOrder ++;
        } else if (topic == ORDER_RETURNED) {
            this.placedOrder --;
        }
        
        if (this.placedOrder >= this.couponEligibility) {
            console.log("You are eligible for the `FLAT50` coupon code ");
        } else {
            console.log("Still " + (this.couponEligibility - this.placedOrder) + " orders need to be placed for coupon code ");
        }
    }
}

const order = new Order();
order.addObserver(new CustomerCampaign())

order.placeOrder("Product - 1");
order.placeOrder("Product - 2");
order.placeOrder("Product - 3");

order.returnOrder("Product - 3");
```

#### State Pattern
State pattern maintains the state information in context, and different state of the application can be extended by adding classes.

```typescript
/**
 * state pattern helps in different seperating different behaviour for different states, and have
 * the context behaviour seperated out from the state behaviours.
 * 
 * e.g. here the state has different behaviours and the context just stores the state information, the state
 * classes behaviour is seperated from the context behaviour, context has golabal state information
 */
const ON = 'on'
const OFF = 'OFF'
const UNKNOWN = 'UNKNOWN'

interface IContext {
    getCurrentState(): string
    saveState(str: string): void
}

interface IState {
    execute(context: IContext): void
}

class OnState implements IState {
    context: IContext

    execute(context: IContext): void {
        this.context = context;

        console.log("trying to turn on...")

        if (this.context.getCurrentState() == OFF) {
            this.context.saveState(ON);
        } else {
            console.log("Already ON...")
        }
    }
}

class OFFState implements IState {
    context: IContext

    execute(context: IContext): void {
        this.context = context;

        console.log("Trying to turn off...")

        if (this.context.getCurrentState() == ON) {
            this.context.saveState(OFF);
        } else {
            console.log("Already OFF...")
        }
    }   
}

class StateContext implements IContext {
    state: string = OFF
    getCurrentState(): string {
        return this.state;
    }
    saveState(str: string): void {
        this.state = str;
    }
}

const stateContext = new StateContext();
const onState = new OnState()
const offState = new OFFState();

onState.execute(stateContext);
console.log("CURRENT STATE: ", stateContext.getCurrentState());
onState.execute(stateContext);

offState.execute(stateContext);
stateContext.getCurrentState();
console.log("CURRENT STATE: ", stateContext.getCurrentState())
```

#### Strategy Pattern
Strategy pattern helps injecting the strategies on the fly, when an new strategy needs to be implmented for the application.

```typescript
/**
 * Strategy pattern, executes the logic on the basis of context set (strategy set)
 * 
 * e.g. here based addition or subtraction, the application is behaving in different way
 */

interface ICalcStrategy {
    execute(valOne: number, valTwo: number): number
}

interface ICalcContext {
    setStrategy(strategy: ICalcStrategy): void
    execute(valOne: number, valTwo: number): number
}

class Add implements ICalcStrategy {
    execute(valOne: number, valTwo: number): number {
        return valOne + valTwo;
    }
}

class Multiply implements ICalcStrategy {
    execute(valOne: number, valTwo: number): number {
        return valOne * valTwo;
    }
}

class SimpleCalc implements ICalcContext {
    strategy: ICalcStrategy;

    setStrategy(strategy: ICalcStrategy): void {
        this.strategy = strategy;
    }

    execute(valOne: number, valTwo: number): number {
        return this.strategy.execute(valOne, valTwo);
    }
}

const calculator = new SimpleCalc();
const add= new Add();
const multiply = new Multiply();

calculator.setStrategy(add);
console.log("ADD ", calculator.execute(10, 10));

calculator.setStrategy(multiply);
console.log("Multiply ", calculator.execute(5, 2));
```


#### Template method
Template method pattern is simply extending the base class and its functionalities, which introduce an template to the class.

```typescript
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
```

#### Visitor Pattern
Visitor pattern introduces an visitor class, which will be added as an dependency injection to the classes, which needs to ack themselves to the visitor's object.

```typescript
interface IShoppingCategory {
    getPrice();
    add(shoppingItem: IShoppingCart): number;
}

interface IShoppingCart {
    laptopOffer(shoppingItem: Laptop);
    monitorOffer(shoppingItem: Monitor);
}

class Laptop implements IShoppingCategory {
    price: number = 98363;

    getPrice() {
        return this.price;
    }

    add(shoppingItem: IShoppingCart) {
        return shoppingItem.laptopOffer(this);
    }
}

class Monitor implements IShoppingCategory {
    price: number = 12398;

    getPrice() {
        return this.price;
    }

    add(shoppingItem: IShoppingCart) {
        return shoppingItem.monitorOffer(this);
    }
}

class ChristmasShoppingCart implements IShoppingCart {
    offerPercentage: number = 2.7;

    laptopOffer(shoppingItem: Laptop) {
        return shoppingItem.getPrice() * ((100-this.offerPercentage)/100);
    }
    monitorOffer(shoppingItem: Monitor) {
        return shoppingItem.getPrice() * ((100-this.offerPercentage)/100);
    }
}

const laptop = new Laptop();
const monitor = new Monitor();

const christmasShoppingCart = new ChristmasShoppingCart();

console.log(laptop.add(christmasShoppingCart));
console.log(monitor.add(christmasShoppingCart));

```