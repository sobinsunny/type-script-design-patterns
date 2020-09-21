
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