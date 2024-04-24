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
  title: "Create Next App",
  description: "Generated by create next app",
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
          "h-dvh w-full bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <div className="h-full w-full overflow-auto flex flex-col">
          <Navbar />
          <main className="grow container flex flex-col py-4 space-y-4">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}