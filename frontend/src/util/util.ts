export const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api.roamies.org'

export const clientUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://roamies.org'

export const getIsMobile = () => window.matchMedia(`screen and (max-width: ${668}px)`).matches
