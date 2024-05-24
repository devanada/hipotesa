import Link from "next/link";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 md:px-6 lg:flex-row lg:items-start lg:gap-12">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage alt="User Avatar" src={session?.user?.image!} />
          <AvatarFallback>JD</AvatarFallback>
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
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Name</span>
              <span>{session?.user?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Email</span>
              <span>{session?.user?.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Address</span>
              <span>{session?.user?.address}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Profile</span>
              <Link
                className={buttonVariants({ size: "sm", variant: "outline" })}
                href="/user/settings"
              >
                Change Profile
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Theme</span>
              <ModeToggle />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
