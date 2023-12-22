'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { LuParkingCircle } from "react-icons/lu";
import { SessionContext } from '@/context/session-context';
import { usePathname } from 'next/navigation';


export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const { data: sessionData, clearSession } = React.useContext(SessionContext);
  const pathname = usePathname()

  const menus = [
    { title: 'Início', path: '/', isPublic: true },
    { title: 'Estabelecimentos', path: '/establishments' },
    { title: 'Veículos', path: '/vehicles' },
    { title: 'Registros', path: '/parking-registers' },
  ]

  return (
    <nav className="w-full border-b border-my_blue bg-white z-20">
      <div className="mx-auto max-w-screen-xl items-center px-4 md:flex md:px-8 bg-white">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/">
            <div
              className="flex flex-row justify-center font-bold text-gray-600 transition-transform duration-300 hover:scale-105 hover:text-my_blue"
            >
              <LuParkingCircle size={30} />
              <span className='mt-1'>arking</span>
            </div>
          </Link>
          <div className="md:hidden">
            <button
              className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${open ? 'block' : 'hidden'
            }`}
        >
          <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li
                key={idx}
                className="font-bold text-gray-600 transition-transform duration-300 hover:scale-105 hover:text-my_blue hover:bg-gray-100 p-2 rounded"
              >
                {item.isPublic && !sessionData?.isAuthenticated ? (
                  <span>{item.title}</span>
                ) : (
                  <Link href={item.path}>{item.title}</Link>
                )}
              </li>
            ))}
            {pathname !== '/sign-in' && (
              <li
                key='login-mobile'
                className="font-bold text-gray-600 transition-transform duration-300 hover:scale-105 hover:text-my_blue hover:bg-gray-100 p-2 rounded lg:hidden"
              >
                {sessionData?.isAuthenticated ? (
                  <span onClick={() => clearSession()}>Logout</span>
                ) : (
                  <Link href='/sign-in'>Login</Link>
                )}
              </li>
            )}
          </ul>
        </div>
        {pathname !== '/sign-in' && (
          <div
            className="font-bold text-gray-600 transition-transform duration-300 hover:scale-105 hover:text-my_blue hover:bg-gray-100 p-2 rounded hover:cursor-pointer">
            {sessionData?.isAuthenticated ? (
              <span onClick={() => clearSession()}>Logout</span>
            ) : (
              <Link href='/sign-in'>Login</Link>
            )}
          </div>
        )}
      </div>
    </nav >
  )
}
