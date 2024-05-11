import { Broadcast } from "./broadcast";
import { Trip } from "./trip";

export interface User {
	_id: string;
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	age: string;
	country: string;
	bio?: string;
	social?: [string];
	trips: [Trip];
	events: [Broadcast];
}
