import Link from "next/link";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./form";

import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 md:px-6 lg:flex-row lg:items-start lg:gap-12">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage alt="User Avatar" src={session?.user?.image!} />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {session?.user?.email}
          </p>
        </div>
      </div>
      <div className="w-full max-w-md space-y-4 lg:flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Form data={session?.user} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/user"
            >
              Cancel
            </Link>
            <Button form="edit-form" type="submit">
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
