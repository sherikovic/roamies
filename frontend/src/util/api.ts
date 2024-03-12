import { backOff } from 'exponential-backoff';

import { baseURL } from './util';
import { Trip } from 'types/trip';

const apiFetch = async <T>(
	method: 'GET' | 'POST',
	path: string,
	data: any
): Promise<{
	ok: boolean;
	isClientError: boolean;
	status: number;
	getJson: { error?: { message: string; status: number } } & { objects: T };
}> => {
	try {
		const response = await backOff(
			async () => {
				const res = await fetch(`${baseURL}/${path}`, {
					method,
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: data ? JSON.stringify(data) : undefined,
				});

				// Retry 5xx errors
				if (!res || res.status.toString()[0] === '5')
					throw Error(`${res?.status}`);
				else return res;
			},
			{
				numOfAttempts: 3,
			}
		);

		return {
			ok: response.ok,
			isClientError: response.status >= 400 && response.status <= 499,
			status: response.status,
			getJson: await response.json(),
		};
	} catch (e: any) {
		return e;
	}
};

export const apiGet = async <T>(path: string) =>
	await apiFetch<T>('GET', path, null);

export const apiPost = async <T>(path: string, data: any) =>
	await apiFetch<T>('POST', path, data);

export const getAllTrips = async (queryOptions?: string) => {
	const res = await apiGet<Trip[]>(
		queryOptions ? `trips?${queryOptions}` : 'trips'
	);
	return res.getJson;
};

// kinda redundant, could use queryOptions in getAllTrips but this is more direct
export const getUserTrips = async (username: string) => {
	const res = await apiGet<Trip[]>(`trips?username=${username}`);
	return res.ok ? res.getJson : null;
};

// only to display a single trip, no filtering, no gimmicks, just retrieve info
export const getTrip = async (id: string) => {
	const res = await apiGet<Trip>(`trips/${id}`);
	return res.ok ? res.getJson : null;
};

export const createTrip = async ({ data }: { data: Trip }) => {
	const res = await apiPost(`trips`, data);
	return res.ok ? res.getJson : null;
};

export const updateTrip = async (id: string, data: Trip) => {
	const res = await apiPost(`trip/${id}`, data);
	return res.ok ? res.getJson : null;
};

export const deleteTrip = async (id: string) => {
	const res = await apiGet(`trip/${id}/delete`);
	return res.ok ? res.getJson : null;
};
