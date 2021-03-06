<template>
  <section class="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-2">
    <header class="px-2 flex space-between">
      <h1>Favorites</h1>
    </header>
    <div v-if="hasMovies">
      <MovieList :list="movies" />
    </div>
  </section>
</template>

<script>
import MovieList from '@/components/MovieList'
export default {
  components: {
    MovieList,
  },
  computed: {
    hasMovies() {
      return this.movies.length > 0
    },
    movies() {
      return this.$store.getters.favorites
    },
  },
  created() {
    this.$emit('updateLayout', 'OffsetLayout')
  },
}
</script>
