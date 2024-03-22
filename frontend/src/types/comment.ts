import { User } from "./user";

export interface Comment {
	_id: string;
	text: string;
	owner: User;
}
