import { Broadcast } from './broadcast'
import { Trip } from './trip'

export interface User {
  _id: string
  email: string
  password: string
  firstname: string
  lastname: string
  profile_picture: string
  age: string
  country: string
  bio?: string
  social?: { instagram: string; twitter: string }
  trips: [Trip]
  events: [Broadcast]
}
