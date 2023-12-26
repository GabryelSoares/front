'use client'
import { ReactNode } from 'react'
import Footer from '@/components/organisms/footer'
import Navbar from '@/components/organisms/navbar'
import { usePathname } from 'next/navigation';

export default function LayoutGrid({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const hideGridLayout = ['/sign-in', '/sign-up'].includes(pathname)

  if(hideGridLayout) return <div className='h-screen'>{children}</div>

  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[80px,1fr,28px]">
      <Navbar />
        {children}
      <Footer />
    </div>
  )
}
