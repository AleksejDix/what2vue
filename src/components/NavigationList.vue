<template>
  <div class="py-2 px-3 lg:flex lg:p-0">
    <router-link
      v-for="{ name, params, query, title } in navigation"
      :key="title"
      active-class="bg-gray-900"
      class="block lg:inline-block px-3 py-2 rounded-md text-sm leading-6 font-medium text-gray-300"
      :to="{ name, params, query }"
      >{{ title }}</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Array,
      required: true,
    },
  },
}
</script>
