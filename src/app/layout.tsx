import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
      >
        <div className="relative w-full flex items-center justify-center" style={{zIndex:9999}}>
        <Navbar/>
        </div>
        {children}
      </body>
    </html>
  );
}
