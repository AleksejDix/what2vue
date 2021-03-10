import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import auth from './modules/auth'

const vuexPersist = new VuexPersist({
  key: 'favorites',
  storage: localStorage,
})

Vue.use(Vuex)

const store = 'STORE_FAVORITE'
const destroy = 'DESTROY_FAVORITE'

const withID = (id) => (x) => x.id === id
const wihtoutID = (id) => (x) => x.id !== id

const vuexStore = new Vuex.Store({
  strict: true,
  plugins: [vuexPersist.plugin],
  modules: {
    auth,
  },
  state: {
    favorites: [],
  },
  getters: {
    index: (state) => state.favorites.length,
    favorites: (state) => state.favorites,
    show: (state) => (id) => {
      return state.favorites.find(withID(id))
    },
  },
  mutations: {
    [store]: (state, payload) => state.favorites.push(payload),
    [destroy]: (state, id) => {
      state.favorites = state.favorites.filter(wihtoutID(id))
    },
  },
  actions: {
    [store]: ({ commit }, payload) => commit(store, payload),
    [destroy]: ({ commit }, payload) => commit(destroy, payload),
  },
})

export default vuexStore
