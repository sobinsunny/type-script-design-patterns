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
