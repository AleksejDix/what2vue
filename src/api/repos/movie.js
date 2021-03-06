import api from '@/api/config'

export default {
  show: (id, config = {}) => api.v3.get(`movie/${id}`, config),
}
