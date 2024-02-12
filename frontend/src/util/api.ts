import { backOff } from "exponential-backoff";

import { baseURL } from "./util";

const apiFetch = async <T>(
  method: "GET" | "POST",
  path: string,
  data: any
): Promise<{
  ok: boolean;
  isClientError: boolean;
  status: number;
  getJson: { error?: string } & T;
}> => {
  try {
    const response = await backOff(
      async () => {
        const res = await fetch(`${baseURL}/${path}`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: data ? JSON.stringify(data) : undefined,
        });

        // Retry 5xx errors
        if (!res || res.status.toString()[0] === "5")
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
  } catch (e) {
    return e;
  }
};

const apiGet = async <T>(path: string) => await apiFetch<T>("GET", path, null);

const apiPost = async function <T>(path: string, data: any) {
  return await apiFetch<T>("POST", path, data);
};
