import React, { createContext, useState, useEffect, useContext } from 'react'
import { getUserFromLocalCookie } from '../lib/auth'
import { getIdFromLocalCookie } from '../lib/auth'

let userState

// Create auth context
export const User = createContext({ user: null, loading: false, id: null })

// Create auth provider
export const UserProvider = ({ value, children }) => {
  // Define initial state
    // const [Poem, setPoem2] = useState({
    //   poem:"test",
    //   generatedWords:["test word"]
    // })

  const { user } = value


  useEffect(() => {
    if (!userState && user) {
      userState = user
    }
  }, [])

  // Define login function
  const login = (email, password) => {
    // Perform login logic
    const userData = { email, password }
    setUser(userData)
  }

  // Define logout function
  const logout = () => {
    // Perform logout logic
    setUser(null)
  }

  // Define auth context value
  const authContextValue = {
    user,
    login,
    logout,
  }

  // Return auth context provider with children
  return <User.Provider value={authContextValue}>{children}</User.Provider>
}

export const useUser = () => useContext(User)

export const useFetchUser = () => {
  const [data, setUser] = useState({
    user: userState || null,
    loading: userState === undefined,
    id: userState || null,
  })

  useEffect(() => {
    if (userState !== undefined) {
      return
    }

    let isMounted = true

    const resolveUser = async () => {
      const user = await getUserFromLocalCookie()

      const id = await getIdFromLocalCookie()
      if (isMounted) {
        setUser({ user, loading: false, id })
      }
    }

    resolveUser()

    return () => {
      isMounted = false
    }
  }, [])

  return data
}
