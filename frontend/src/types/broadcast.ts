import { User } from "./user";
import { Comment } from "./comment";

export interface Broadcast {
	_id: string;
	title: string;
	location: string;
	category: string;
	datetime: Date;
	description: string;
	images?: File;
	rsvp?: Number;
	owner: User;
	participants?: User[];
	comments?: Comment[];
}
