import MainLayout from '@/components/layout/MainLayout'
import Button from '@/components/button/BlackButton'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { setToken, unsetToken } from '@/lib/auth'
import { useFetchUser, useUser } from '@/lib/authContext'
import { getTokenrFromLocalCookie, getIdFromLocalCookie } from '@/lib/auth'
import { useRouter } from 'next/router'
import Image from 'next/image'
import CircularProgress from '@mui/material/CircularProgress'
import Router from 'next/router'
import SignUpUnsavedPoemsComponent from '@/lib/SignUpUnsavedUsers'

export default function SignUpUnsavedPoems() {
  const { user, loading, id } = useFetchUser()
  return (
    <MainLayout
      title="Sign Up"
      showHeader={true}
      showFooter={true}
      user={user}
      id={id}
    >
      {loading ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <CircularProgress className="text-white" />
          <h4 className="mt-2 text-indigo-100 font-lg">Loading...</h4>
        </div>
      ) : (
        <SignUpUnsavedPoemsComponent />
      )}
    </MainLayout>
  )
}
