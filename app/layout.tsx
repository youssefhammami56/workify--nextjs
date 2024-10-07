import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ToastProvider } from "./providers/toaster-provider";
import LandingPageNavbar from "./landingpage/landingpagenavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workify",
  description: "Generated by create next app",
  
  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        {/* <Navbar /> */}

        <body className={inter.className}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}