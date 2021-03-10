import vuexStore from '../plugins/vuex'
import router from '../plugins/router/index'

export default function auth({ next }) {
  if (vuexStore.getters.isLoggedOut) {
    return router.push({ name: 'home' })
  }

  return next()
}
