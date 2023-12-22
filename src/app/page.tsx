'use client'
import Features from '@/components/organisms/features'
import SocialMedia from '@/components/social-media'
import Background from '../../public/background.svg'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { SessionContext } from '@/context/session-context'
import { usePathname, useRouter } from 'next/navigation'

export default function Home() {
  const { data: sessionData } = useContext(SessionContext);
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // console.log(`${pathname}:: `, sessionData)
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''
    if((!accessToken || !sessionData) && !['/sign-in', '/sign-up', '/'].includes(pathname)) {
      router.push('/sign-in')
    }
  }, [sessionData])

  return (
      <main className="relative">
        <Image
          src={Background}
          alt="Background SVG"
          className="absolute inset-0 z-[-1] h-full w-full object-cover"
        />
        <div className="relative p-2 z-2 flex h-screen max-h-[calc(100vh-110px)] w-full flex-col overflow-auto">
          <Features />
          <SocialMedia />
        </div>
      </main>
  )
}
