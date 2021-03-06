<template>
  <div class="border-b border-gray-700 lg:hidden">
    <router-link
      v-for="{ name, params, query, title } in navigation"
      :key="title"
      active-class="bg-gray-900"
      class="block lg:inline-block px-3 py-2 rounded-md text-sm leading-6 font-medium text-gray-300"
      :to="{ name, params, query }"
      @click.native="$emit('close')"
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
