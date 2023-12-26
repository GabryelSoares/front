'use client'
import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { VehiclesProvider } from '@/context/vehicles-context'
import LayoutGrid from './layout-grid'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <VehiclesProvider>
        <html lang="en">
          <head>
            {/* <script src="https://js.hcaptcha.com/1/api.js" async defer></script> */}
          </head>
          <body className={inter.className + 'text-bold'}>
            <LayoutGrid>
              {children}
            </LayoutGrid>
            <Toaster />
          </body>
        </html>
      </VehiclesProvider>
    </SessionProvider>
  )
}
