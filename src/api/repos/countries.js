import api from '@/api/config'

export default {
  index: (config = {}) => api.v3.get(`/configuration/countries`, config),
}
