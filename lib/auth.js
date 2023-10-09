import Router from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'

export const setToken = (data) => {
  if (typeof window === 'undefined') {
    return
  }
  Cookies.set('id', data.user.id)
  Cookies.set('username', data.user.username)
  Cookies.set('jwt', data.jwt)

  console.log('Cookies Set')

  if (Cookies.get('username')) {
    console.log("Redirect user");
    // Router.reload('/')
  }
}

export const unsetToken = (data) => {
  if (typeof window === 'undefined') {
    return
  }
  Cookies.remove('id')
  Cookies.remove('username')
  Cookies.remove('jwt')
  Router.reload('/')
}

export const getUserFromLocalCookie = async () => {
  const jwt = getTokenrFromLocalCookie()
  if (jwt) {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_LIVE_STRAPI_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      })
      return data.username
    } catch (err) {
      console.log("failed request", err)
    }
  }
}
export const getIdFromLocalCookie = () => {
  return Cookies.get('id')
}
export const getTokenrFromLocalCookie = () => {
  return Cookies.get('jwt')
}

export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie || '') {
    return undefined
  }
  const jwtCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('jwt='))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getIdFromServerCookie = (req) => {
  if (!req.headers.cookie || '') {
    return undefined
  }
  const idCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startWith('id='))
  if (!idCookie) {
    return undefined
  }
  //   const id = idCookie.split('=')[1]
  //   return id
}
