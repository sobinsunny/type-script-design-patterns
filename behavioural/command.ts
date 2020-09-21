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