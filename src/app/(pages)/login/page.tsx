import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { signIn, providerMap } from "@/auth";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Card className="w-4/5 md:w-2/3 lg:w-1/3">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login into your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3">
          {Object.values(providerMap).map((provider) => (
            <form
              className="flex justify-center"
              action={async () => {
                "use server";
                await signIn(provider.id);
              }}
              key={provider.id}
            >
              <Button
                className="w-full md:w-3/4"
                data-testid={`sign-in-${provider.id}`}
                type="submit"
                size="lg"
              >
                Sign in with {provider.name}
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
