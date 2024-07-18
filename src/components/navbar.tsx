import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { auth, signIn, signOut } from "@/auth";
import { getCart } from "@/utils/apis/carts";

async function getCartLength() {
  const session = await auth();

  if (session) {
    const { data } = await getCart();

    return data.cart_items.length;
  }

  return null;
}

const Navbar = async () => {
  const totalItems = await getCartLength();
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
          {session?.user?.role === "user" ? (
            <Link
              className={
                (buttonVariants({ variant: "ghost", size: "icon" }), "relative")
              }
              href="/cart"
            >
              <ShoppingCart />
              <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {totalItems}
              </span>
            </Link>
          ) : null}
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
                </>
              ) : null}
              <ModeToggle />
              <DropdownMenuSeparator />
              {session ? (
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
