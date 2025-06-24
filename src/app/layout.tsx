import type { Metadata } from "next";

import "./globals.css";
import { Inter } from "next/font/google";

import Providers from "@/store/Provider";
import SessionAuthProvider from "@/context/SessionAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TodoFlow",
  description: "App todo-flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionAuthProvider>
          <Providers>{children}</Providers>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
