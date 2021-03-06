import axios from 'axios'
import NProgress from 'nprogress'
import router from '@/plugins/router'

export const baseURL = 'https://api.themoviedb.org/3/'
export const api_key = '9358e80dc961363e5396315291294f14'

const v3 = axios.create({
  baseURL,
  params: {
    api_key,
    language: 'en-US',
  },
})

// before a request is made start the nprogress
v3.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
v3.interceptors.response.use(
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

export default v3
