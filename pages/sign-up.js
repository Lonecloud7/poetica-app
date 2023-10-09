import MainLayout from '@/components/layout/MainLayout'
import Button from '@/components/button/BlackButton'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { setToken, unsetToken } from '@/lib/auth'
import { useFetchUser, useUser } from '@/lib/authContext'
import router from 'next/router'
import Image from 'next/image'
import CircularProgress from '@mui/material/CircularProgress'
import Router from 'next/router'

export default function SignUp() {
  // const { user, loading } = useUser()
  const { user, loading } = useFetchUser()
  const [userAuth, setUserAuth] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [formValid, setFormValid] = useState(false)
  const [error, setError] = useState('')
  const [Loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserAuth((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const validateForm = () => {
    const { username, email, password } = userAuth
    const emailRegex = /^\S+@\S+\.\S+$/
    const usernameIsValid = username.length > 0
    const emailIsValid = emailRegex.test(email)
    const passwordIsValid = password.length > 0
    setFormValid(usernameIsValid && emailIsValid && passwordIsValid)

    if (!usernameIsValid) {
      setError('Please enter a username')
    } else if (!emailIsValid) {
      setError('Please enter a Valid email address')
    } else if (!passwordIsValid) {
      setError('Please enter a password')
    } else {
      setError('')
    }
  }

  const handleSubmit = async () => {
    console.log(userAuth)

    validateForm()
    if (formValid) {
      try {
        setLoading(true)
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/auth/local/register`,
          {
            username: userAuth.username,
            email: userAuth.email,
            password: userAuth.password,
          },
        )
        if (data) {
          setToken(data)
          setLoading(false)
          router.redirect('/challenge')
        }
        console.log(res)
      } catch (err) {
        console.log('failed to login', err)
        // setError("Invalid Username or Password")
        setError('Registration Failed')

        setLoading(false)
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

  const logOut = () => {
    unsetToken()
  }
  return (
    <MainLayout
      title="Sign Up"
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
                Sign Up
              </h2>
              <div className="relative mb-4 flex justify-center">
                {error && <span>{error}</span>}
              </div>
              <div className="relative mb-4">
                <label
                  for="username"
                  className="text-base md:text-lg text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userAuth.username}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  for="email"
                  className="text-base md:text-lg text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userAuth.email}
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
                Already have an account?{' '}
                <Link href="/sign-in" className="mr-5 text-indigo-400">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  )
}
