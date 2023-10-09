import React from 'react'
import { useState, useEffect } from 'react'

// COUNTDOWN TILL END OF THE DAY
const now = Date.now()
const nowInSeconds = Math.floor(now / 1000)

const endOfDay = new Date()
endOfDay.setHours(23, 59, 59, 999)
const endOfDayInSeconds = Math.floor(endOfDay.getTime() / 1000)

const secondsRemaining = endOfDayInSeconds - nowInSeconds

const PublicTimer = ({ seconds = secondsRemaining, setGenerateNewWords, addInNewWords }) => {
  const [countDownSeconds, setCountDownSeconds] = useState(secondsRemaining)

  useEffect(() => {
    if (countDownSeconds > 0) {
      const timer = setInterval(
        () => setCountDownSeconds(countDownSeconds - 1),
        1000,
      )
      setGenerateNewWords(false)
      return () => clearInterval(timer)
    } else {
      addInNewWords()
      setGenerateNewWords(true)
      setCountDownSeconds(secondsRemaining)
    }
  }, [addInNewWords, countDownSeconds, setGenerateNewWords])

  return (
    <div
      className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-5 lg:px-2"
      id="todays-words"
    >
      <div className="flex flex-col text-center text-white w-full">
        <div className="mx-auto">
          <span className="countdown text-3xl">
            <span
              style={{ '--value': Math.floor(countDownSeconds / 3600) }}
            ></span>
            :
            <span
              style={{ '--value': Math.floor((countDownSeconds / 60) % 60) }}
            ></span>
            :<span style={{ '--value': countDownSeconds % 60 }}></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default PublicTimer
