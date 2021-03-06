<template>
  <section v-if="person">
    <portal to="title">{{ person.name }}</portal>
    <div class="grid lg:grid-cols-3 gap-4 lg:gap-16">
      <Player v-if="images.length > 0" v-model="images" controls :speed="5000">
        <template #default="{ things, some, current }">
          <div v-if="some">
            <div>
              <transition name="fade" mode="out-in">
                <ResponsiveImage
                  :key="`https://image.tmdb.org/t/p/w500/${things[current].file_path}`"
                  class="rounded-lg overflow-hidden shadow"
                  :width="things[current].width"
                  :height="things[current].height"
                  :aspect-ratio="things[current].aspect_ratio"
                  :src="`https://image.tmdb.org/t/p/w500/${things[current].file_path}`"
                  :alt="person.name"
                />
              </transition>
            </div>
          </div>
        </template>
      </Player>
      <div class="col-span-2">
        <Fetch :apicall="getPersonMovies()">
          <template #success="{ data }">
            <MovieList :list="data.cast" />
          </template>
        </Fetch>
      </div>
    </div>
  </section>
</template>

<script>
import MovieList from '@/components/MovieList'
import Player from '@/components/renderless/Player'
import ResponsiveImage from '@/components/ResponsiveImage'
import Fetch from '@/components/renderless/Fetch'
import api from '@/api'

export default {
  components: {
    MovieList,
    Player,
    ResponsiveImage,
    Fetch,
  },
  data() {
    return {
      id: this.$route.params.id,
      person: {},
      movies: [],
      images: [],
    }
  },
  mounted() {
    this.getPerson()
    this.getMovies()
    this.getPersonImages()
  },
  created() {
    this.$emit('updateLayout', 'OffsetLayout')
  },
  methods: {
    async getPersonMovies() {
      return api.personMovies.index(this.id)
    },
    async getMovies() {
      const response = await api.personMovies.index(this.id)
      this.movies = response.cast
    },
    async getPerson() {
      const response = await api.person.show(this.id)
      this.person = response
    },
    async getPersonImages() {
      const response = await api.personImages.index(this.id)
      this.images = response.profiles
    },
  },
}
</script>
