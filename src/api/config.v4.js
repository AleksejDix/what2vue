import axios from 'axios'
import NProgress from 'nprogress'
import router from '@/plugins/router'

export const baseURL = 'https://api.themoviedb.org/4/'
export const api_key = '9358e80dc961363e5396315291294f14'
export const Bearer = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzU4ZTgwZGM5NjEzNjNlNTM5NjMxNTI5MTI5NGYxNCIsInN1YiI6IjU5MGExYzI0YzNhMzY4NDMzNDAwMzdhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTm_Ne_OZbhXHsXklJlV76IPoJ3aoqE3M5D0VIT4caM`

const v4 = axios.create({
  baseURL,
  params: {
    api_key,
    language: 'en-US',
  },
})

// before a request is made start the nprogress
v4.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
v4.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response.data
  },
  (error) => {
    // redirect to 404
    if (error.response.status === 404) {
      router.push({ name: 404 })
      return
    }
    // Do something with response error
    return Promise.reject(error)
  }
)

export default v4
