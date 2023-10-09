import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { setToken } from './auth'
import { getTokenrFromLocalCookie, getIdFromLocalCookie } from '@/lib/auth'
import Router from 'next/router'
import Cookies from 'js-cookie'

const GoogleAuth = () => {
  const [loading, setLoading] = useState(false)
  const { asPath, pathname } = useRouter()
  const router = useRouter()
  // const [poemUploadData, setPoemUploadData] = useState({
  //   poem: undefined,
  //   generatedWords: [],
  // })

  // useEffect(() => {
  //   if (data) {
  //     const decodedObjectString = decodeURIComponent(data)
  //     const myObjectParsed = JSON.parse(decodedObjectString)

  //     const { poem, finalGeneratedWords } = myObjectParsed
  //     setPoemUploadData({ poem: poem, generatedWords: finalGeneratedWords })
  //   }
  // }, [])
  // useEffect(() => {
  //   const unSavedPoem = Cookies.get('unsaved_poem')
  //   const unSavedGeneratedWordsString = Cookies.get('unsaved_genwords')
  //   const unSavedGeneratedWordsArray = unSavedGeneratedWordsString.split(',')

  //   console.log(unSavedGeneratedWordsArray)
  // }, [])

  useEffect(() => {
    setLoading(true)
    const cleanedUrl = asPath.replace('/authentication-page', '')
    // console.log("URL++>>", asPath);
    const getUserToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/auth/google/callback${cleanedUrl}`,
        )
        // console.log('user data', data)
        if (data) {
          setToken(data)

          try {
            const jwt = getTokenrFromLocalCookie()
            const id = getIdFromLocalCookie()
            const unSavedPoem = Cookies.get('unsaved_poem')
            const unSavedGeneratedWordsString = Cookies.get('unsaved_genwords')
            const unSavedGeneratedWordsArray = unSavedGeneratedWordsString.split(
              ',',
            )
            if (unSavedPoem) {
              try {
                const { data } = await axios.post(
                  `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/poems`,
                  {
                    data: {
                      poem: unSavedPoem,
                      generatedWords: unSavedGeneratedWordsArray,
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
                console.log('Poem Saved ==>>', data)
                router.push('/community-forum')
                setLoading(false)
              } catch (err) {
                console.log(err)
                setLoading(false)
                router.push('/')
              }

              console.log('poem saved===>>', data)
            } else {
              router.push('/challenge')

              console.log('poem not saved===>>', data)
              setLoading(false)
            }
          } catch (err) {
            console.log('Failed to save poem', err)
            setLoading(false)
          }
        }
      } catch (err) {
        // console.log(err)
        setLoading(false)
      }
    }
    getUserToken()
  }, [])

  return (
    <div>
      {loading && (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <CircularProgress className="text-white" />
          <h4 className="mt-2 text-indigo-100 font-lg">Loading poems...</h4>
        </div>
      )}
    </div>
  )
}

export default GoogleAuth
