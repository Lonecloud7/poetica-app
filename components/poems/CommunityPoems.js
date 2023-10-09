import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Pagination from '@/components/button/Pagination'
import CircularProgress from '@mui/material/CircularProgress'

const CommunityPoems = () => {
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

  useEffect(() => {
    const fetchPoems = async () => {
      // const jwt = getTokenrFromLocalCookie()
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/poems?sort[0]=id%3Adesc&populate=*&pagination[page]=${pageIndex.page}&pagination[pageSize]=10`,
        )
        if (data) {
          console.log('DATA FROM API COMMUNITY', data)
          setPageIndex((prev) => {
            return { ...prev, pageData: data.meta.pagination }
          })
          const poems = data.data.map(({ id, attributes }) => ({
            id,
            userPoem: attributes.poem,
            createdAt: attributes.createdAt,
            generatedWords: attributes.generatedWords,
            creatorOfPoem:
              attributes.users_poem_creator?.data?.attributes?.username ||
              '',
          }))
          setPoem(poems)
          setLoading(false)
          return data
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
          <h4 className="mt-2 text-indigo-100 font-lg">Loading poems ...</h4>
        </div>
      ) : (
        <div className="">
          {poem.map((poemData, i) => {
            const {
              id,
              userPoem,
              createdAt,
              generatedWords,
              creatorOfPoem,
            } = poemData
            return (
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
                {/* <div className="bg-gray-200 px-4 py-2">
                  <a
                    className="text-gray-600 inline-flex items-center mt-4 hover:cursor-pointer active:text-gray-300"
                    onClick={() => {
                      navigator.clipboard.writeText(userPoem)
                    }}
                  >
                    Copy Poem
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
                </div> */}
              </div>
            )
          })}
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

export default CommunityPoems
