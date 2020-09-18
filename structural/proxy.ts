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
