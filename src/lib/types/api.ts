import { NextRequest } from "next/server";
import { Session } from "next-auth";

export interface IResponseSuccess<TData = any> {
  message: string;
  data: TData;
}

export interface IResponseFailed {
  message: string;
  reason: string;
}

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}
