import { useEffect, useRef } from "react";
import { getUser } from "util/api";

export const baseURL =
	process.env.NODE_ENV === "development"
		? "http://localhost:8080"
		: "https://roamies-wd6p.onrender.com";

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

export const useOutsideAlerter = (ref: any, handleClick: any) => {
	const handleClickOutside = (e: any) => {
		if (ref?.current && !ref.current.contains(e.target)) handleClick();
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});
};
