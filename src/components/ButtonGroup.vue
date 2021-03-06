<template>
  <ul class="relative inline-flex flex-wrap shadow-sm -m-1">
    <li v-for="option in buttons" :key="option.value" class="p-1">
      <button type="button" class="app-button">
        {{ option.label }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      required: true,
    },
  },
}
</script>
