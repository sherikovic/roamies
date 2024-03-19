import { useEffect, useRef } from 'react';
import { getUser } from 'util/api';

export const baseURL = 'http://localhost:8080';

export const useIsFirstRender = () => {
	const isMountRef = useRef(true);
	useEffect(() => {
		isMountRef.current = false;
	}, []);
	return isMountRef.current;
};

export const isUserLoggedIn = async () => {
	const res = await getUser();
	if (res.getJson.user) {
		return true;
	} else {
		return false;
	}
};
