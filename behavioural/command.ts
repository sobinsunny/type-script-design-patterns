/**
 * SignalReciever - Reciever interface
 * Command - command interface for the actual command.
 *
 * TurnOn, TurnOff - concrete command classes.
 * Invoker - Broker/invoker, who does the given command interface execution
 *
 * Light, AC are the actual reciever/requestor concrete classes.
 *
 * Command interface and reciever interface talk to each other via broker, where, command can be extended
 * to support more operations, which can modify the state of the reciever.
 */

interface SignalReciever {
	toggle(): void;
}

interface Command {
	execute(): void;
}

class Light implements SignalReciever {
	lightState = false;
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
	acState = false;
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
