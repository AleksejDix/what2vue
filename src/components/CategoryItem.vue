<template>
  <section class="grid gap-4">
    <header class="flex justify-between">
      <h2 class="uppercase font-bold">{{ category.name }}</h2>
      <div>
        <router-link
          class="app-button"
          :to="{
            name: 'category',
            params: {
              id: category.id,
            },
            query: {
              page: 1,
            },
          }"
        >
          view all {{ total }}
        </router-link>
      </div>
    </header>
    <div v-if="movies.length > 0" class="h-scoller relative overflow-hidden">
      <div class="h-scoller__body w-full">
        <ul class="h-scoller__list">
          <li v-for="movie in movies" :key="movie.id" class="h-scoller__item">
            <MovieItem :movie="movie" />
          </li>
        </ul>
      </div>
      <div
        class="h-scoller__overlay-left absolute left-0 bottom-0 top-0 pointer-events-none w-16"
      ></div>
      <div
        class="h-scoller__overlay-right absolute right-0 bottom-0 top-0 pointer-events-none w-16"
      ></div>
    </div>
  </section>
</template>

<script>
import api from '@/api'
import MovieItem from '@/components/MovieItem'
export default {
  components: { MovieItem },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      movies: [],
      total: '',
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    async getCategory() {
      const response = await api.movieCategory.show(this.category.id)
      const { total_results, results } = response
      this.total = total_results
      this.movies = results
      return response
    },
  },
}
</script>
