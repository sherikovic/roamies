export interface BroadcastEvent {
	_id: string;
	name: string;
	location: string;
	category: string;
	date: Date;
	time: Date;
	description: string;
	images?: File;
}
