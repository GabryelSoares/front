'use client'
import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { VehiclesProvider } from '@/context/vehicles-context'
import LayoutGrid from './layout-grid'
import { Toaster } from "@/components/ui/sonner"
import { EstablishmentsProvider } from '@/context/establishments-context'
import { ParkingRegistersProvider } from '@/context/parking-registers-context'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <VehiclesProvider>
        <EstablishmentsProvider>
          <ParkingRegistersProvider>
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
          </ParkingRegistersProvider>
        </EstablishmentsProvider>
      </VehiclesProvider>
    </SessionProvider>
  )
}
