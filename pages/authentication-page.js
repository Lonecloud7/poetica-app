import React from 'react'
import GoogleAuth from '@/lib/GoogleAuth'
import { CircularProgress } from '@mui/material'
import MainLayout from '@/components/layout/MainLayout'
import { useFetchUser } from '@/lib/authContext'

const AuthenticationPage = () => {
    const { user, loading, id } = useFetchUser()
  return (
    <MainLayout
    title="Google Authentication"
      showHeader={true}
      showFooter={true}
      user={user}
      id={id}
    >
        {loading ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <CircularProgress className="text-white" />
          <h4 className="mt-2 text-indigo-100 font-lg">Loading poems ...</h4>
        </div>
      ) : (
        <GoogleAuth />
      )}
    </MainLayout>
    
  )
}

export default AuthenticationPage