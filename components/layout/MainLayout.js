import React from 'react'
import Head from 'next/head'
import { Outfit } from 'next/font/google'
import Header from './header/Header'
import MobileHeader from './header/MobileHeader'
import Footer from './footer/Footer'
import { UserProvider } from '@/lib/authContext'
//Outfit Google Font
const outfit = Outfit({ subsets: ['latin'] })

const Layout = ({
  children,
  user,
  loading = false,
  title,
  desc,
  showHeader,
  showFooter,
  timer,
}) => {
  return (
    <UserProvider value={{ user, loading }}>
      <Head>
        <title>{title ? `${title} | Poem Game` : 'Poem Game'}</title>
        <meta
          name="description"
          content={desc ? `${desc}` : 'Poem Game PWA - Play Now'}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        className={`${outfit.className} bg-indigo-700`}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          maxWidth: '100vw',
          overflowX: 'hidden',
        }}
      >
        {showHeader && <Header timer={timer} />}
        {showHeader && <MobileHeader timer={timer} />}
        {children}
        {showFooter && <Footer />}
      </main>
    </UserProvider>
  )
}

export default Layout
