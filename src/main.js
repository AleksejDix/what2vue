import Vue from 'vue'
import router from '@/plugins/router'
import store from '@/plugins/vuex'
import '@/plugins/composition-api'
import '@/plugins/portal'
import '@/directives'
import '@/assets/css/index.css'
import App from '@/App'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
