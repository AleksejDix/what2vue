import api from '@/api/config'
import { Bearer } from '@/api/config.v4'

export default {
  create: (payload) =>
    api.v4.post(`/auth/access_token`, payload, {
      headers: {
        common: {
          Authorization: `Bearer ${Bearer}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    }),
  destroy: (payload) => {
    return api.v4.delete(
      `/auth/access_token`,
      { data: payload },
      {
        headers: {
          common: {
            Authorization: `Bearer ${Bearer}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      }
    )
  },
}
