<template>
  <div class="flex justify-center px-2 lg:justify-start lg:max-w-xs">
    <div class="relative flex-1">
      <div
        v-if="isDropdownVisible"
        class="absolute w-full z-10 left-0 top-0 pt-12 right-0 rounded-md bg-white shadow p-1"
      >
        <ul class="grid gap-1">
          <li v-for="result in results" :key="result.id">
            <router-link
              :to="{
                name: 'cast',
                params: {
                  id: result.id,
                },
              }"
              class="flex gap-3 hover:bg-gray-400 p-2 bg-gray-200 rounded transition-all"
              @click.native="open = false"
            >
              <div v-if="result.poster_path" class="w-1/5">
                <img
                  class="w-32 h-9 object-cover"
                  :src="`https://image.tmdb.org/t/p/w342/${result.poster_path}`"
                />
              </div>
              <div class="flex-1 leading-none">
                <span class="font-medium">
                  {{ result.title }}
                </span>
                <Badge>{{ result.vote_average }}</Badge>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <form autocomplete="off" class="" @submit.prevent>
        <div class="max-w-lg w-full relative">
          <label title="search" class="w-full"
            ><span class="sr-only">Search</span>
            <div class="relative z-20">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                v-model="searchInput"
                class="block w-full pl-10 pr-3 py-2 rounded-md leading-6 bg-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white text-sm transition duration-150 ease-in-out"
                placeholder="Search"
                type="search"
              />
            </div>
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Badge from '@/components/Badge.vue'
import debounce from 'lodash/debounce'

export default {
  components: {
    Badge,
  },
  data() {
    return {
      searchInput: '',
      results: [],
      open: false,
    }
  },
  computed: {
    hasResults() {
      return this.results.length > 0
    },
    isDropdownVisible: {
      get() {
        return this.hasResults && this.open
      },
      set(value) {
        this.open = value
      },
    },
  },
  watch: {
    searchInput(n) {
      if (n.length >= 3) {
        this.search(n)
        this.isDropdownVisible = true
      }
      if (n.length === 0) {
        this.isDropdownVisible = false
      }
    },
  },
  beforeMount() {
    this.search = debounce(this.callSearchApi.bind(this), 1000)
  },
  methods: {
    async callSearchApi(query) {
      const response = await api.searchMulti.index({ query })
      this.results = response.results
      return response
    },
  },
}
</script>
