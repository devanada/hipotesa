"use client";

import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ButtonForm } from "@/components/ui/button-form";
import { Input } from "@/components/ui/input";

import { useFormAction } from "@/lib/hooks/useFormAction";
import { login } from "@/lib/actions/auth";

export default function LoginForm() {
  const [errorMsg, dispatch] = useFormAction(login);

  return (
    <form
      data-testid="form-login"
      className="space-y-8 w-full md:w-3/4 lg:w-1/2"
      action={dispatch}
    >
      {errorMsg.message ? (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMsg.reason}</AlertDescription>
        </Alert>
      ) : null}
      <Input
        name="email"
        data-testid="input-email"
        placeholder="name@domain.com"
        type="email"
      />
      <Input
        name="password"
        data-testid="input-password"
        placeholder="Password"
        type="password"
      />
      <div className="flex flex-col mt-20 gap-y-5 relative">
        <ButtonForm data-testid="btn-submit" type="submit">
          Sign in
        </ButtonForm>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <ButtonForm
          data-testid="btn-navigate"
          type="button"
          variant="outline"
          asChild
        >
          <Link href="/register">Sign up</Link>
        </ButtonForm>
      </div>
    </form>
  );
}
