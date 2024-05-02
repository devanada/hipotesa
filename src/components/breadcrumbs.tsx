"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {segments.map((segment, index) => {
          if (index === segments.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage className="capitalize">
                  {segment}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          } else {
            return (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink asChild>
                    <Link href={`/dashboard/${segment}`} className="capitalize">
                      {segment}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
