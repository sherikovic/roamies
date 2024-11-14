import { backOff } from 'exponential-backoff'
import { baseURL } from './util'

const apiFetch = async <T>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  data: any,
): Promise<{
  ok: boolean
  isClientError: boolean
  status: number
  getJson: ({ error?: { message: string; error: any } } & { objects: T }) | any
}> => {
  try {
    const response = await backOff(
      async () => {
        const res = await fetch(`${baseURL}/${path}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: data ? JSON.stringify(data) : undefined,
        })

        // Retry 5xx errors
        if (!res || res.status.toString()[0] === '5') {
          const errObj = {
            ok: res.ok,
            isClientError: false,
            status: res.status,
            getJson: await res.json(),
          }
          throw errObj
        } else return res
      },
      {
        numOfAttempts: 3,
      },
    )

    const returnObj = {
      ok: response.ok,
      isClientError: response.status >= 400 && response.status <= 499,
      status: response.status,
      getJson: await response.json(),
    }

    return returnObj
  } catch (e: any) {
    return e
  }
}

export const apiGet = async <T>(path: string) => await apiFetch<T>('GET', path, null)
export const apiPost = async <T>(path: string, data: any) => await apiFetch<T>('POST', path, data)
export const apiPatch = async <T>(path: string, data: any) => await apiFetch<T>('PATCH', path, data)
export const apiDelete = async <T>(path: string) => await apiFetch<T>('DELETE', path, null)

// DB APIs
// type should be either "events" or "trips"
// T is either Broadcast or Trip respectively
export const getAllDBEntries = async <T>(type: string, queryOptions?: string) =>
  await apiGet<T[]>(queryOptions ? `${type}?${queryOptions}` : type)
export const getUserDBEntries = async <T>(type: string, id: string) =>
  await getAllDBEntries<T>(type, `userId=${id}`)
export const getDBEntry = async <T>(type: string, id: string) => await apiGet<T>(`${type}/${id}`)
export const createDBEntry = async <T>(type: string, data: Partial<T> | any) =>
  await apiPost<T>(type, data)
export const updateDBEntry = async <T>(type: string, id: string, data: Partial<T> | any) =>
  await apiPatch<T>(`${type}/${id}`, data)
export const deleteDBEntry = async <T>(type: string, id: string) =>
  await apiDelete<T>(`${type}/${id}`)

export const sendEmail = async (data: { email: string; name: string; msg: string }) =>
  await apiPost('sendemail', data)
