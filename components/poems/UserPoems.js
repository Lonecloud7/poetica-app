import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Pagination from '../button/Pagination'
import { getTokenFromServerCookie, getTokenrFromLocalCookie } from '@/lib/auth'
import { useFetchUser } from '@/lib/authContext'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'

// export async function getStaticProps() {
//   fetchPoems()
// }

const fetcher = async (url, options = {}) => {
  let res
  if (!options) {
    res = await fetch(url)
  } else res = await fetch(url, options)

  const data = await res.json()
  return data
}
const UserPoems = () => {
  const [pageIndex, setPageIndex] = useState({
    page: 1,
    pageData: {},
  })
  const [Loading, setLoading] = useState(false)
  const [poem, setPoem] = useState([
    {
      id: '',
      userPoem: '',
      createdAt: '',
      generatedWords: [],
      creatorOfPoem: '',
    },
  ])
  const { user, loading } = useFetchUser()

  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = (userPoem, id) => {
    navigator.clipboard.writeText(userPoem)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }
  useEffect(() => {
    const fetchPoems = async () => {
      const jwt = getTokenrFromLocalCookie()
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/poems?sort[0]=id%3Adesc&populate=*`,
          // `https://protected-bayou-52270.herokuapp.com/api/poems?sort[0]=id%3Adesc&populate=*&pagination[page]=${pageIndex.page}&pagination[pageSize]=5`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              'Content-Type': 'application/json',
            },
          },
        )
        if (data) {
          console.log(data)
          setPageIndex((prev) => {
            return { ...prev, pageData: data.meta.pagination }
          })
          const poems = data.data.map(({ id, attributes }) => ({
            id,
            userPoem: attributes.poem,
            createdAt: attributes.createdAt,
            generatedWords: attributes.generatedWords,

            creatorOfPoem:
              attributes.users_poem_creator.data.attributes.username,
          }))
          setPoem(poems)
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchPoems()
  }, [pageIndex.index, pageIndex.page])

  return (
    <>
      {Loading ? (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <CircularProgress className="text-white" />
          <h4 className="mt-2 text-indigo-100 font-lg">Loading Poems...</h4>
        </div>
      ) : (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          {poem.map((poemData, i) => {
            const {
              id,
              userPoem,
              createdAt,
              generatedWords,
              creatorOfPoem,
            } = poemData
            return (
              creatorOfPoem == user && (
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden w-full mt-3"
                  key={id}
                >
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                    <div className="flex items-center">
                      <div className="rounded-full bg-indigo-600 w-8 h-8 flex items-center justify-center">
                        <p className="text-white font-bold">
                          {creatorOfPoem.slice(0, 1).toUpperCase()}
                        </p>
                      </div>
                      <p className="ml-2 font-bold text-gray-800">
                        {creatorOfPoem.toUpperCase()}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {createdAt.slice(0, 10)}
                    </p>
                  </div>
                  <div className="px-4 py-3">
                    <h3 className="text-xl text-black font-bold mb-2">
                      {generatedWords.map((word, i) => {
                        return (
                          <React.Fragment key={i}>
                            {word}
                            {i === generatedWords.length - 1
                              ? null
                              : `${',' + ' '}`}
                          </React.Fragment>
                        )
                      })}
                    </h3>
                    <p className="text-gray-800">{userPoem}</p>
                  </div>
                  <div className="bg-gray-200 px-4 pb-4">
                    <a
                      className="text-gray-600 inline-flex items-center mt-4 hover:cursor-pointer active:text-gray-300"
                      onClick={() => {
                        navigator.clipboard.writeText(userPoem)
                      }}
                    >
                      {isCopied ? 'Copied!' : 'Copy Poem'}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              )
            )
          })}
          {/* {poem.creatorOfPoem == user ? (
            ''
          ) : (
            <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-accent-400">
                  <Image
                    src="/assets/icons/sad-icon.png"
                    alt="Star-struck"
                    width={80}
                    height={80}
                  />
                </div>
              <h2 className="max-w-lg mb-6 text-3xl font-normal leading-none tracking-tight text-white sm:text-4xl mx-auto">
                No Poem Saved....
              </h2>
            </div>
          )} */}

          <Pagination
            currentPage={pageIndex.page}
            totalPages={pageIndex.pageData.pageCount}
            onChangePage={setPageIndex}
          />
        </div>
      )}
    </>
  )
}

// OLD LAYOUT DESIGN INCASE

// {<section className="text-gray-600 body-font overflow-hidden">
// <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
//   <div className="-my-8 divide-y-2 divide-gray-100">
//     {poem.map((poemData, i) => {
//       const {
//         id,
//         userPoem,
//         createdAt,
//         generatedWords,
//         creatorOfPoem,
//       } = poemData
//       return (
//         creatorOfPoem == user && (
//           <div className="py-8 flex flex-col md:flex-wrap" key={id}>
//             {/* <div className="py-8 flex flex-col md:flex-wrap" key={id}> */}
//             <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
//               <span className="text-base text-indigo-100 md:text-lg">
//                 Created on:
//               </span>
//               <span className="text-sm text-indigo-100 md:text-sm">
//                 {createdAt.slice(0, 10)}
//               </span>
//             </div>
//             <div className="md:flex-grow">
//               <h2 className="text-2xl font-medium text-indigo-100 title-font mb-2">
//                 {generatedWords.map((word, i) => {
//                   return (
//                     <React.Fragment key={i}>
//                       {word}
//                       {i === generatedWords.length - 1 ? null : ', '}
//                     </React.Fragment>
//                   )
//                 })}
//               </h2>
//               <p className="leading-relaxed text-base text-indigo-100 md:text-lg">
//                 {/* {creatorOfPoem === user && userPoem} */}
//                 {userPoem}
//               </p>
//               <a
//                 className="text-indigo-100 inline-flex items-center mt-4 hover:cursor-pointer active:text-indigo-300"
//                 onClick={() => {
//                   navigator.clipboard.writeText(userPoem)
//                 }}
//               >
//                 Copy Poem
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-4 h-4 ml-2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
//                   />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         )
//       )
//     })}
//   </div>
//   <Pagination
//     currentPage={pageIndex.page}
//     totalPages={pageIndex.pageData.pageCount}
//     onChangePage={setPageIndex}
//   />
// </div>
// </section>}

export default UserPoems
