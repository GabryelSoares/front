import Features from '@/components/organisms/features'
import SocialMedia from '@/components/molecules/social-media'
import Background from '../../public/background.svg'
import Image from 'next/image'

export default function Home() {


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
