import React, { FC, ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const RootLayout : FC<{ children : ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-pageBg font-sans antialiased",
            fontSans.variable
          )}
        >{children}</body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout;

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})