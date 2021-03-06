import api from '@/api/config'

export default {
  index: (config = {}) => {
    const { query } = config
    const { sort_by, sort_order, page = 1, with_genres } = query

    const params = {
      sort_by: `${sort_by}.${sort_order}`,
      page,
      with_genres,
    }

    return api.v3.get(`discover/movie`, {
      params,
    })
  },
}
