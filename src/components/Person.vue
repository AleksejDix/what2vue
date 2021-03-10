<template>
  <article class="bg-gray-800 rounded h-full overflow-hidden shadow-lg">
    <router-link
      class="no-underline"
      :to="{ name: 'person', params: { id: person.id } }"
    >
      <div class="relative bg-gray-200 w-full aspect-w-2 aspect-h-3">
        <img
          v-if="person.profile_path"
          class="absolute w-full h-full block inset-0"
          :src="`https://image.tmdb.org/t/p/w500/${person.profile_path}`"
          :alt="person.name"
        />
      </div>
      <div class="px-3 py-2 text-gray-200">
        {{ person.name }}
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
}
</script>
