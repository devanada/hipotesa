import { cookies } from "next/headers";
import { IResponseSuccess } from "../types/api";

const _apiHost = process.env.BASE_URL;

type Params =
  | FormData
  | {
      [key: string]: string;
    };

function request<TResponse>(
  url: string,
  method: "POST" | "PUT",
  params: Params
): Promise<IResponseSuccess<TResponse>>;
function request<TResponse>(
  url: string,
  method: "GET" | "DELETE",
  params?: Params
): Promise<IResponseSuccess<TResponse>>;
async function request<TResponse>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  params?: Params
): Promise<IResponseSuccess<TResponse>> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: `authjs.session-token=${
        cookies().get("authjs.session-token")?.value ?? ""
      }`,
    },
  };

  if (params) {
    if (["GET", "DELETE"].includes(method)) {
      url += "?" + objectToQueryString(params as { [key: string]: string });
      options.next = { revalidate: 10 };
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(_apiHost + url, options);

  if (response.status !== 200) {
    return generateErrorResponse(
      "The server responded with an unexpected status."
    );
  }

  const result = (await response.json()) as IResponseSuccess<TResponse>;

  return result;
}

function objectToQueryString(obj: { [key: string]: string }) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
}

function generateErrorResponse(message: string) {
  return {
    status: "error",
    message,
  };
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
