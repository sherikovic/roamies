import { useEffect, useRef } from 'react';

export const baseURL = 'http://localhost:8080';

export const useIsFirstRender = () => {
	const isMountRef = useRef(true);
	useEffect(() => {
		isMountRef.current = false;
	}, []);
	return isMountRef.current;
};
