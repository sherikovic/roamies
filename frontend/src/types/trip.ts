import { Broadcast } from "./broadcast";
import { User } from "./user";

export interface Trip {
	_id: string;
	name: string;
	location: string;
	description: string;
	startdate: Date;
	enddate?: Date;
	owner: User;
	images?: File;
	events?: Broadcast[];
}
