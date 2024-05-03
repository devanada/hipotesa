import React from "react";

import { Button } from "@/components/ui/button";

import { signIn, providerMap } from "@/auth";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col space-y-2 text-center mb-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login into your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password below to login
        </p>
      </div>
      <div className="space-y-2 w-full md:w-3/4 lg:w-1/2 flex flex-col items-center">
        {Object.values(providerMap).map((provider) => (
          <form
            action={async () => {
              "use server";
              await signIn(provider.id);
            }}
            key={provider.id}
          >
            <Button data-testid={`sign-in-${provider.id}`} type="submit">
              Sign in with {provider.name}
            </Button>
          </form>
        ))}
      </div>
      {/* <LoginForm /> */}
    </div>
  );
};

export default Page;
