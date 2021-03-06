<template>
  <div
    class="relative w-full h-auto overflow-auto"
    :style="{ paddingTop: percent }"
  >
    <img
      v-bind="$attrs"
      class="absolute w-full left-0 right-0 top-0"
      :src="src"
    />
  </div>
</template>

<script>
export default {
  props: {
    aspectRatio: {
      type: Number,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  },
  computed: {
    percent() {
      return 100 / this.aspectRatio + '%'
    },
  },
}
</script>
