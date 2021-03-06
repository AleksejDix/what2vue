import api from '@/api/config'

export default {
  show: () => api.v3.get(`/account`),
}
