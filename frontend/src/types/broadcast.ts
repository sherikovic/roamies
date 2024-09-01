import { User } from './user'
import { Trip } from './trip'
import { Comment } from './comment'

export interface Broadcast {
  _id: string
  title: string
  location: string
  category: string
  datetime: Date
  description: string
  images: File[]
  rsvp: number
  owner: User
  trip: Trip
  participants: User[]
  comments: Comment[]
}
