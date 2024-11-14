import { Link, useRouteLoaderData } from 'react-router-dom'
import { Location } from '../../types/location'
import classes from './LocationsList.module.css'
import { useState } from 'react'
import LocationForm from './LocationForm'

interface LocationsListProps {
  locations: Location[]
}

const LocationsList: React.FC<LocationsListProps> = ({ locations }) => {
  const data: any = useRouteLoaderData('root')
  const [createNewLocation, setCreateNewLocation] = useState(false)

  return (
    <div>
      <div>
        <div className={classes.locations}>
          <ul className={classes.list}>
            {locations.map((location: Location) => (
              <li key={location._id} className={classes.item}>
                <Link to={location._id} className={classes.content}>
                  <h4>{location.name}</h4>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {data && data.user && (
          <div className={classes.new}>
            <span onClick={() => setCreateNewLocation(!createNewLocation)}>+ New Location</span>
          </div>
        )}
      </div>
      {createNewLocation && (
        <div className={classes.card_overlay}>
          <div className={classes.overlay_content}>
            <LocationForm method="POST" cancelHandler={() => setCreateNewLocation(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationsList
