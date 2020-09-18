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

