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
import Cookies from 'js-cookie'
import Router from 'next/router'

export default function SignUpUnsavedPoems() {
  const [poemUploadData, setPoemUploadData] = useState({
    poem: '',
    generatedWords: [],
  })

  const router = useRouter()
  const { data } = router.query

  // const { user, loading } = useUser()
  const { user, loading, id } = useFetchUser()

  useEffect(() => {
    const unSavedPoem = Cookies.get('unsaved_poem')
    const unSavedGeneratedWordsString = Cookies.get('unsaved_genwords')
    const unSavedGeneratedWordsArray = unSavedGeneratedWordsString.split(',')

    setPoemUploadData({
      poem: unSavedPoem,
      generatedWords: unSavedGeneratedWordsArray,
    })
  }, [])

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

  const googleHandleSubmit = async () => {
    Router.push(
      'https://protected-bayou-52270.herokuapp.com/api/connect/google',
    )
  }

  const handleSubmit = async () => {
    console.log(userAuth)

    console.log('POEM FROM CONTEXT==>>', Poem)

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
          try {
            const jwt = getTokenrFromLocalCookie()
            const id = getIdFromLocalCookie()
            console.log('USER ID', id)
            if (jwt) {
              const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/poems`,
                {
                  data: {
                    poem: poemUploadData.poem,
                    generatedWords: poemUploadData.generatedWords,
                    users_poem_creator: { id: id },
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                  },
                },
              )

              Cookies.remove('unsaved_poem')
              Cookies.remove('unsaved_genwords')

              router.push('/community-forum')

              console.log('poem saved===>>', data)
            }
          } catch (err) {
            console.log('Failed to save poem', err)
          }

          setLoading(false)
        }
        console.log(data)
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

  const logOut = () => {
    unsetToken()
  }
  return (
    <>
      <section className="flex flex-col items-center text-gray-600 body-font">
        <div className="max-w-lg mt-20 text-2xl font-semibold leading-none tracking-tight text-white sm:text-4xl mx-auto flex flex-col items-center md:block md:relative">
          SIGN UP TO SAVE YOUR POEM
        </div>
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
              <label for="email" className="text-base md:text-lg text-gray-600">
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
              onClick={() => {
                handleSubmit()
              }}
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
    </>
  )
}
