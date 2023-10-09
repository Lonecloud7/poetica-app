import React from 'react'
import Link from 'next/link'

function Button({ text, link = "", onClick }) {
  if (!onClick) onClick = () => console.log('no onClick function passed')
  return (
    <Link href={link}>
      <button
        onClick={() => onClick()}
        className="inline-flex items-center text-white bg-indigo-600 hover:bg-indigo-700 border-0 py-2 px-8 focus:outline-none rounded text-lg drop-shadow-md hover:drop-shadow-lg w-max"
      >
        {text}
      </button>
    </Link>
  )
}

export default Button
