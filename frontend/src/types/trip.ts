import { BroadcastEvent } from "./broadcast";

export interface Trip {
  id: string;
  name: string;
  location: string;
  description: string;
  images: File;
  events: BroadcastEvent[];
}
