<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created() {
    this.$emit('updateLayout', 'SinglePageLayout')
  },
}
</script>
