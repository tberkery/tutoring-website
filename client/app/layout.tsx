import React, { FC, ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const RootLayout : FC<{ children : ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-pageBg font-sans antialiased",
            "text-textPrimary dark:text-textPrimaryDark",)}
        >{children}</body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout;
