"use client";

import { User } from "next-auth";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormAction } from "@/utils/hooks/use-form-action";
import { editProfile } from "@/utils/actions/users";

interface Props {
  data?: User;
}

export default function Form({ data }: Props) {
  const [errorMsg, formAction] = useFormAction(editProfile);

  return (
    <form className="grid gap-4" id="edit-form" action={formAction}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          required
          defaultValue={data?.name ?? ""}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="johndoe@example.com"
          defaultValue={data?.email ?? ""}
          disabled
          aria-disabled
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Profile Picture</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          placeholder="Lorom ipsum dolor sit amet"
          defaultValue={data?.address ?? ""}
        />
      </div>
    </form>
  );
}
