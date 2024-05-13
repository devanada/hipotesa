import { Home, Package, ShoppingCart, Users2, Tags } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import NavLink from "@/components/nav-link";

export default function Sidebar() {
  return (
    <TooltipProvider>
      <aside className="inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger>
              <NavLink href="/dashboard">
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <NavLink href="/dashboard/orders">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <NavLink href="/dashboard/products">
                <Package className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <NavLink href="/dashboard/categories">
                <Tags className="h-5 w-5" />
                <span className="sr-only">Categories</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Categories</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <NavLink href="/dashboard/users">
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Users</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Users</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
