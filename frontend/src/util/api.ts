import { backOff } from "exponential-backoff";

import { Trip } from "types/trip";
import { User } from "types/user";
import { baseURL } from "./util";
import { Broadcast } from "types/broadcast";

const apiFetch = async <T>(
	method: "GET" | "POST" | "PATCH" | "DELETE",
	path: string,
	data: any
): Promise<{
	ok: boolean;
	isClientError: boolean;
	status: number;
	getJson: ({ error?: { message: string; error: any } } & { objects: T }) | any;
}> => {
	try {
		const response = await backOff(
			async () => {
				const res = await fetch(`${baseURL}/${path}`, {
					method,
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: data ? JSON.stringify(data) : undefined,
				});

				// Retry 5xx errors
				if (!res || res.status.toString()[0] === "5") {
					const errObj = {
						ok: res.ok,
						isClientError: false,
						status: res.status,
						getJson: await res.json(),
					};
					throw errObj;
				} else return res;
			},
			{
				numOfAttempts: 3,
			}
		);

		let returnObj = {
			ok: response.ok,
			isClientError: response.status >= 400 && response.status <= 499,
			status: response.status,
			getJson: undefined,
		};
		returnObj.getJson = !path.includes("login") && (await response.json());

		return returnObj;
	} catch (e: any) {
		return e;
	}
};

export const apiGet = async <T>(path: string) =>
	await apiFetch<T>("GET", path, null);

export const apiPost = async <T>(path: string, data: any) =>
	await apiFetch<T>("POST", path, data);

export const apiPatch = async <T>(path: string, data: any) =>
	await apiFetch<T>("PATCH", path, data);

export const apiDelete = async <T>(path: string) =>
	await apiFetch<T>("DELETE", path, null);

export const getAllTrips = async (queryOptions?: string) => {
	const res = await apiGet<Trip[]>(
		queryOptions ? `trips?${queryOptions}` : "trips"
	);
	return res.getJson;
};

// kinda redundant, could use queryOptions in getAllTrips but this is more direct
export const getUserTrips = async (email: string) => {
	const res = await apiGet<Trip[]>(`trips?email=${email}`);
	return res.getJson;
};

// only to display a single trip, no filtering, no gimmicks, just retrieve info
export const getTrip = async (id: string) => {
	const res = await apiGet<Trip>(`trips/${id}`);
	return res.getJson;
};

export const createTrip = async (data: Trip) => {
	const res = await apiPost(`trips`, data);
	return res;
};

export const updateTrip = async (id: string, data: Trip) => {
	const res = await apiPatch(`trips/${id}`, data);
	return res.getJson;
};

export const deleteTrip = async (id: string) => {
	const res = await apiDelete(`trips/${id}`);
	return res.getJson;
};

export const authUser = async (mode: string, data: User | null) => {
	// logout doesn't take any data
	const res = data
		? await apiPost(`auth/${mode}`, data)
		: await apiPost(`auth/${mode}`, null);
	return res;
};

export const getUser = async () => {
	const res = await apiGet("auth/getusername");
	return res;
};

export const getAllEvents = async (queryOptions?: string) => {
	const res = await apiGet<Broadcast[]>(
		queryOptions ? `events?${queryOptions}` : "events"
	);
	return res;
};

export const getUserEvents = async (email: string) => {
	const res = await apiGet<Trip[]>(`events?email=${email}`);
	return res.getJson;
};

export const getEvent = async (id: string) => {
	const res = await apiGet<Broadcast>(`events/${id}`);
	return res;
};

export const createEvent = async (data: Broadcast) => {
	const res = await apiPost(`events`, data);
	return res;
};

export const updateEvent = async (id: string, data: Broadcast) => {
	const res = await apiPatch(`events/${id}`, data);
	return res;
};

export const deleteEvent = async (id: string) => {
	const res = await apiDelete(`events/${id}`);
	return res;
};

// export const getAllData = async (
// 	select: string,
// 	path: string,
// 	queryOptions?: string
// ) => {
// let path: string;
// path = select === 'trip' ? 'trips'
// };
