import { Broadcast } from "./broadcast";
import { User } from "./user";

export interface Comment {
	_id: string;
	text: string;
	owner: User;
	event: Broadcast;
}
