<template>
  <div>
    <slot :select="select" :selected="selected"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
    }
  },
  methods: {
    select(value) {
      this.selected = value
    },
  },
}
</script>
