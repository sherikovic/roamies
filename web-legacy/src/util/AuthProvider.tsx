import { useEffect, useReducer } from 'react'
import { AuthContextType, AuthContext } from './auth-context'
import { getCurrentUser } from './api'
import { User } from 'types/user'

const defaultAuthState: AuthContextType | any = {
  isAuthenticated: false,
  user: null,
}

const reducer = (
  _: any,
  action: { flag: string; payload?: Partial<User>; prevState?: User | null },
) => {
  let updatedUser: any = {}

  if (action.flag === 'ready') {
    if (action.prevState) {
      Object.keys(action.prevState).forEach((key) => {
        if (action.payload && key in action.payload) {
          updatedUser[key] = action.payload[key]
        } else if (action.prevState && key in action.prevState) {
          updatedUser[key] = action.prevState[key]
        }
      })
    } else {
      updatedUser = action.payload
    }
    return {
      isAuthenticated: true,
      user: updatedUser,
    }
  }

  if (action.flag === 'remove') {
    return defaultAuthState
  }

  return defaultAuthState
}

const AuthProvider = ({ children }: { children: any }) => {
  const [authState, dispatcher] = useReducer(reducer, defaultAuthState)

  // TODO use sessionStorage instead
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res.ok) {
          dispatcher({ flag: 'ready', payload: res.getJson.objects })
        } else {
          dispatcher({ flag: 'remove' })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const loginContext = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    updateUser: (user: Partial<User>, prevState: User | null) => {
      dispatcher({ flag: 'ready', payload: user, prevState })
    },
  }

  return <AuthContext.Provider value={loginContext}>{children}</AuthContext.Provider>
}

export default AuthProvider
