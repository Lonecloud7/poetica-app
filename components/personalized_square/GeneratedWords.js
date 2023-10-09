import React, { useState } from 'react'
import Image from 'next/image'
import Words from '../game/Words'
import { motion } from 'framer-motion'
import BlackButton from '../button/BlackButton'

const GeneratedWords = ({
  generatedWords,
  setTab,
  isWordInPoem,
  allWordsUsed,
  numberOfWords,
  clicked,
  resetPoem
}) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  
  return (
    <div className="bg-indigo-700">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          {/* <div class="container px-5 py-24 mx-auto"> */}
          <div className="flex flex-col text-center w-full">
            <div className="mb-6 mx-auto">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-accent-400">
                <Image
                  src="/assets/icons/dice.png"
                  alt="dice"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <h2 className="max-w-lg mb-6 text-2xl font-normal leading-none tracking-tight text-white sm:text-3xl mx-auto">
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
                <span className="relative">Your</span>
              </span>{' '}
              words are here!
            </h2>

            {/* Error word generation message  */}
            {generatedWords.length != numberOfWords && (
              <p className={` text-md  text-white pb-2`}>
                Sorry, could not generate up to {numberOfWords} words
              </p>
            )}
          </div>
          <motion.ul
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center text-center -m-2 "
          >
            {generatedWords.map((word, i) => {
              const wordUsed = isWordInPoem(word)
              return (
                <motion.li variants={item} className="p-2 w-max" key={i}>
                  <Words text={word} wordUsed={wordUsed} clicked={clicked} />
                </motion.li>
              )
            })}
          </motion.ul>

          <div className="flex flex-wrap justify-center pt-4">
            <BlackButton text={'Generate New Words'} onClick={() => {resetPoem()}} />
          </div>

          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default GeneratedWords
