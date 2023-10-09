import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/button/Button'
import { useFetchUser } from '@/lib/authContext'
import { unsetToken } from '@/lib/auth'

function Header() {
  const { user, loading } = useFetchUser()

  return (
    <nav
      className="bg-white text-gray-600 body-font hidden md:block"
      style={{ flex: '0 1 auto' }}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
          <span className="ml-3 text-xl">Poetica</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900">
            Poem a Day
          </Link>
          {/* {user && (
            <Link
              href="/personalized-square"
              className="mr-5 hover:text-gray-900"
            >
              Personalized square
            </Link>
          )} */}
          <Link
              href="/challenge"
              className="mr-5 hover:text-gray-900"
            >
              Challenge
            </Link>
          <Link href="/how-to-play" className="mr-5 hover:text-gray-900">
            How to play
          </Link>
          <Link href="/community-forum" className="mr-5 hover:text-gray-900">
            Community
          </Link>
          {user && (
            <Link href="/logged-in-user-poems" className="mr-5 hover:text-gray-900">
              Poems by You
            </Link>
          )}
        </nav>
        {user ? (
          <div>
            <span className="py-2 px-8 text-lg">Let&apos;s Play, {user}</span>
            <Button text={'Log Out'} onClick={unsetToken} />
          </div>
        ) : (
          <Button text={'Log In'} link="/sign-in" />
        )}
      </div>
    </nav>
  )
}

export default Header
