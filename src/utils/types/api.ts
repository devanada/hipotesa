import { NextRequest } from "next/server";
import { Session } from "next-auth";

export interface IResponseSuccess<TData> {
  message: string;
  data: TData;
  metadata?: {
    total_count: number;
    total_pages: number;
  };
}

export interface IResponseFailed
  extends Pick<IResponseSuccess<never>, "message"> {
  reason?: Record<string, string[]> & string;
}

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}
