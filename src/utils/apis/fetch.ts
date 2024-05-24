import { cookies } from "next/headers";

import { IResponseSuccess, IResponseFailed, SearchParams } from "../types/api";

const BASE_URL = process.env.BASE_URL;
const SESSION_NAME =
  process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

interface RequestOptions extends RequestInit {
  query?: SearchParams;
}

async function request<TResponse>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  requestOptions?: RequestOptions
) {
  try {
    const options: RequestInit = {
      ...requestOptions,
      method,
      headers: {
        Cookie: `${SESSION_NAME}=${
          cookies().get(`${SESSION_NAME}`)?.value ?? ""
        }`,
      },
    };
    const headers = new Headers(options.headers);

    if (requestOptions?.query) {
      url += "?" + objectToQueryString(requestOptions?.query);
    }
    if (requestOptions?.body && !(requestOptions.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(BASE_URL + url, options);

    if (response.ok) {
      return (await response.json()) as IResponseSuccess<TResponse>;
    }

    return Promise.reject((await response.json()) as IResponseFailed);
  } catch (error) {
    throw error;
  }
}

function objectToQueryString(obj: SearchParams) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
}

export default {
  get: <TResponse>(url: string, params?: RequestOptions) =>
    request<TResponse>(url, "GET", params),
  create: <TResponse>(url: string, params?: RequestOptions) =>
    request<TResponse>(url, "POST", params),
  update: <TResponse>(url: string, params?: RequestOptions) =>
    request<TResponse>(url, "PUT", params),
  remove: <TResponse>(url: string, params?: RequestOptions) =>
    request<TResponse>(url, "DELETE", params),
};
