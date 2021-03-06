import api from '@/api/config'
export default {
  show: (id, config = {}) => api.v3.get(`/person/${id}`, config),
}
