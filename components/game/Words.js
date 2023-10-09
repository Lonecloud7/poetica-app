import React from 'react'

function Words({ text, wordUsed, clicked = false}) {
  return (
    <>
      {clicked ? (
        <div
          className={`${
            wordUsed ? 'border-green-600' : 'border-red-600'
          } text-lg inline-flex items-center text-white  border-2  py-2 px-4 focus:outline-none rounded w-max`}
        >
          {text}
        </div>
      ) : (
        <div
          className={`border-white-600 text-lg inline-flex items-center text-white  border-2  py-2 px-4 focus:outline-none rounded w-max`}
        >
          {text}
        </div>
      )}
    </>
  )
}

export default Words
