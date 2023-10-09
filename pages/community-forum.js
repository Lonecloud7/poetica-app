import React, { useState, useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'
import CommunityPoems from '@/components/poems/CommunityPoems'
import { useFetchUser } from '@/lib/authContext'
import { CircularProgress } from '@mui/material'

const CommunityForum = () => {
  const { user, loading } = useFetchUser()
  return (
    <MainLayout title="Community forum" showHeader={true} showFooter={true}>
      {loading ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <CircularProgress className="text-indigo-100" />
          <h4 className="mt-2 text-indigo-100 font-lg">Loading...</h4>
        </div>
      ) : (
        <div className="bg-indigo-700" style={{ flex: '1 1 auto' }}>
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
              <div className="flex flex-col mb-16 text-center sm:mb-0">
                <div className="container px-5 py-24 mx-auto flex items-center md:flex-row flex-col">
                  <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                    <span className="relative inline-block">
                      <svg
                        viewBox="0 0 52 24"
                        fill="currentColor"
                        className="absolute top-0 left-0 z-0 text-white hidden w-32 -mt-8 -ml-20 text-deep-purple-accent-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                      >
                        <defs>
                          <pattern
                            id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                            x="0"
                            y="0"
                            width=".135"
                            height=".30"
                          >
                            <circle cx="1" cy="1" r=".7" />
                          </pattern>
                        </defs>
                        <rect
                          fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                          width="52"
                          height="24"
                        />
                      </svg>
                      <h2 className="text-xs text-white tracking-widest font-medium font-sans mb-1">
                        <span className="relative">POEM GAME</span>
                      </h2>
                    </span>

                    <h1 className="md:text-3xl text-2xl text-white font-medium title-font text-gray-900">
                      Visit our community!
                    </h1>
                  </div>
                  <div className="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
                    <Link href={'https://twitter.com/?lang=en'} target="_blank">
                      <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none text-indigo-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                        <span className="ml-4 flex items-start flex-col leading-none">
                          <span className="title-font font-medium">
                            Twitter
                          </span>
                        </span>
                      </button>
                    </Link>
                    <Link href={'https://www.instagram.com/'} target="_blank">
                      <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none text-indigo-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span className="ml-4 flex items-start flex-col leading-none">
                          <span className="title-font font-medium">
                            Instagram
                          </span>
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <CommunityPoems />
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default CommunityForum
