import React from 'react'

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  const pageNumbers = []

  // create an array of page numbers for pagination
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center mt-8">
      <nav>
        <ul className="flex">
          {/* display previous button only if not on the first page */}
          {currentPage > 1 && (
            <li>
              <button
                onClick={() =>
                  onChangePage((prev) => {
                    return { ...prev, page: prev.page - 1 }
                  })
                }
                className="px-4 py-2 mx-1 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
              >
                Previous
              </button>
            </li>
          )}

          {/* display page numbers */}
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => {
                  onChangePage((prev) => {
                    return { ...prev, page: number }
                  })
                }}
                className={`px-4 py-2 mx-1 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none ${
                  currentPage === number ? 'bg-gray-300' : ''
                }`}
              >
                {number}
              </button>
            </li>
          ))}

          {/* display next button only if not on the last page */}
          {currentPage < totalPages && (
            <li>
              <button
                onClick={() =>
                  onChangePage((prev) => {
                    return { ...prev, page: prev.page + 1 }
                  })
                }
                className="px-4 py-2 mx-1 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
