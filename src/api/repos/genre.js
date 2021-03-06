import api from '@/api/config'

export default {
  index: (config = {}) => api.v3.get(`/genre/movie/list`, config),
}
