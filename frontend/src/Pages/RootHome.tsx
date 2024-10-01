import React from 'react'
import { LoaderFunction, Outlet, defer, json } from 'react-router-dom'

import HomeHeader from 'Components/Homepage/HomeHeader'
import { getAllDBEntries } from 'util/api'
import { Broadcast } from 'types/broadcast'
import { Trip } from 'types/trip'
import HomeFooter from 'Components/Homepage/HomeFooter'

const RootHome: React.FC = () => {
  return (
    <React.Fragment>
      <HomeHeader />
      <main>
        <Outlet />
      </main>
      <HomeFooter />
    </React.Fragment>
  )
}

export default RootHome

const loadEvents = async () => {
  const response = await getAllDBEntries<Broadcast>('events')
  if (response.ok) {
    return response.getJson.objects
  } else {
    throw json({ message: response.getJson.error }, { status: response.status })
  }
}

const loadTrips = async () => {
  const response = await getAllDBEntries<Trip>('trips')
  if (response.ok) {
    return response.getJson.objects
  } else {
    throw json({ message: response.getJson.error }, { status: response.status })
  }
}

// could actually defer them when we use lazy loading
export const loader: LoaderFunction = async () => {
  return defer({
    events: await loadEvents(),
    trips: await loadTrips(),
  })
}
