import React, { useContext } from "react";
import { User } from "types/user";

export interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: User | null;
  updateUserInfo: (userInfo: Partial<User>, prevState: User | null) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  userInfo: null,
  updateUserInfo: () => {},
});

export const useUser = () => {
  const { userInfo } = useContext(AuthContext);
  return userInfo;
};
