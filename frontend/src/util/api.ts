import { baseURL } from './util'

export const sendEmail = async (data: { email: string; name: string; msg: string }) => {
  try {
    const res = await fetch(`${baseURL}/utils/contact-support`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    const response = res.ok
      ? {
          ok: res.ok,
          status: res.status,
          getJson: await res.json(),
        }
      : res
    return response
  } catch (e) {
    return e
  }
}
