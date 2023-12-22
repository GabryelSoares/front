import Link from 'next/link'
import React from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa'

export default function SocialMedia() {
  return (
    <section
      id="social-media"
      className="flex w-full flex-col items-center justify-center gap-2 px-20 pt-2 text-white"
    >
      <div className="flex gap-2">
        <Link
          href="https://www.facebook.com/doutorconsulta"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaFacebook size={30} />
        </Link>
        <Link
          href="https://www.linkedin.com/company/drconsulta/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaLinkedin size={30} />
        </Link>
        <Link
          href="https://www.instagram.com/drconsulta/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaInstagram size={30} />
        </Link>
        <Link
          href="https://www.youtube.com/user/DrConsulta"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaYoutube size={30} />
        </Link>
        <Link
          href="https://twitter.com/drconsulta"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaTwitter size={30} />
        </Link>
      </div>
    </section>
  )
}
