<template>
  <section class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <portal to="title">what2vue</portal>
    <ul class="grid gap-6">
      <li v-for="category in categories" :key="category.id">
        <CategoryItem :category="category" />
      </li>
    </ul>
  </section>
</template>

<script>
import CategoryItem from '@/components/CategoryItem'
import api from '@/api'

export default {
  components: {
    CategoryItem,
  },
  data() {
    return {
      categories: [],
    }
  },
  mounted() {
    this.categories = api.category.index()
  },
  created() {
    this.$emit('updateLayout', 'OffsetLayout')
  },
}
</script>
