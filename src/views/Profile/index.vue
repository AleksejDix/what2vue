<template>
  <div>
    <h2 class="pb-4">Favorite genre</h2>
    <FormSelect v-model="favoriteGenre" :options="genres" :mode="mode">
      <template #default="{ select, isSelected, options }">
        <ul class="relative inline-flex flex-wrap shadow-sm -m-1">
          <li v-for="option in options" :key="option.value" class="p-1">
            <button
              type="button"
              :class="{ 'app-button-active': isSelected(option) }"
              class="app-button"
              @click="select(option, $event)"
            >
              {{ option.label }}
            </button>
          </li>
        </ul>
      </template>
    </FormSelect>
  </div>
</template>

<script>
import api from '@/api'
import FormSelect from '@/components/renderless/FormSelect'

export default {
  name: 'Profile',
  components: {
    FormSelect,
  },
  data() {
    return {
      favoriteGenre: [],
      genres: [],
      mode: 'multi',
    }
  },
  async mounted() {
    const response = await api.genre.index()
    this.genres = response.genres.map(({ id: value, name: label }) => ({
      value,
      label,
    }))
  },
}
</script>

<style scoped lang="postcss">
.app-button {
  @apply rounded-full px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700  transition ease-in-out duration-150;
}
.app-button:hover {
  @apply text-gray-500 outline-none;
}

.app-button:focus {
  @apply outline-none;
}

.app-button-active {
  @apply bg-blue-100 text-blue-800;
}
</style>
