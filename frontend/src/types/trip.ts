import { BroadcastEvent } from "./broadcast";
import { User } from "./user";

export interface Trip {
	_id: string;
	name: string;
	location: string;
	description: string;
	owner: User;
	images?: File;
	events?: BroadcastEvent[];
}
