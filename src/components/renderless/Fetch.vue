<template>
  <div>
    <slot v-if="state === 'error'" name="error" v-bind="{ error, load }">
      <pre>{{ error }}</pre>
    </slot>
    <slot v-if="state === 'success'" name="success" v-bind="{ data, load }">
      <pre>{{ data }}</pre>
    </slot>
    <slot v-if="state === 'loading'" name="loading">loading...</slot>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api'

export default {
  props: {
    apicall: {
      type: Promise,
      required: true,
    },
  },
  setup({ apicall }) {
    const data = ref()
    const error = ref()
    const state = ref('idle')

    const states = {
      idle: 'idle',
      loading: 'loading',
      success: 'success',
      error: 'error',
    }

    const load = () => {
      state.value = states.loading
      data.value = undefined
      error.value = undefined

      apicall
        .then((response) => {
          state.value = states.success
          data.value = response
          return response
        })
        .catch((error) => {
          state.value = states.error
          data.value = undefined
          error.value = error
        })
    }

    onMounted(() => {
      load()
    })

    return { data, load, error, state }
  },
}
</script>
