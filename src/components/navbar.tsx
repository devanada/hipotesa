import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = async () => {
  const cookieStore = cookies();
  const sessionID = cookieStore.get("sessionID");

  async function handleLogout() {
    "use server";

    cookies().delete("sessionID");
    cookies().delete("userID");

    revalidatePath("/");
  }

  return (
    <div className="supports-backdrop-blur:bg-background/60 sticky left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="container flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <div className="hidden md:flex">
            <Link className="text-lg font-semibold text-nowrap" href="/">
              VoiceBox
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-end h-full w-full">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>VB</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end" forceMount>
              {sessionID && sessionID?.value.length !== 0 ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/my-favorite">My Favorite</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-watchlist">Watchlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action={handleLogout}>
                      <button className="w-full text-left">Logout</button>
                    </form>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login">Login</Link>
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
