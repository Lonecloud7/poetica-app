import React, { useEffect, useState, useCallback } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Link from 'next/link'
import LinkButton from '../button/LinkButton'

const CreatePoem = ({
  isPersonalizedSquare,
  personalizedSquareTab,
  publicSquareTab,
  setPoem,
  poem,
  generatedWords,
  filterPoem,
  allWordsUsed,
  remainingTime,
  editForm,
  setEditForm,
  key,
}) => {
  const [timeUp, setTimeUp] = useState(false)

  const handleChange = (e) => {
    setPoem(e.target.value)
  }

  // const formControl = () => {
  //   if (
  //     isPersonalizedSquare ? personalizedSquareTab === 3 : publicSquareTab === 3
  //   ) {
  //     setEditForm(true)
  //     console.log("called");
  //   } else if (timeUp == true) {
  //     setEditForm(false)
  //   }

  // }

  // useEffect(() => {
  //   formControl()
  // }, [formControl, timeUp])

  return (
    <div
      className="bg-indigo-700"
      style={{ flex: '1 1 auto' }}
      id="create-a-poem"
    >
      <div className="container px-5 pt-5 pb-10 mx-auto">
        <div className="flex flex-col items-center text-center w-full mb-4">
          {false ? (
            <h2>STUFF HERE</h2>
          ) : (
            <h1 className="max-w-lg text-2xl font-semibold leading-none tracking-tight text-white sm:text-4xl mx-auto flex flex-col items-center md:block md:relative mb-2 sm:mb-6">
              {timeUp ? 'Time Up' : ' Create a poem in 20 minutes'}
              <span className="md:absolute md:top-0 md:ml-40 mt-4 md:mt-0">
                <CountdownCircleTimer
                  key={key}
                  isPlaying={
                    isPersonalizedSquare
                      ? personalizedSquareTab === 3
                      : publicSquareTab === 3
                  }
                  initialRemainingTime={remainingTime}
                  duration={1200}
                  colors={['#FFFFFF', '#fde047', '#dc2626', '#dc2626']}
                  colorsTime={[1200, 300, 60, 0]}
                  strokeLinecap="butt"
                  size={60}
                  trailColor="#6366f1"
                  strokeWidth={6}
                  onComplete={() => setTimeUp(true)}
                >
                  {({ remainingTime }) => {
                    let minutes = Math.floor(remainingTime / 60)
                    let seconds = remainingTime % 60
                    return (
                      <div className="flex items-center justify-center">
                        <div
                          className="text-white font-normal text-sm"
                          role="timer"
                          aria-live="assertive"
                        >
                          {minutes} : {seconds}
                        </div>
                      </div>
                    )
                  }}
                </CountdownCircleTimer>
              </span>
            </h1>
          )}
        </div>
        <div className="lg:w-2/2 md:w-2/3 mx-auto">
          <div className="">
            {false ? (
              <div className="">
                <div className="bg-indigo-600 text-white py-16">
                  <div className="max-w-2xl mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                      Title of the Poem
                    </h1>
                    <p className="text-lg md:text-2xl leading-relaxed mb-8">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed eleifend, nunc eu bibendum dictum, nisl velit aliquam
                      velit, nec scelerisque sem lectus eu risus. Integer
                      blandit arcu ac ullamcorper tincidunt. Donec vel metus sed
                      lectus blandit dignissim. Mauris fringilla est magna, et
                      tempor arcu mollis ac. Aenean faucibus neque non aliquam
                      sagittis.
                    </p>
                    <p className="text-sm md:text-base font-semibold">
                      - Creator of the Poem
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-2 w-full">
                <div className="relative">
                  {/* <label for="message" className="flex mx-auto text-white">
                  Poem Here
                </label> */}
                  <textarea
                    onChange={
                      timeUp
                        ? () => {}
                        : (e) => {
                            handleChange(e)
                          }
                    }
                    id="message"
                    name="message"
                    value={poem}
                    className={`w-full ${
                      timeUp
                        ? 'bg-red-100 border-red-300 focus:border-red-500 focus:bg-red focus:ring-red-200'
                        : 'bg-gray-100 border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-indigo-200'
                    }  bg-opacity-100 rounded border  focus:border-indigo-500  focus:ring-2  h-80 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                  ></textarea>
                </div>
              </div>
            )}
            <div className="flex justify-center mt-4 mx-auto ">
              <div className="ml-8">
                {isPersonalizedSquare ? (
                  personalizedSquareTab === 3 ? (
                    /* LINK WORKS DEPENDING ON IF WORDS ARE USED IN THE POEM  */
                    <LinkButton
                      allWordsUsed={allWordsUsed}
                      url={'/community-forum'}
                      title={'Community'}
                      subTitle={'SHARE TO'}
                      filterPoem={filterPoem}
                    />
                  ) : (
                    <br />
                  )
                ) : publicSquareTab === 3 ? (
                  <LinkButton
                    allWordsUsed={allWordsUsed}
                    url={'/community-forum'}
                    title={'Community'}
                    subTitle={'SHARE TO'}
                    filterPoem={filterPoem}
                  />
                ) : (
                  <br />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePoem
