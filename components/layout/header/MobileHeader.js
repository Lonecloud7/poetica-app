import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ForumIcon from '@mui/icons-material/Forum'
import EmbeddedTimeline from '@/components/public_square/EmbeddedTimeline'
import { useFetchUser } from '@/lib/authContext'
import { unsetToken } from '@/lib/auth'
import Button from '@/components/button/Button'
import SideBarPoems from '@/components/poems/SideBarPoems'

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, loading } = useFetchUser()

  return (
    <nav
      className={` bg-white shadow md:hidden ${
        isSidebarOpen &&
        'fixed top-0 bottom-0 h-screen w-screen z-10 overflow-hidden'
      }`}
      style={{ flex: '0 1 auto' }}
    >
      <div className="container px-6 py-2 mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900"
          >
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
            <span className="ml-3 text-xl">Poetica</span>
          </Link>

          <div className="flex gap-6">
            {/* <!-- Sidebar button --> */}
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-700"
              aria-label="toggle menu"
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen)
                setIsMenuOpen(false)
              }}
            >
              <ForumIcon />
            </button>

            {/* <!-- Mobile menu button --> */}
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-700"
              aria-label="toggle menu"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                setIsSidebarOpen(false)
              }}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
        <div
          className={`${
            isMenuOpen
              ? 'translate-x-0 opacity-100 '
              : 'opacity-0 -translate-x-full'
          } absolute inset-x-0 z-20 w-full px-8 py-4 transition-all duration-300 ease-in-out bg-white pb-10`}
        >
          <div className="flex flex-col">
            <Link
              href="/"
              className="my-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-900"
            >
              Poem a Day
            </Link>
            {/* {user && (
              <Link
                href="/personalized-square"
                className="my-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-900"
              >
                Personalized square
              </Link>
            )} */}

            <Link
                href="/challenge"
                className="my-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-900"
              >
                Challenge
              </Link>
            {user && (
              <Link
                href="/logged-in-user-poems"
                className="my-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-900"
              >
                Poems by You
              </Link>
            )}
            <Link
              href="/how-to-play"
              className="my-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-900"
            >
              How to play
            </Link>
            <Link
              href="/community-forum"
              className="my-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-900"
            >
              Community
            </Link>
            {user ? (
              <div>
                {/* <span className="text-lg">Let&apos;s Play, {user}</span> */}
                <br />
                <Button text={'Log Out'} onClick={unsetToken} />
              </div>
            ) : (
              <Button text={'Log In'} link="/sign-in" />
            )}
          </div>
        </div>

        {/* <!-- Sidebar open: "block", Sidebar closed: "hidden" --> */}
        <div
          className={`${
            isSidebarOpen
              ? 'translate-x-0 opacity-100 '
              : 'opacity-0 -translate-x-full'
          } absolute inset-x-0 z-20 w-full transition-all duration-300 ease-in-out bg-white pb-10 h-screen`}
        >
          <div
            className="flex flex-col h-full"
            style={{
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {/* <EmbeddedTimeline /> */}
            <div className="sticky top-0 z-10 bg-white py-4 px-6 font-bold text-black flex justify-center">
              POEMS BY THE COMMUNITY
            </div>
            <SideBarPoems />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MobileHeader
