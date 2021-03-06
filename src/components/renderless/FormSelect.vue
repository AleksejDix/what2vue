<script>
const excludes = (list) => (x) => !list.includes(x)

const setCreate = (list, set) =>
  !list.length ? set : list.concat(set.filter(excludes(list)))

const setDestroy = (list, set) => list.filter(excludes(set))

const getIndex = (list, x) => list.findIndex((option) => option.value === x)

const getSubSet = (list, start, end) => {
  const i1 = getIndex(list, start)
  const i2 = getIndex(list, end)
  return list
    .slice(Math.min(i2, i1), Math.max(i2, i1) + 1)
    .map((item) => item.value)
}

export default {
  model: {
    prop: 'selection',
    event: 'update',
    memory: undefined,
  },
  props: {
    selection: {
      type: [Array, String, Number],
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: 'single',
    },
  },
  data() {
    return {
      selected: undefined,
    }
  },
  computed: {
    last() {
      return this.selected.length
        ? this.selected[this.selected.length - 1]
        : undefined
    },
  },
  watch: {
    selected() {
      const { selected } = this
      this.$emit('update', selected)
    },
    mode: {
      handler(newMode) {
        if (newMode === 'multi') {
          this.selected = []
        } else {
          this.selected = ''
        }
      },
      immediate: true,
    },
  },
  methods: {
    select(option) {
      this.memory = this.last

      const includes = this.selected.includes(option.value)

      if (this.mode === 'multi') {
        if (this.memory && event.shiftKey) {
          const set = getSubSet(this.options, this.memory, option.value)
          const setToggle = includes ? setDestroy : setCreate
          this.selected = setToggle(this.selected, set)
        }

        if (includes) {
          this.selected = this.selected.filter((x) => x !== option.value)
        } else {
          this.selected.push(option.value)
        }
        return
      }

      this.selected = option.value
    },
    isSelected(option) {
      if (this.mode === 'multi') {
        return this.selected.includes(option.value)
      }
      return option.value === this.selected
    },
  },
  render() {
    const { selected, select, isSelected, options, memory } = this
    return this.$scopedSlots.default({
      selected,
      select,
      isSelected,
      options,
      memory,
    })
  },
}
</script>
