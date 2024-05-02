"use client";

import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, children }, ref) => {
    const pathname = usePathname();
    const isActive = href === pathname;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground"
        )}
      >
        {children}
      </Link>
    );
  }
);

export default NavLink;
