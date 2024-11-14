import { useState } from 'react'
import styled from 'styled-components/macro'
import { Trip } from 'types/trip'
import { createDBEntry, deleteDBEntry, updateDBEntry } from 'util/api'
import { XClose, FlexboxRow, FlexboxCol } from 'util/common_styles'
import warningIcon from '../../images/warningicon.png'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ErrorMessage,
  FormContents,
  FormHeader,
  ImgWithMargin,
  InputLabel,
  FormSubmitButton,
} from 'util/common_styles'

interface TripFormProps {
  cancelHandler: () => void
  tripData?: Trip
}

const TripForm: React.FC<TripFormProps> = ({ tripData, cancelHandler }) => {
  const fields = {
    images: {
      val: '',
      valid: true,
      errorMessage: '',
    },
    endDate: {
      val: '',
      valid: true,
      errorMessage: '',
    },
    startDate: {
      val: '',
      valid: true,
      errorMessage: "Start date can't be empty",
    },
    description: {
      val: tripData ? tripData.description : '',
      valid: true,
      errorMessage: '',
    },
    location: {
      val: tripData ? tripData.location : '',
      valid: true,
      errorMessage: "Location can't be empty",
    },
    title: {
      val: tripData ? tripData.title : '',
      valid: true,
      errorMessage: "Title can't be empty",
    },
  }

  const [formInputs, setFormInputs] = useState(fields)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const validateInputsForSubmit = () => {
    let isValid: boolean = true
    Object.keys(formInputs).forEach((key: any) => {
      const input = formInputs[key]
      if ((key === 'title' || key === 'location' || key === 'startDate') && input.val === '') {
        isValid = false
        setErrorMessage(input.errorMessage)
        setFormInputs((prev) => ({
          ...prev,
          [key]: { ...input, valid: false },
        }))
      }
    })
    return isValid
  }

  const sendEventRequestToBE = async (mode: string, data?: Trip | any) => {
    let response: any
    if (mode === 'create') {
      response = await createDBEntry<Trip>('trips', data)
    } else if (mode === 'update') {
      response = await updateDBEntry<Trip>('trips', tripData!._id, data)
    } else {
      response =
        window.confirm('Operation irreversable, are you sure?') &&
        (await deleteDBEntry<Trip>('trips', tripData!._id))
    }
    if (response) {
      if (response.ok) {
        cancelHandler()
        switch (mode) {
          case 'create':
            navigate(`/trips/${response.getJson.objects._id}`)
            break
          case 'update':
            window.location.reload()
            break
          default:
            navigate('/home')
        }
      } else {
        setErrorMessage(response.getJson.error)
      }
    }
  }

  const submitTripForm = (event: any, mode: string) => {
    event.preventDefault()
    if (mode === 'create' || mode === 'update') {
      const formData: Trip | any = Object.fromEntries(
        new FormData(document.forms[0] as HTMLFormElement).entries(),
      )
      const isValid = validateInputsForSubmit()
      if (isValid) {
        sendEventRequestToBE(mode, formData)
      }
    } else {
      sendEventRequestToBE(mode)
    }
  }

  const inputOnChange = ({
    type,
    value,
  }: {
    type: 'title' | 'location' | 'description' | 'startDate' | 'endDate' | 'images'
    value: string
  }) => {
    setFormInputs({
      ...formInputs,
      [type]: {
        ...formInputs[type],
        val: value,
        valid:
          (type === 'title' || type === 'location' || type === 'startDate') && value === ''
            ? false
            : true,
      },
    })
  }

  return (
    <FlexboxCol>
      <TripFormHeader>Start a new trip</TripFormHeader>
      <XClose type="button" onClick={cancelHandler} />
      <FormContents method="post">
        {errorMessage && (
          <ErrorMessage>
            <ImgWithMargin src={warningIcon} alt="warning icon" />
            {errorMessage}
          </ErrorMessage>
        )}
        <FlexboxRow style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="title">Title:</InputLabel>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={formInputs.title.val}
            onChange={(e) => {
              inputOnChange({ type: 'title', value: e.target.value })
            }}
          />
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="location">Location:</InputLabel>
          <input
            type="text"
            name="location"
            id="location"
            defaultValue={formInputs.location.val}
            onChange={(e) => {
              inputOnChange({ type: 'location', value: e.target.value })
            }}
          />
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="description">Description:</InputLabel>
          <textarea
            name="description"
            id="description"
            defaultValue={formInputs.description.val}
            cols={30}
            rows={3}
            onChange={(e) => {
              inputOnChange({ type: 'description', value: e.target.value })
            }}
          />
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="startDate">Start date:</InputLabel>
          <FlexboxRow>
            <input
              type="date"
              name="startDate"
              id="startDate"
              onChange={(e) => {
                inputOnChange({ type: 'startDate', value: e.target.value })
              }}
            />
          </FlexboxRow>
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="endDate">End date:</InputLabel>
          <FlexboxRow>
            <input
              type="date"
              name="endDate"
              id="endDate"
              onChange={(e) => {
                inputOnChange({ type: 'endDate', value: e.target.value })
              }}
            />
          </FlexboxRow>
        </FlexboxRow>
        <FlexboxRow style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="images">Images:</InputLabel>
          <input
            type="file"
            name="images"
            id="images"
            onChange={(e) => {
              inputOnChange({ type: 'images', value: e.target.value })
            }}
          />
        </FlexboxRow>
        {location.pathname.includes('trips') ? (
          <FlexboxRow>
            <FormSubmitButton type="button" onClick={(event) => submitTripForm(event, 'delete')}>
              Delete
            </FormSubmitButton>
            <FormSubmitButton type="button" onClick={(event) => submitTripForm(event, 'update')}>
              Save
            </FormSubmitButton>
          </FlexboxRow>
        ) : (
          <FormSubmitButton type="button" onClick={(event) => submitTripForm(event, 'create')}>
            Create
          </FormSubmitButton>
        )}
      </FormContents>
    </FlexboxCol>
  )
}

export default TripForm

const TripFormHeader = styled(FormHeader)`
  color: black;
`
