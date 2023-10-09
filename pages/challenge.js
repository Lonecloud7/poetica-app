import MainLayout from '@/components/layout/MainLayout'
import PersonalizedSquare from '@/components/personalized_square/PersonalizedSquare'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFetchUser } from '@/lib/authContext'
import { CircularProgress } from '@mui/material'

export default function Home() {
  const { user, loading, id } = useFetchUser()
  const router = useRouter()

  // useEffect(() => {
  //   if (loading) {
  //     return
  //   }
  //   if (!user) {
  //     router.push('/sign-in')
  //   }
  // }, [loading, router, user])

  return (
    <MainLayout
      title="Play now, Challenge"
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
        <PersonalizedSquare />
      )}
    </MainLayout>
  )
}
