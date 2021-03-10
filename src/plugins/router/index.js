import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Vue from 'vue'
import routes from './routes.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})
router.beforeEach((to, from, next) => {
  if (from.name !== null) {
    NProgress.start()
  }

  if (to.meta.middleware) {
    return to.meta.middleware({ to, from, next })
  }

  return next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
