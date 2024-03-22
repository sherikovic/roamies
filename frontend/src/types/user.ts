export interface User {
	_id: string;
	email: string;
	password: string;
	age: string;
	firstname: string;
	lastname: string;
	country: string;
	bio?: string;
	social?: [string];
}
