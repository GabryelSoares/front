import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/context/session-context'
import { VehiclesProvider } from '@/context/vehicles-context'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

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
            <div className="grid h-screen grid-cols-1 grid-rows-[80px,1fr,28px]">
              <Navbar />
              {children}
              <Footer />
            </div>
          </body>
        </html>
      </VehiclesProvider>
    </SessionProvider>
  )
}
