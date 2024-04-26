"use client";

import { ButtonForm } from "@/components/ui/button-form";
import { Input } from "@/components/ui/input";

import { auth } from "@/auth";
import { User } from "next-auth";

interface Props {
  data?: User;
}

export default async function SettingsForm(props: Props) {
  return (
    <form
      data-testid="form-login"
      className="space-y-8 w-full md:w-3/4 lg:w-1/2"
    >
      <Input
        name="name"
        data-testid="input-name"
        placeholder="John Doe"
        defaultValue={props?.data?.name as string}
      />
      <Input
        name="email"
        data-testid="input-email"
        placeholder="name@domain.com"
        type="email"
        defaultValue={props?.data?.email as string}
      />
      <div className="flex flex-col mt-20 gap-y-5 relative">
        <ButtonForm data-testid="btn-submit" type="submit">
          Save Change
        </ButtonForm>
      </div>
    </form>
  );
}
