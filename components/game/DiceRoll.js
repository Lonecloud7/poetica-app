import React, { useEffect } from 'react'
import Image from 'next/image'

const DiceRoll = ({
  setTab,
  tab = 3,
  title = 'Generating Your Words...',
  hideTitle,
  wordsReady,
}) => {

  // SHOW THE DICE FOR AT LEAST 2 SECONDS THEN CHECK IF THE WORDS ARE READY THEN MOVE TO THE NEXT TAB
  useEffect(() => {
    setTimeout(() => {
      wordsReady && setTab(tab)
    }, 2000)
  }, [setTab, tab, wordsReady])

  return (
    <div className="bg-indigo-700" style={{ flex: '1 1 auto' }}>
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          {/* <div className="container px-5 py-24 mx-auto"> */}
          <div className="flex flex-col text-center items-center w-full">
            {!hideTitle && (
              <div className="mb-6 mx-auto">
                <h2 className="max-w-lg text-2xl font-normal leading-none tracking-tight text-white sm:text-3xl mx-auto">
                  {title}
                </h2>
              </div>
            )}
            <Image
              src="/assets/icons/dice2.gif"
              alt="rolling-dice"
              width={160}
              height={160}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiceRoll
