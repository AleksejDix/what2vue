<template>
  <section class="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-4">
    <portal to="title">{{ name }}</portal>
    <header class="flex justify-between">
      <h2 class="uppercase font-bold">{{ name }} • {{ total }}</h2>
    </header>
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
  components: {
    MovieList,
    IntersectionObserver,
  },
  data() {
    return {
      page: 1,
      movies: [],
      total: 0,
    }
  },
  computed: {
    hasMovies() {
      if (!this.movies) return
      return this.movies.length > 0
    },
    name() {
      const categoy = api.category.show(this.$route.params.id)
      return categoy.name
    },
    query() {
      return {
        page: this.page,
      }
    },
  },
  watch: {
    async 'query.page'(next, prev) {
      if (next > prev) {
        this.query.page = next
        this.updateQuery(this.query)
        this.movies = this.movies.concat(await this.getCategory())
      }
    },
    async '$route.params.id'(next, prev) {
      if (next !== prev) {
        this.movies = []
        this.page = 1
        this.updateQuery(this.query)
        this.movies = this.movies.concat(await this.getCategory())
      }
    },
  },
  async mounted() {
    this.movies = await this.getCategory()
  },
  created() {
    this.$emit('updateLayout', 'OffsetLayout')
  },
  destroyed() {
    this.movies = []
  },
  methods: {
    async getCategory() {
      const query = this.query
      const id = this.$route.params.id
      const response = await api.movieCategory.show(id, { query })
      const { total_results = 0, results = [] } = response
      this.total = total_results
      return results
    },
    updateQuery(query) {
      this.$router.push({ query })
    },
    nextPage() {
      this.page++
    },
  },
}
</script>
