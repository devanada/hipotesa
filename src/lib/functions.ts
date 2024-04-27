import { Session } from "next-auth";

import { Roles } from "@/lib/types/user";

type AnyFunction = (...args: any[]) => any;

export const nullIfError =
  <Func extends AnyFunction>(func: Func) =>
  async (...args: Parameters<Func>) => {
    try {
      return await func(...args);
    } catch (err) {
      console.error(err);

      return null;
    }
  };

export const isNoAuth = (
  auth: Session | null,
  isAdmin: boolean = false
): boolean => {
  if (isAdmin) {
    if (auth) {
      return auth.user?.role !== "admin";
    }

    return true;
  } else if (auth) {
    return false;
  } else {
    return true;
  }
};
