import React, { useState } from 'react'
import Image from 'next/image'
import Words from '../game/Words'
import { motion, AnimatePresence } from 'framer-motion'
import PublicTimer from '../game/PublicTimer'
import CasinoIcon from '@mui/icons-material/Casino'
import DiceRoll from '../game/DiceRoll'
import axios from 'axios'

const TodaysWords = ({
  todaysWords,
  tab,
  setTab,
  getWords,
  wordsReady,
  setGenerateNewWords,
  clicked,
  isWordInPoem,
}) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }


  const addInNewWords = async () => {
    try {
      const { data } = await axios.get(
        `https://random-word-api.herokuapp.com/word?number=500`,
        // `https://api.datamuse.com/words?rel_trg=gender`,
      )

      if (data) {
        const filteredWords = await data
          .filter((word) => {
            return word.length === 6
          })
          .slice(0, 6)

        // console.log('filtered DATA', filteredWords)
        
        const { res } = await axios.post(
          `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/todays-words`,
          {
            data: { todaysWords: filteredWords },
          },
        )

        console.log('Words added', data)
      } else {
        console.log('someting wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-indigo-700" id="todays-words">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-5 lg:px-2 py-3">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          {/* <div class="container px-5 py-24 mx-auto"> */}
          <div className="flex flex-col text-center w-full mb-4">
            <div className="mt-2 mb-4 sm:mt-0 sm:mb-6 mx-auto">
              <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-teal-accent-400">
                <Image
                  // src="/assets/icons/dice3.gif"
                  src="/assets/icons/chat.png"
                  alt="public"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <h3
              className="max-w-lg text-2xl font-normal leading-none tracking-tight text-white sm:text-3xl mx-auto
             "
            >
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-deep-purple-accent-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                    width="52"
                    height="24"
                  />
                </svg>
                <PublicTimer
                  seconds={3}
                  addInNewWords={addInNewWords}
                  setGenerateNewWords={setGenerateNewWords}
                />
              </span>{' '}
              <hr className="my-2" /> Today&apos;s words
            </h3>
          </div>
          <AnimatePresence mode="wait">
            {tab === 1 && (
              <motion.div
                key="1"
                className="w-full flex"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
              >
                <CasinoIcon
                  onClick={() => setTab(2)}
                  className="text-white mx-auto cursor-pointer animate-bounce mt-6"
                  style={{ fontSize: 60 }}
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
                <DiceRoll
                  setTab={setTab}
                  hideTitle={true}
                  wordsReady={wordsReady}
                />
              </motion.div>
            )}
            {tab === 3 && (
              <motion.ul
                key="3"
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center text-center -m-2 "
              >
                {todaysWords.map((word, i) => {
                  const wordUsed = isWordInPoem(word)
                  return (
                    <motion.li variants={item} className="p-2 w-max" key={i}>
                      <Words
                        text={word}
                        clicked={clicked}
                        wordUsed={wordUsed}
                      />
                    </motion.li>
                  )
                })}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default TodaysWords
