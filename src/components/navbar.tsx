import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="supports-backdrop-blur:bg-antique-white/60 dark:supports-backdrop-blur:bg-charcoal/60 sticky left-0 right-0 top-0 z-20 border-b bg-antique-white/95 dark:bg-charcoal/95 backdrop-blur">
      <nav className="container flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <div className="hidden md:flex">
            <Link
              className="text-lg font-semibold text-nowrap text-charcoal dark:text-antique-white"
              href="/"
            >
              Hipotesa
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-end h-full w-full">
          <Link
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            href="/cart"
          >
            <ShoppingCart />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session?.user?.image ?? undefined} />
                <AvatarFallback>H</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end" forceMount>
              {session ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/user">My Profile</Link>
                  </DropdownMenuItem>
                  {session.user?.role === "admin" ? (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/transactions">Transactions</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/user/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button className="w-full text-left">Sign Out</button>
                    </form>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <form
                    action={async () => {
                      "use server";
                      await signIn();
                    }}
                  >
                    <button className="w-full text-left">Sign in</button>
                  </form>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
