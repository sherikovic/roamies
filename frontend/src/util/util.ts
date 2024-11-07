import { useEffect, useRef } from 'react'

export const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api.roamies.org'

export const clientUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://roamies.org'

export const useIsFirstRender = () => {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}
