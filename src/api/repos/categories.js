import categories from '../data/categories'

export default {
  index: () => categories,
  show: (id) => categories.find((c) => c.id === id),
}
