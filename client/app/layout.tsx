import React, { FC, ReactNode } from "react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../@/lib/utils";

const RootLayout : FC<{ children : ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >{children}</body>
    </html>
  )
}

export default RootLayout;

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})