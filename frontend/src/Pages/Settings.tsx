import { ActionFunction, json, useRouteLoaderData } from 'react-router-dom'
import PageContent from '../Components/Misc/PageContent'
import SettingsTabs from '../Components/Settings/SettingsTabs'
import { updateUserInfo } from 'util/api'

const SettingsPage: React.FC = () => {
  const logIn = useRouteLoaderData('root')

  return (
    <>
      {logIn ? (
        <div>
          <PageContent headerText="Settings">Update your settings</PageContent>
          <SettingsTabs />
        </div>
      ) : (
        <div>
          <h4 style={{ textAlign: 'center' }}>You are not authorized to view this page!</h4>
        </div>
      )}
    </>
  )
}

export default SettingsPage

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  let FormData: any = {}

  if (data.get('personal') === '') {
    FormData = {
      firstName: data.get('first name'),
      lastName: data.get('last name'),
      age: data.get('age'),
      country: data.get('country'),
      bio: data.get('bio'),
      social: {
        instagram: data.get('instagram'),
        twitter: data.get('twitter'),
      },
      type: 'personal',
    }

    if (FormData.firstName === '') {
      return {
        errorMessage: 'First name is required!',
        type: FormData.type,
      }
    }
  } else if (data.get('accountEmail') === '') {
    FormData = {
      oldEmail: data.get('old Email'),
      newEmail: data.get('new Email'),
      confirmNewEmail: data.get('confirm New Email'),
      type: 'email',
    }
  } else if (data.get('accountPassword') === '') {
    FormData = {
      oldPassword: data.get('old Password'),
      newPassword: data.get('new Password'),
      confirmNewPassword: data.get('confirm New Password'),
      type: 'password',
    }
  }
  const response = await updateUserInfo(FormData)

  if (response.ok) {
    const resData = await response.getJson
    return {
      ok: true,
      successMessage: resData.message,
      type: FormData.type,
      data: FormData,
    }
  } else {
    const status = response.status
    const resData = await response.getJson
    if (status === 500) {
      throw json({ message: resData.message }, { status })
    } else if (status === 501) {
      return {
        ok: false,
        errorMessage: resData.message,
        type: FormData.type,
      }
    } else if (status === 502) {
      return {
        ok: false,
        errorMessage: resData.message,
        type: FormData.type,
      }
    }
  }
}
