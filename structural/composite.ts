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

