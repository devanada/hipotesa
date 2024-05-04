import { cookies } from "next/headers";
import { IResponseSuccess, IResponseFailed } from "../types/api";

const _apiHost = process.env.BASE_URL;

type Params =
  | FormData
  | {
      [key: string]: FormDataEntryValue | string;
    };

function request<TResponse>(
  url: string,
  method: "POST" | "PUT",
  params: Params
): Promise<any>;
function request<TResponse>(
  url: string,
  method: "GET" | "DELETE",
  params?: Params
): Promise<any>;
async function request<TResponse>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  params?: Params
) {
  const options: RequestInit = {
    method,
    headers: {
      Cookie: `authjs.session-token=${
        cookies().get("authjs.session-token")?.value ?? ""
      }`,
    },
  };
  const headers = options?.headers
    ? new Headers(options.headers)
    : new Headers();

  if (params) {
    if (["GET", "DELETE"].includes(method)) {
      url += "?" + objectToQueryString(params as { [key: string]: string });
      options.next = { revalidate: 0 };
    } else {
      if (params instanceof FormData) {
        options.body = params;
      } else {
        options.body = JSON.stringify(params);
        headers.set("Content-Type", "application/json");
      }
    }
  }

  const response = await fetch(_apiHost + url, options);

  if (response.ok) {
    return (await response.json()) as IResponseSuccess<TResponse>;
  }

  return (await response.json()) as IResponseFailed;
}

function objectToQueryString(obj: { [key: string]: string }) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
}

function get<TResponse>(url: string, params?: Params) {
  return request<TResponse>(url, "GET", params);
}

function create<TResponse>(url: string, params: Params) {
  return request<TResponse>(url, "POST", params);
}

function update<TResponse>(url: string, params: Params) {
  return request<TResponse>(url, "PUT", params);
}

function remove<TResponse>(url: string, params?: Params) {
  return request<TResponse>(url, "DELETE", params);
}

export default {
  get,
  create,
  update,
  remove,
};
