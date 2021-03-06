<template>
  <component :is="dynamicLayoutComponent">
    <slot
      v-bind="{
        updateLayout,
      }"
    >
    </slot>
  </component>
</template>

<script>
import Vue from 'vue'
import LoadingComponent from './LoadingComponent'
import ErrorComponent from './ErrorComponent'
import OffsetLayout from './OffsetLayout'

export default {
  components: {
    OffsetLayout,
  },
  data() {
    return {
      dynamicLayout: 'OffsetLayout',
      dynamicLayoutComponent: 'OffsetLayout',
    }
  },
  watch: {
    dynamicLayout: {
      handler: 'createComponents',
      immediate: true,
    },
  },
  methods: {
    updateLayout(e) {
      this.dynamicLayout = e
    },
    createComponents(newName) {
      if (newName) {
        const AsyncComponent = () => ({
          component: import(
            /* webpackPrefetch: true */ `@/layouts/${newName}.vue`
          ),
          loading: LoadingComponent,
          error: ErrorComponent,
          timeout: 3000,
        })

        if (newName) {
          this.dynamicLayout = newName
          this.dynamicLayoutComponent = AsyncComponent
        }

        if (!Vue.options.components[newName]) {
          Vue.component(newName, AsyncComponent)
        }
      }
    },
  },
}
</script>
