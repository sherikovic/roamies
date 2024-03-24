import { User } from "./user";
import { Comment } from "./comment";

export interface Broadcast {
	_id: string;
	name: string;
	location: string;
	category: string;
	date: Date;
	time: Date;
	description: string;
	images?: File;
	rsvp: Number;
	owner: User;
	participants: User[];
	comments: Comment[];
}
