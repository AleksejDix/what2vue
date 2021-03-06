import api from '@/api/config'
export default {
  index: ({ query } = {}) => {
    return api.v3.get('/search/multi', {
      params: {
        query,
        page: 1,
        include_adult: false,
      },
    })
  },
}
