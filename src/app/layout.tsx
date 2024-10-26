// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import StoreProvider from "./StoreProvider";  // Import the StoreProvider

export const metadata: Metadata = {
  title: "Vibe AI",
  description: "Vibe AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <StoreProvider> {/* Wrap the app with StoreProvider */}
          <div className="relative w-full flex items-center justify-center" style={{ zIndex: 9997 }}>
            <Navbar />
          </div>

          {/* Google Analytics Scripts */}
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-L31PL3071C`}
          />
          <Script id="google-analytics-setup" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L31PL3071C', {
                page_path: window.location.pathname,
              });
            `}
          </Script>

          {children}
        </StoreProvider> {/* End of StoreProvider */}
      </body>
    </html>
  );
}
