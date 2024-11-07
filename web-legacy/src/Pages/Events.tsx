import { LoaderFunction, json, useLoaderData } from 'react-router-dom'
import { Broadcast } from 'types/broadcast'
import { getAllDBEntries } from 'util/api'

const EventsPage: React.FC = () => {
  const eventsArray = useLoaderData() as Broadcast[]
  return (
    <div>
      {eventsArray.map((event) => (
        <div key={event._id}>
          <a href={`events/${event._id}`}>{event.title}</a>
        </div>
      ))}
    </div>
  )
}

export default EventsPage

export const loader: LoaderFunction = async () => {
  const res = await getAllDBEntries<Broadcast>('events')
  if (res.ok) {
    return res.getJson.objects
  } else {
    throw json({ message: res.getJson.error.message }, { status: res.status })
  }
}
