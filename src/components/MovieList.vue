<template>
  <ul class="grid gap-8 movies__list grid-cols-5">
    <li v-for="movie in list" :key="movie.id" class="movies__list-item">
      <MovieItem :movie="movie" />
    </li>
  </ul>
</template>

<script>
import MovieItem from '@/components/MovieItem'
export default {
  components: { MovieItem },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.movies__list {
  grid-template-columns: repeat(auto-fill, minmax(171px, 1fr));
}
</style>
