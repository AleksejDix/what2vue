import api from '@/api/config'

const resource = '/your/'

export default {
  index: (config = {}) => api.v3.get(resource, config),
  store: (payload, config = {}) => api.v3.post(resource, payload, config),
  show: (id, config = {}) => api.v3.get(resource + id, config),
  update: (payload, config = {}) => api.v3.put(resource, payload, config),
  destroy: (id, config = {}) => api.v3.delete(resource + id, config),
}
