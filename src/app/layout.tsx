import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";

import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hipotesa Store",
  description: "Hipotesa Store, your trusted PC store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-dvh w-full bg-antique-white dark:bg-charcoal font-sans antialiased flex flex-col overflow-hidden",
          fontSans.variable
        )}
      >
        <div className="h-full w-full flex flex-col">
          <Navbar />
          <main className="grow container flex flex-col space-y-4 overflow-auto">
            {children}
            <Toaster richColors position="top-center" />
          </main>
        </div>
      </body>
    </html>
  );
}
