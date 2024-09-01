import { json, useNavigate, useParams } from 'react-router-dom'

import { Location } from '../../types/location'
import classes from './LocationForm.module.css'
import { useState } from 'react'

interface LocationFormProps {
  method: any
  LocationData?: Location
  cancelHandler: () => void
}

const LocationForm: React.FC<LocationFormProps> = ({ method, LocationData, cancelHandler }) => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    latitude: '',
    description: '',
  })
  const navigate = useNavigate()
  const params = useParams()

  const validateFormInputs = (FormData: any) => {
    setFormErrors((prev) => ({
      ...prev,
      name: FormData.name === '' ? 'Name is required!' : '',
      latitude: FormData.latitude === '' ? 'Latitude is required!' : '',
      description: FormData.description === '' ? 'Description is required!' : '',
    }))
  }

  const submitHandler = async (event: any) => {
    event.preventDefault()

    const FormData = {
      name: event.target.name.value,
      latitude: event.target.latitude.value,
      description: event.target.description.value,
    }

    validateFormInputs(FormData)

    if (FormData.name !== '' && FormData.latitude !== '' && FormData.description !== '') {
      let url = 'http://localhost:8080/Locations'
      if (method === 'PATCH') {
        const id = params.id
        url = 'http://localhost:8080/Locations/' + id
      }
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      })
      const resObj: any = await response.json()

      if (!response.ok) {
        throw json({ message: resObj.message }, { status: resObj.status })
      }
      cancelHandler()
      if (method === 'POST') {
        navigate('/Locations/' + resObj.Location._id)
      } else {
        navigate('/Locations/' + params.id)
      }
    }
  }

  return (
    <div className={classes.card_container}>
      <span className={classes.card_close} onClick={cancelHandler}>
        X
      </span>
      <p className={classes.paragraph}>Define your Location</p>
      <form method={method} className={classes.form} onSubmit={submitHandler}>
        <p style={{ color: 'orange' }}>{formErrors.name}</p>
        <p>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={LocationData ? LocationData.name : ''}
          />
        </p>
        <p style={{ color: 'orange' }}>{formErrors.latitude}</p>
        <p>
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            name="latitude"
            id="latitude"
            defaultValue={LocationData ? LocationData.latitude : ''}
          />
        </p>
        <p style={{ color: 'orange' }}>{formErrors.description}</p>
        <p>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Describe the usage of this Location"
            cols={30}
            rows={3}
            defaultValue={LocationData ? LocationData.description : ''}
          />
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default LocationForm
