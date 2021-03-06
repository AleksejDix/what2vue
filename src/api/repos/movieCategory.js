import api from '@/api/config'

export default {
  show: (id, config = {}) => {
    const {
      query = {
        page: 1,
      },
    } = config

    return api.v3.get(`movie/${id}`, {
      params: {
        page: query.page,
      },
    })
  },
}
