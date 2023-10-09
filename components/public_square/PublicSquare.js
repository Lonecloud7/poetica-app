import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TodaysWords from './TodaysWords'
import CreatePoem from '../game/CreatePoem'
import EmbeddedTwitter from './EmbeddedTimeline'
import SideBarPoems from '../poems/SideBarPoems'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useFetchUser } from '@/lib/authContext'
import { getTokenrFromLocalCookie } from '@/lib/auth'
import Cookies from 'js-cookie'

function PublicSquare() {
  const router = useRouter()
  const [tab, setTab] = useState(1)

  const [todaysWords, setTodaysWords] = useState([])
  const [wordsReady, setWordsReady] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [poem, setPoem] = useState('')
  const [allWordsUsed, setAllWordsUsed] = useState(false)
  const [editForm, setEditForm] = useState(false)
  //MANAGE TIME COMPONENT IN CREATE PEOM
  const [remainingTime, setRemainingTime] = useState(1200)
  const [key, setKey] = useState(0)
  const jwt = getTokenrFromLocalCookie()
  const { user, loading, id } = useFetchUser()

  // THIS STATE IS SENT TO THE TIMER, WHENEVER THE TIMER = 0 IT RELOAD A NEW SET OF WORDS
  const [generateNewWords, setGenerateNewWords] = useState(false)
  useEffect(() => {
    getWords()
  }, [generateNewWords])

  const getWords = async () => {
    try {
      // SORTING THE DATA FROM THE API IN A DECENDING ORDER WE TAKE ONLY THE LATEST WORDS FOR THE DATE TO DISPLAY
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/todays-words?sort[0]=id%3Adesc&pagination[limit]=1`,
        // `https://api.datamuse.com/words?rel_trg=gender`,
      )
      if (data) {
        // console.log(data);
        setTodaysWords(data.data[0].attributes.todaysWords)
        // setTodaysWords((prev) => {
        //   return prev.filter((word, i) => {
        //     return word.length === 6
        //   })
        // })
        setWordsReady(true)
      }
    } catch (err) {
      console.log('failed', err)
      alert('Failed to Generate Words')
    }
  }

  const filterPoem = async () => {
    const poemWords = poem.split(/[\s,]+/)
    const finalGeneratedWords = todaysWords
    const userID = await id

    const filteredWords = finalGeneratedWords.filter((word, i) => {
      return poemWords.includes(word.toLowerCase())
    })

    if (finalGeneratedWords.every((word) => poemWords.includes(word))) {
      console.log('all words used')
      try {
        if (!jwt) {
          Cookies.set('unsaved_poem', poem)
          Cookies.set('unsaved_genwords', finalGeneratedWords)
          router.push(`/sign-up-unsaved-poems`)
        } else {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/poems`,
            {
              data: {
                poem: poem,
                generatedWords: finalGeneratedWords,
                users_poem_creator: { id: userID },
              },
            },
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
              },
            },
          )
          console.log('SUCCESFULLY ADDED AUTHENTICATED POEM', data)
          router.push('/community-forum')
        }

        setAllWordsUsed(true)
        resetPoem()

        // setEditForm(false)
      } catch (err) {
        console.log(err)
      }
    } else {
      setAllWordsUsed(false)
      setClicked(true)
      console.log('not all words used')
    }
  }

  // RESET POEM BACK TO TAB 1
  const resetPoem = () => {
    setTab(1)
    setPoem('')
    setRemainingTime(remainingTime)
    setKey((prevKey) => prevKey + 1)
  }

  // FUNCTION TO CHECK WHETHER GENERATED WORD WAS USED IN POEM
  const isWordInPoem = (word) => {
    const poemWords = poem.split(/[\s,]+/)
    return poemWords.includes(word.toLowerCase())
  }

  return (
    <>
      <div className="flex flex-wrap md:flex-row min-h-scree text-gray-800">
        <main className="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in pb-10 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key="1"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
            >
              <TodaysWords
                todaysWords={todaysWords}
                tab={tab}
                setTab={setTab}
                getWords={getWords}
                wordsReady={wordsReady}
                setGenerateNewWords={setGenerateNewWords}
                clicked={clicked}
                isWordInPoem={isWordInPoem}
              />
              <CreatePoem
                isPublicSquare={true}
                publicSquareTab={tab}
                poem={poem}
                setPoem={setPoem}
                filterPoem={filterPoem}
                allWordsUsed={allWordsUsed}
                editForm={editForm}
                setEditForm={setEditForm}
                remainingTime={remainingTime}
              />
            </motion.div>
          </AnimatePresence>
        </main>
        <aside
          className="sidebar w-96 md:shadow transform transition-transform duration-150 ease-i bg-white"
          style={{ height: '900px', overflowY: 'scroll', overflowX: 'hidden' }}
        >
          {/* <EmbeddedTwitter /> */}
          <div className="sticky top-0 z-10 bg-white py-4 px-6 font-bold flex justify-center">
            POEMS BY THE COMMUNITY
          </div>
          <SideBarPoems />
        </aside>
      </div>
    </>
  )
}

export default PublicSquare
