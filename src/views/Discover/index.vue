<template>
  <section class="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-2">
    <portal to="title">{{ $route.name }}</portal>
    <header class="flex justify-between">
      <div class="flex justify-between">
        <h2 class="uppercase font-bold">{{ $route.name }} • {{ total }}</h2>
      </div>
    </header>
    <div class="px-2">
      <form class="flex gap-2" @submit.prevent="submit">
        <label v-if="genres_options.length > 0" class="block">
          <span class="text-gray-700">Genre</span>
          <select
            v-model="with_genres"
            name="with_genres"
            class="form-select block w-full mt-1"
          >
            <option disabled value="">select genre</option>
            <option
              v-for="option in genres_options"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </option>
          </select>
        </label>

        <label class="block">
          <span class="text-gray-700">Sort by</span>
          <select
            v-model="sort_by"
            name="sort_by"
            class="form-select block w-full mt-1"
          >
            <option
              v-for="option in sort_options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.name }}
            </option>
          </select>
        </label>

        <label class="block">
          <span class="text-gray-700">Order</span>
          <select
            v-model="sort_order"
            name="sort_by"
            class="form-select block w-full mt-1"
          >
            <option
              v-for="option in sort_order_options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.name }}
            </option>
          </select>
        </label>

        <button class="hidden">send</button>
      </form>
    </div>
    <div v-if="hasMovies">
      <MovieList :list="movies" />
      <IntersectionObserver
        :options="{ rootMargin: '300px' }"
        @intersect="nextPage"
      />
    </div>
  </section>
</template>

<script>
import api from '@/api'
import MovieList from '@/components/MovieList'
import IntersectionObserver from '@/components/IntersectionObserver'

export default {
  components: { MovieList, IntersectionObserver },
  data() {
    return {
      total: 0,
      movies: [],
      page: +this.$route.query.page || 1,
      sort_by: this.$route.query.sort_by || 'popularity',
      sort_order: this.$route.query.sort_order || 'desc',
      with_genres: '',
      genres_options: [],
      sort_options: [
        { value: 'popularity', name: 'Popularity' },
        { value: 'revenue', name: 'Revenue' },
        { value: 'vote_count', name: 'Rating' },
      ],
      sort_order_options: [
        { value: 'asc', name: 'low to high' },
        { value: 'desc', name: 'hight to low' },
      ],
    }
  },
  computed: {
    hasMovies() {
      return this.movies.length > 0
    },
    query() {
      return {
        page: this.page,
        with_genres: this.with_genres || '',
        sort_by: this.sort_by,
        sort_order: this.sort_order,
      }
    },
  },
  watch: {
    'query.page'(next, prev) {
      if (next > prev) {
        this.loadMore(next)
      }
    },
    'query.sort_order'(next, prev) {
      if (next !== prev) {
        this.reset()
      }
    },
    'query.sort_by'(next, prev) {
      if (next !== prev) {
        this.reset(next)
      }
    },
    'query.with_genres'(next, prev) {
      if (next !== prev) {
        this.reset(next)
      }
    },
    '$route.query'(next, prev) {
      if (next !== prev) {
        this.page = next.page
        this.with_genres = next.with_genres
        this.sort_by = next.sort_by
        this.sort_order = next.sort_order
      }
    },
  },
  async mounted() {
    this.genres_options = await this.getGenres()
    this.movies = await this.discover()
  },
  destroyed() {
    this.movies = []
  },
  created() {
    this.$emit('updateLayout', 'OffsetLayout')
  },
  methods: {
    async getGenres() {
      const response = await api.genre.index()
      return response.genres
    },
    async discover() {
      const query = this.query
      const response = await api.movieDiscover.index({ query })
      const { total_results, results } = response
      this.total = total_results
      return results
    },
    nextPage() {
      this.page++
      this.updateQuery(this.query)
    },
    async loadMore() {
      this.movies = this.movies.concat(await this.discover())
    },
    async reset() {
      this.page = 1
      this.movies = []
      this.updateQuery(this.query)
      this.movies = await this.discover()
    },
    submit() {
      this.updateQuery(this.query)
    },
    updateQuery(query) {
      const path = this.$route.name
      this.$router.push({ path, query })
    },
  },
}
</script>
