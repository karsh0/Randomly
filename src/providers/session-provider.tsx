"use client"

import DarkModeProvider from "@/context/DarkModeContext"
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>
    <DarkModeProvider>
    {children}
    </DarkModeProvider>
    </SessionProvider>
}
