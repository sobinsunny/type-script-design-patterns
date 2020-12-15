/**
 * Design an parking lot system.
 *
 * 1. Is this targeted for one parking avenue, or we could have any number of parking slots.
 *          Any number
 * 2. types of parking slots wheeler parking, SUV parking, small car parking, truck parking, small truck parking.
 * 3. When u want to book (3 days before - restricted to. no limit on days / hours, booked only hours).
 * 4. Barcode scanner to confirm the entry or exit.
 *
 *
 * Parking avenue - lat long, entry lat lon, exit lat lon.
 * Parking slot is an Object (part of parking avenue) - type, current_status, price / hr - restricted to hours
 * Bookings - Parking slot, User, from, to.
 * User - Username, mobile.
 */

type location = {
	lat: number;
	long: number;
};

namespace TParkingSlots {
	export enum type {
		SUV,
		SMALL_CAR,
		TRUCK,
		SMALL_TRUCK,
	}

	export enum current_status {
		IN_SERVICE = -1,
		AVAILABLE = 1,
		BOOKED = 2,
	}

	export enum PaymentMode {
		CREDIT_CARD,
		DEBIT_CARD,
		UPI,
		PAYTM,
	}
}

interface IParkingSlot {
	id: number;
	type: TParkingSlots.type;
	current_status: number;

	getCurrentStatus(): number;

	getType(): TParkingSlots.type;

	book(): boolean;

	free(): boolean;

	putUnderMaintainance(): boolean;
}

interface IBook {
	id: string;
	user: IUser;
	parkingSlot: IParkingSlot;

	book(user: IUser, parkingSlot: IParkingSlot, from: Date, to: Date): void;
}

interface IUser {
	id: string;
	name: string;
	preferred_payment_mode: string;

	getUserPaymentMode(): string;
}

interface IParkingAvenue {
	name: string;
	location: location;
	parkingSlots: Array<IParkingSlot>;

	addParkingSlot(parkingSlot: IParkingSlot, type: TParkingSlots.type): void;
}

class ParkingSlot implements IParkingSlot {
	id: number;
	type: TParkingSlots.type;
	current_status: number;
	parkingAvenue: IParkingAvenue;

	constructor(type: TParkingSlots.type, parkingAvenue: IParkingAvenue) {
		this.id = this.id ? this.id + 1 : 1;
		this.current_status = TParkingSlots.current_status.AVAILABLE;
		this.type = type;
		this.parkingAvenue = parkingAvenue;

		this.parkingAvenue.addParkingSlot(this, type);
	}

	getCurrentStatus(): number {
		return this.current_status;
	}

	getType(): TParkingSlots.type {
		return this.type;
	}

	book(): boolean {
		if (TParkingSlots.current_status.AVAILABLE) {
			return false;
		}

		this.current_status = TParkingSlots.current_status.BOOKED;

		return true;
	}

	free(): boolean {
		this.current_status = TParkingSlots.current_status.AVAILABLE;

		return true;
	}

	putUnderMaintainance(): boolean {
		this.current_status = TParkingSlots.current_status.IN_SERVICE;

		return true;
	}
}

class ParkingAvenue implements IParkingAvenue {
	name: string;
	location: location;
	parkingSlots: Array<IParkingSlot>;

	constructor(name: string, location: location) {
		this.name = name;
		this.location = location;
	}

	addParkingSlot(parkingSlot: IParkingSlot, type: TParkingSlots.type) {
		this.parkingSlots.push(new ParkingSlot(type, this));
	}
}

class User implements IUser {
	id: string;
	bookings: Array<IBook>;
	name: string;
	preferred_payment_mode: string;

	constructor(name: string, preferred_payment_method) {
		this.name = name;
		this.preferred_payment_mode = preferred_payment_method;
	}

	getUserPaymentMode(): string {
		throw new Error("Method not implemented.");
	}

	showMyBookings(): Array<IBook> {
		return this.bookings;
	}

	setBooking(booking: IBook) {
		this.bookings.push(booking);
	}
}

class Book implements IBook {
	id: string;
	user: IUser;
	parkingSlot: IParkingSlot;
	from: Date;
	to: Date;

	book(user: IUser, parkingSlot: IParkingSlot, from: Date, to: Date): void {
		// condition for booked slot and condition for unbooked slots.
		this.user = user;
		this.parkingSlot = parkingSlot;
		this.from = from;
		this.to = to;
	}
}

const parkingAvenue = new ParkingAvenue("PA1", {
	lat: 30.1212,
	long: 78.34343,
});

const pa1SmallCar = new ParkingSlot(
	TParkingSlots.type.SMALL_CAR,
	parkingAvenue
);

const pa1SUV = new ParkingSlot(TParkingSlots.type.SUV, parkingAvenue);

const pa1Truck = new ParkingSlot(TParkingSlots.type.TRUCK, parkingAvenue);

const user1 = new User("Suresh", TParkingSlots.PaymentMode.UPI);

const Booking1 = new Book();

Booking1.book(user1, pa1SmallCar, new Date(), new Date());
