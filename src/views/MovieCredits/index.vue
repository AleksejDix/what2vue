<template>
  <section>
    <ul class="grid gap-8 credits">
      <li v-for="person in creditsType" :key="person.credit_id">
        <Person :person="person" />
      </li>
    </ul>
  </section>
</template>

<script>
import api from '@/api'

import Person from '@/components/Person'
export default {
  components: { Person },
  data() {
    return {
      id: this.$route.params.id,
      credits: {},
    }
  },
  computed: {
    creditsType() {
      return this.credits[this.$route.name]
    },
  },
  mounted() {
    this.getCredits()
  },
  methods: {
    async getCredits() {
      const response = await api.movieCredits.index(this.id)
      this.credits = {
        crew: response.crew,
        cast: response.cast,
      }
      return response
    },
  },
}
</script>

<style scoped>
.credits {
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
</style>
