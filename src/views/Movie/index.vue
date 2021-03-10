<template>
  <div v-if="movie">
    <div
      class="banner flex items-center justify-center"
      :style="{
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backgroundImage: 'url(' + backgroundURL + ')',
      }"
    >
      <div class="flex items-center justify-center h-32">
        <h1 class="text-white text-5xl font-extralight">
          {{ movie.title }}
        </h1>
      </div>
    </div>
    <section class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="offset grid gap-2">
        <div class="flex flex-col sm:flex-row">
          <div class="poster order-2">
            <img v-if="posterURL" class="w-full max-w-full" :src="posterURL" />
          </div>
          <div class="video order-1">
            <div v-if="videoURL" class="aspect-w-16 aspect-h-9">
              <iframe
                :src="videoURL"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div class="px-4 sm:px-0">
          <div class="flex gap-4 py-4">
            <button class="app-button" @click="toggleFavorite">
              {{ isFavorite ? 'remove from' : 'add to' }} favorites
            </button>

            <router-link class="app-button" :to="{ name: 'cast' }"
              >cast</router-link
            >
            <router-link class="app-button" :to="{ name: 'crew' }"
              >crew</router-link
            >
          </div>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/api'

const getFirstVideo = (id) => async () => {
  const response = await api.movieVideos.index(id)
  const [firstVideo] = response.results
  if (!firstVideo) return
  if (!firstVideo.key) return
  return firstVideo.key
}

export default {
  data() {
    return {
      id: this.$route.params.id,
      loaded: false,
      movie: '',
      video: '',
      people: {},
    }
  },
  computed: {
    isFavorite() {
      return !!this.$store.getters.show(this.movie.id)
    },
    videoURL() {
      if (!this.video) return
      return `https://www.youtube.com/embed/${this.video}`
    },
    posterURL() {
      if (!this.movie.poster_path) return
      return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
    },
    backgroundURL() {
      if (!this.movie.backdrop_path) return
      return `https://image.tmdb.org/t/p/w1400_and_h450_face/${this.movie.backdrop_path}`
    },
  },
  mounted() {
    this.getMoviePage()
  },
  created() {
    this.$emit('updateLayout', 'SinglePageLayout')
  },
  methods: {
    toggleFavorite() {
      this.isFavorite
        ? this.$store.dispatch('DESTROY_FAVORITE', this.movie.id)
        : this.$store.dispatch('STORE_FAVORITE', this.movie)
    },
    async getMovie() {
      const response = await api.movie.show(this.id)
      return response
    },
    getMoviePage() {
      this.loaded = false
      const setMovie = (movie) => ((this.movie = movie), movie)

      const setVideo = (video) => {
        this.video = video
      }

      return this.getMovie()
        .then(setMovie)
        .then(getFirstVideo(this.id))
        .then((response) => {
          this.loaded = true
          setVideo(response)
          return response
        })
    },
  },
}
</script>

<style scoped>
.poster,
.video {
  width: 100%;
}

.preview {
  background-color: #0f1c26;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

@media (min-width: 640px) {
  .offset {
    transform: translateY(-200px);
  }

  .poster {
    width: 27.37%;
  }

  .video {
    width: 73%;
  }

  .banner {
    background-color: #e5e5e5;
    height: 512px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-blend-mode: multiply;
  }
}
</style>
