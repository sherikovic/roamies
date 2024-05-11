import { useEffect, useReducer } from "react";
import { AuthContextType, AuthContext } from "./auth-context";
import { getCurrentUser } from "./api";
import { User } from "types/user";

const defaultAuthState: AuthContextType | any = {
	isAuthenticated: false,
	userInfo: null,
};

const reducer = (_: any, action: { flag: string; payload?: User }) => {
	if (action.flag === "ready") {
		return {
			isAuthenticated: true,
			userInfo: action.payload,
		};
	}

	if (action.flag === "remove") {
		return defaultAuthState;
	}

	return defaultAuthState;
};

const AuthProvider = (props: any) => {
	const [authState, dispatcher] = useReducer(reducer, defaultAuthState);

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				res.ok
					? dispatcher({ flag: "ready", payload: res.getJson.objects })
					: dispatcher({ flag: "remove" });
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const loginContext = {
		isAuthenticated: authState.isAuthenticated,
		userInfo: authState.userInfo,
	};

	return (
		<AuthContext.Provider value={loginContext}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
