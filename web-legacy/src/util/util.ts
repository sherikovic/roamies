import { useEffect, useRef } from 'react'
import { getCurrentUser } from 'util/api'

export const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api.roamies.xyz'

export const clientUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://roamies.xyz'

export const useIsFirstRender = () => {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}

export const isUserLoggedIn = async () => {
  const response = await getCurrentUser()
  if (response.getJson.objects) {
    return true
  } else {
    return false
  }
}

export const useOutsideAlerter = (ref: any, handleClick: any) => {
  const handleClickOutside = (e: any) => {
    if (ref?.current && !ref.current.contains(e.target)) handleClick()
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}
