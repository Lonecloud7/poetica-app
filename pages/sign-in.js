import MainLayout from '@/components/layout/MainLayout'
import Button from '@/components/button/BlackButton'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { setToken, unsetToken } from '@/lib/auth'
import { useUser } from '@/lib/authContext'
import Image from 'next/image'
import CircularProgress from '@mui/material/CircularProgress'
import Router from 'next/router'

export default function SignIn() {
  const { user, loading } = useUser()
  const [formValid, setFormValid] = useState(false)
  const [userAuth, setUserAuth] = useState({
    identifier: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [Loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserAuth((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const validateForm = () => {
    const { identifier, password } = userAuth
    const usernameIsValid = identifier.length > 0
    const passwordIsValid = password.length > 0
    setFormValid(usernameIsValid && passwordIsValid)

    if (!usernameIsValid) {
      setError('Please enter a username')
      setLoading(false)
    } else if (!passwordIsValid) {
      setError('Please enter a password')
    } else {
      setError('')
    }
  }

  const handleSubmit = async () => {
    validateForm()
    if (formValid) {
      try {
        setLoading(true)
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/auth/local`,
          {
            identifier: userAuth.identifier,
            password: userAuth.password,
          },
        )
        if (data) {
          setToken(data)
          Router.push('/challenge')
          setLoading(false)
        }
      } catch (err) {
        console.log('failed to login', err)
        // setError("Invalid Username or Password")
        if ((err.response.status = 400)) {
          setError('Invalid Username or Password')
        } else {
          setError(err.message)
        }

        setLoading(false)
        // setError(err)
      }
    } else {
      return
    }
  }
  const googleHandleSubmit = async () => {
    // validateForm()
    
    Router.push("https://protected-bayou-52270.herokuapp.com/api/connect/google")
    
      // try {
      //   // setLoading(true)
      //   const { data } = await axios.get(
      //     `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/strapi-google-auth/init`,
      //     // {
      //     //   identifier: userAuth.identifier,
      //     //   password: userAuth.password,
      //     // },
      //   )
      //   if (data) {
      //     console.log(data);
      //     // setToken(data)
      //     // Router.push('/personalized-square')
      //     // setLoading(false)
      //   }
      // } catch (err) {
      //   console.log('failed to login', err)
      //   // setError("Invalid Username or Password")
      //   // if ((err.response.status = 400)) {
      //   //   setError('Invalid Username or Password')
      //   // } else {
      //   //   setError(err.message)
      //   // }

      //   // setLoading(false)
      //   // setError(err)
      // }
    
  }

  return (
    <MainLayout
      title="Play now, Personalized square"
      showHeader={true}
      showFooter={true}
    >
      {loading ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <CircularProgress className="text-white" />
          <h4 className="mt-2 text-indigo-100 font-lg">Loading...</h4>
        </div>
      ) : (
        <section className="flex items center text-gray-600 body-font">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="  bg-gray-100 rounded-lg p-8 flex flex-col ">
              <h2 className="max-w-lg mb-6 text-3xl font-normal  text-gray-900 sm:text-4xl  ">
                Sign In
              </h2>

              <div className="relative mb-4 flex justify-center">
                {error && <span>{error}</span>}
              </div>
              <div className="relative mb-4">
                <label
                  for="full-name"
                  className="text-base md:text-lg text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={userAuth.identifier}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  for="password"
                  className="text-base md:text-lg  text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userAuth.password}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                onClick={handleSubmit}
                // disabled={!formValid}
                className={
                  'text-white bg-indigo-500 border-0 py-2 px-8 mt-2  focus:outline-none hover:bg-indigo-600 rounded text-lg flex items-center justify-center '
                }
              >
                {Loading ? (
                  <CircularProgress className="text-white" size={28} />
                ) : (
                  'Submit'
                )}
              </button>
              <button
                onClick={googleHandleSubmit}
                // disabled={!formValid}
                className={
                  'text-white bg-indigo-500 border-0 py-2 px-8 mt-2  focus:outline-none hover:bg-indigo-600 rounded text-lg flex items-center justify-center '
                }
              >
                <Image
                  src="/assets/icons/google-icon2.png"
                  alt="rolling-dice"
                  width={35}
                  height={35}
                />
                Google
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="mr-5 text-indigo-400">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  )
}
