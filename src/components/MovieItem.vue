<template>
  <router-link :to="{ name: 'cast', params: { id: movie.id, movie: movie } }">
    <div class="pt-150 bg-grey-200 rounded overflow-hidden">
      <picture>
        <source
          :srcset="`https://image.tmdb.org/t/p/w342/${movie.poster_path} 1x, https://image.tmdb.org/t/p/w780/${movie.poster_path} 2x`"
        />
        <img
          v-if="movie.poster_path"
          class="inset-0 max-w-full w-full object-cover"
          :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`"
          :alt="movie.title"
        />
      </picture>
    </div>
    <header class="py-2">
      <h2 class="truncate">
        {{ movie.title }}<span> • {{ movie.release_date }}</span>
      </h2>
      <div class="flex items-center gap-2">
        <div
          class="w-4 h-4 rounded-full"
          :class="{
            'bg-red-500': movie.vote_average < 5,
            'bg-yellow-500':
              movie.vote_average >= 5 && movie.vote_average < 7.5,
            'bg-green-500': movie.vote_average >= 7.5,
          }"
        ></div>
        <div>{{ movie.vote_average * 10 }}%</div>
      </div>
    </header>
  </router-link>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
}
</script>
