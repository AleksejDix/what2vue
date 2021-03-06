// import axios from 'axios'
import api from '@/api/index'
import v4 from '@/api/config.v4.js'
import v3 from '@/api/config.v3.js'

const state = {
  user: null,
  request_token: null,
  access_token: null,
}

const getters = {
  isLoggedIn: (state) => !!state.user,
  isLoggedOut: (state) => !state.user,
  user: (state) => state.user,
  request_token: (state) => state.request_token,
  access_token: (state) => state.access_token,
}

const actions = {
  async login({ commit }) {
    const response = await api.requestToken.create({
      redirect_to: `${location.protocol}/${location.host}`,
    })

    if (response.success) {
      window.open(
        `https://www.themoviedb.org/auth/access?request_token=${response.request_token}`,
        '_self'
      )
    }
    commit('store_request_token', response.request_token)
  },
  async getAccessToken(context) {
    const response = await api.accessToken.create({
      request_token: context.state.request_token,
    })

    if (!response.access_token) return

    v4.defaults.headers.common = {
      Authorization: `Bearer ${response.access_token}`,
    }

    context.commit('store_access_token', response.access_token)
  },
  async loadProfile(context) {
    const response = await api.account.show()
    context.commit('store_user', response)
  },

  async createSessionForV3(context) {
    const response = await api.session.create({
      access_token: context.state.access_token,
    })

    v3.defaults.params = {
      ...v3.defaults.params,
      session_id: response.session_id,
    }
  },

  async getProfile(context) {
    if (context.state.request_token) {
      await context.dispatch('getAccessToken')
      await context.dispatch('createSessionForV3')
      await context.dispatch('loadProfile')
    }
  },

  async logout(context) {
    await api.accessToken.destroy({
      access_token: context.state.access_token,
    })
    context.commit('logout')
  },
}
const mutations = {
  store_request_token: (state, token) => {
    state.request_token = token
  },
  store_access_token: (state, token) => {
    state.access_token = token
  },
  store_user: (state, user) => {
    state.user = user
  },
  logout: (state) => {
    state.user = null
    state.request_token = null
    state.access_token = null
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
