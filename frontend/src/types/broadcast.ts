export interface BroadcastEvent {
  name: string;
  location: string;
  category: string;
  date: Date;
  time: Date;
  description: string;
  images?: File;
}
