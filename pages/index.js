import MainLayout from '@/components/layout/MainLayout';
import PublicSquare from '@/components/public_square/PublicSquare';
import { useFetchUser } from '@/lib/authContext';
import { CircularProgress } from '@mui/material';
export default function Home() {
  const {user, loading} = useFetchUser()
  return (
    <MainLayout
      title='Play now, Poem of Day'
      showHeader={true}
      showFooter={true}
      timer={true}
      user={user}
    >
      <main flex={{ flex: '1 1 auto' }}>
        {loading ? <div className="h-full w-full flex flex-col justify-center items-center">
              <CircularProgress className="text-white" />
              <h4 className="mt-2 text-indigo-100 font-lg">
                Loading...
              </h4>
            </div> : <PublicSquare />}
      </main>
    </MainLayout>
  );
}
