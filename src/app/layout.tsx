import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/NavBar";
import Providers from "@/components/Providers";
import "react-loading-skeleton/dist/skeleton.css" 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" className="light">
      <Providers>
        <body
        className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`, "min-h-screen font-sans grainy")}>
        <Navbar/>
        {children}
      </body>
      </Providers>
    </html>
  );
}
