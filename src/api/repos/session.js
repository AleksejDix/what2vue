import api from '@/api/config'

export default {
  create: (payload) =>
    api.v3.post(`/authentication/session/convert/4`, payload),
}
