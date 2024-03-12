import { BroadcastEvent } from './broadcast';

export interface Trip {
	_id: string;
	name: string;
	location: string;
	description: string;
	// images: File;
	// events: BroadcastEvent[];
}
