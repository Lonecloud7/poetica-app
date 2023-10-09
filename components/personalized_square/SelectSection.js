import React from 'react'
import BlackButton from '../button/BlackButton'

// VALUE IS FOR THE VALUE THAT WOULD BE SENT TO THE API, THE NUMBER OR WORD IS THE STRING THAT WOULD BE DISPLAYED ON THE CLIENT //
const numberofWords = [
  { value: 1, number: 1 },
  { value: 2, number: 2 },
  { value: 3, number: 3 },
  { value: 4, number: 4 },
  { value: 5, number: 5 },
  { value: 6, number: 6 },
  { value: 7, number: 7 },
  { value: 8, number: 8 },
  { value: 9, number: 9 },
  { value: 10, number: 10 },
]


const numberOfLetters = [
  { value: 3, number: 3 },
  { value: 4, number: 4 },
  { value: 5, number: 5 },
  { value: 6, number: 6 },
  { value: 7, number: 7 },
  { value: 8, number: 8 },
  // { value: 9, number: 9 },
  // { value: 10, number: 10 },
  // { value: 11, number: 11 },
  // { value: 12, number: 12 },
  // { value: 13, number: 13 },
  // { value: 14, number: 14 },
  // { value: 15, number: 15 },
]

const categories = [
  { value: 'color', category: 'Color' },
  { value: 'places', category: 'Places' },
  { value: 'object', category: 'Object' },
  { value: 'person', category: 'Person' },
  { value: 'action', category: 'Action' },
  { value: 'plants', category: 'Plants' },
  { value: 'Travel', category: 'Travel' },
  { value: 'Business', category: 'Business' },
  { value: 'Art', category: 'Art' },
  { value: 'Culture', category: 'Culture' },
  { value: 'Religion', category: 'Religion' },
  { value: 'Fashion', category: 'Fashion' },
  { value: 'Science', category: 'Science' },
 
]

const SelectSection = ({
  setTab,
  setNumberOfWords,
  setNumberOfLetters,
  setCategory,
  getWords,
}) => {


  const selectNumberOfWords = (e) => {
    setNumberOfWords(e.target.value)
  }
  const selectNumberOfLetters = (e) => {
    setNumberOfLetters(e.target.value)
  }
  const selectCategory = (e) => {
    setCategory(e.target.value)
  }

  // CHANGES THE STATE TO TAB 2 AND RUNS THE FUNCTION TO GET THE WORDS FROM THE API
  const generateWords = () => {
    getWords()
    setTab(2)
  }

  return (
    <div className="px-2 pb-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 ">
      <div className="flex flex-wrap justify-center text-center -m-2 gap-1 md:gap-4">
        <div className="p-2 flex flex-col">
          <span className="text-white text-sm uppercase tracking-widest">
            Number Of Words
          </span>
          <div className="relative w-max mx-auto mt-2">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded text-lg focus:outline-none focus:bg-white focus:border-gray-500 w-max"
              id="grid-state"
              onChange={selectNumberOfWords}
            >
              {numberofWords.map((numbers, i) => {
                return (
                  <option key={numbers.value} value={numbers.value}>
                    {numbers.number}
                  </option>
                )
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-2 flex flex-col">
          <span className="text-white text-sm uppercase tracking-widest">
            Number Of Letters
          </span>
          <div className="relative w-max mx-auto mt-2">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded text-lg focus:outline-none focus:bg-white focus:border-gray-500 w-max"
              id="grid-state"
              onChange={selectNumberOfLetters}
            >
              {numberOfLetters.map((numbers, i) => {
                return (
                  <option key={numbers.value} value={numbers.value}>
                    {numbers.number}
                  </option>
                )
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-2 flex flex-col">
          <span className=" text-white text-sm uppercase tracking-widest">
            Select A Category
          </span>
          <div className="relative w-max mx-auto mt-2">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded text-lg focus:outline-none focus:bg-white focus:border-gray-500 w-max"
              id="grid-state"
              onChange={selectCategory}
            >
            {/* THE DROPDOWN PICKS THE FIRST ITEM ON THE ARRAY TO BE THE DEFUALT VALUE  */}
              {categories.map((category, i) => {
                return (
                  <option key={i} value={category.value}>
                    {category.category}
                  </option>
                )
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 items-center mt-4">
          <BlackButton text="Play Now" onClick={() => generateWords()} />
        </div>
      </div>
    </div>
  )
}

export default SelectSection
