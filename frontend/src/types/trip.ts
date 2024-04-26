import { Broadcast } from "./broadcast";
import { User } from "./user";

export interface Trip {
	_id: string;
	title: string;
	location: string;
	description?: string;
	startDate: Date;
	endDate?: Date;
	owner: User;
	images?: File;
	events?: Broadcast[];
}
