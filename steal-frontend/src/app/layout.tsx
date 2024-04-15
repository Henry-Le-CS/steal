import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Toaster } from "@/components/ui/toaster";
import { CookiesProvider } from 'next-client-cookies/server';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STEAL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32px" />
      </head>
      <body className={inter.className}>
        <CookiesProvider>
          {children}
        </CookiesProvider>
        <Toaster />
      </body>
    </html>
  );
}
