import MainLayout from '@/components/layout/MainLayout';
import UserPoemsComponent from '@/components/poems/UserPoems';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFetchUser } from '@/lib/authContext';
import { CircularProgress } from '@mui/material';

export default function UserPoems() {
  const { user, loading } = useFetchUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.push('/sign-in');
    }
  }, [loading, router, user]);

  return (
    <MainLayout
      title='Play now, Personalized square'
      showHeader={true}
      showFooter={true}
      user={user}
    >
      {loading ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <CircularProgress className="text-white" />
          <h4 className="mt-2 text-indigo-100 font-lg">Loading poems ...</h4>
        </div>
      ) : (
        <UserPoemsComponent />
      )}
    </MainLayout>
  );
}
