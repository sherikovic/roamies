import React, { useContext } from 'react'
import { User } from 'types/user'

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  updateUser: (user: Partial<User>, prevState: User | null) => void
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  updateUser: () => {},
})

export const useAuthCtx = () => {
  const { isAuthenticated, user } = useContext(AuthContext)
  return { isAuthenticated, user }
}

// export const useUser = () => {
// 	const { user } = useContext(AuthContext);
// 	return user;
// };

// export const useAuthState = () => {
// 	const { isAuthenticated } = useContext(AuthContext);
// 	return isAuthenticated;
// };
