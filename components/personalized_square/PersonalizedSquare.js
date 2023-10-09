import React, { useState, useEffect, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DiceRoll from '../game/DiceRoll'
import CreatePoem from '../game/CreatePoem'
import GeneratedWords from './GeneratedWords'
import SelectSection from './SelectSection'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getTokenrFromLocalCookie } from '@/lib/auth'
import { useFetchUser } from '@/lib/authContext'
import Cookies from 'js-cookie'

const PersonalizedSquare = () => {
  const router = useRouter()
  const [tab, setTab] = useState(1)
  const [numberOfWords, setNumberOfWords] = useState(1)
  const [numberOfLetters, setNumberOfLetters] = useState(3)
  const [category, setCategory] = useState('color')

  const [generatedWords, setGeneratedWords] = useState([])
  const [wordsReady, setWordsReady] = useState(false)
  const [poem, setPoem] = useState('')
  const [allWordsUsed, setAllWordsUsed] = useState(false)
  const [editForm, setEditForm] = useState(false)
  const [clicked, setClicked] = useState(false)

  const [remainingTime, setRemainingTime] = useState(1200)
  const [key, setKey] = useState(0)
  const jwt = getTokenrFromLocalCookie()
  const { user, loading, id } = useFetchUser()

  // const apiKey = '51505fea-ef69-4653-9c6f-0833246d48e1'

  const apiKey = 'e70a82e7-b1c4-42d1-b563-4a272f1d8c58'

  // API THAT RETURNS LIST OF WORDS BASED ON CATEGORY INPUTTED
  const options = {
    method: 'GET',
    url: `https://api.wordassociations.net/associations/v1.0/json/search?apikey=${apiKey}&text=${category}&lang=en&limit=300`,
  }

  const getWords = async () => {
    try {
      const { data } = await axios.request(options)

      if (data) {
        const items = data.response[0].items
        // EXTRACT THE WORDS FROM THE 300 OBJECTS WITHIN THE ARRAY
        const apiWords = items.map((item) => item.item)
        // console.log("API WORDS ARRAY==>>",apiWords);
        setGeneratedWords(apiWords)
        // HERE I FILTER AND REMOVE WORDS THAT HAVE A SPACE AND THEN FILTER ACCORDING TO THE NUMBER OF LETTERS PARAMETERS
        setGeneratedWords((prev) => {
          return prev.filter((word, i) => {
            return !word.includes(' ') && word.length == numberOfLetters
          })
        })

        //STATE THAT LET'S OTHER COMPONENTS KNOW THE WORDS ARE READY
        setWordsReady(true)
      } else {
        alert('Failed TimeOut!!')
      }
    } catch (err) {
      console.log(err)
      alert('Failed to Generate Words')
    }
    console.log(numberOfWords, numberOfLetters, category)
  }

  const filterPoem = async () => {
    const poemWords = poem.split(/[\s,]+/)
    const finalGeneratedWords = generatedWords.slice(0, numberOfWords)
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

          // console.log('SUCCESFULLY ADDED POEM', data)
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
        setPoem('')
        setTab(1)
        setRemainingTime(1200)
        setKey((prevKey) => prevKey + 1)

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
    setCategory('color')
    setNumberOfWords(1)
    setNumberOfLetters(3)
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

  // console.log(generatedWords.slice(0, numberOfWords))
  return (
    <div className="py-10">
      <AnimatePresence mode="wait">
      {/* DEPENDING ON THE VALUE IN THE tab STATE THIS ANIMATION DEPENDENCY DISPLAYS A COMPONENT  */}
        {tab === 1 && (
          <motion.div
            key="1"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <SelectSection
              setTab={setTab}
              setNumberOfWords={setNumberOfWords}
              setNumberOfLetters={setNumberOfLetters}
              setCategory={setCategory}
              getWords={getWords}
            />
          </motion.div>
        )}
        {tab === 2 && (
          <motion.div
            key="2"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <DiceRoll setTab={setTab} wordsReady={wordsReady} />
          </motion.div>
        )}
        {tab === 3 && (
          <motion.div
            key="3"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <GeneratedWords
              // THE NUMBER OF WORDS PARAMETER IS APPLLIED TO THE GENERATED WORDS BEFORE THEY ARE DISPLAYED
              generatedWords={generatedWords.slice(0, numberOfWords)}
              numberOfWords={numberOfWords}
              setTab={setTab}
              category={category}
              wordsReady={wordsReady}
              isWordInPoem={isWordInPoem}
              allWordsUsed={allWordsUsed}
              clicked={clicked}
              resetPoem={resetPoem}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <CreatePoem
        setTab={setTab}
        isPersonalizedSquare={true}
        personalizedSquareTab={tab}
        generatedWords={generatedWords}
        poem={poem}
        setPoem={setPoem}
        filterPoem={filterPoem}
        allWordsUsed={allWordsUsed}
        editForm={editForm}
        setEditForm={setEditForm}
        remainingTime={remainingTime}
        key={key}
      />
    </div>
  )
}

export default PersonalizedSquare
