<template>
  <div @mouseenter="pause" @mouseleave="pause">
    <slot
      :things="things"
      :play="play"
      :pause="pause"
      :stop="stop"
      :total="total"
      :some="some"
      :current="current"
      :select="select"
      :back="back"
      :forward="forward"
    >
    </slot>
    <slot name="controls">
      <div
        v-if="controls"
        class="flex items-center gap-2 py-2 w-full justify-between"
      >
        <button class="app-button" @click="back">back</button>
        <span> {{ current + 1 }} / {{ total }} </span>
        <button class="app-button" @click="forward">next</button>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'things',
    event: 'update',
  },
  props: {
    auto: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: [Number],
      default: 1000,
    },
    things: {
      type: Array,
      required: true,
    },
    controls: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentState: 'stop',
      autoPlayer: null,
      current: 0,
      isPaused: false,
      isPlaying: false,
      isStoped: true,
    }
  },
  computed: {
    total() {
      return this.things.length
    },
    some() {
      return this.total > 0
    },
    isFirst() {
      return this.current === 0
    },
    isLast() {
      return this.current === this.total - 1
    },
    isOnHold() {
      return this.isPaused || this.interrupted || this.focussed
    },
  },
  mounted() {
    if (this.auto) {
      this.play()
    }
  },
  methods: {
    _run() {
      if (this.isOnHold) return
      this.isPlaying = true
      this.forward()
    },
    go(direction) {
      if (Math.abs(direction) > this.total || direction === 0) return
      // stop the auto
      this.stop()

      const next = this.current + direction

      const backward = this.isFirst ? this.total - 1 : next
      const forward = this.isLast ? 0 : next

      this.current = direction < 0 ? backward : forward

      // stop the auto
      this.play()
    },
    select(piece) {
      this.current = piece
    },
    back() {
      this.go(-1)
    },
    forward() {
      this.go(1)
    },
    pause() {
      this.isPaused = !this.isPaused
    },
    play() {
      this.autoPlayer = setInterval(this._run, this.speed)
    },
    stop() {
      clearInterval(this.autoPlayer)
      this.isPlaying = false
    },
  },
  destroy() {
    this.stop()
  },
}
</script>
