import { Broadcast } from "./broadcast";
import { User } from "./user";

export interface Trip {
	_id: string;
	name: string;
	location: string;
	description: string;
	date: Date;
	owner: User;
	images?: File;
	events?: Broadcast[];
}
