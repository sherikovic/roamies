import React from "react";
import { User } from "types/user";

export interface AuthContextType {
	isAuthenticated: boolean;
	userInfo: User | null;
}

export const AuthContext = React.createContext<AuthContextType>({
	isAuthenticated: false,
	userInfo: null,
});
