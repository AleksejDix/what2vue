<template>
  <div>
    <UserList :users="users">
      <template #default="{ user }">
        {{ `${user.phone} ${user.email}` }}
      </template>
    </UserList>
  </div>
</template>

<script>
import UserList from '@/components/UserList'
import api from '@/api'
export default {
  components: {
    UserList,
  },
  data() {
    return {
      users: [],
    }
  },
  mounted() {
    this.getUsers()
  },
  created() {
    this.$emit('updateLayout', 'OffsetLayout')
  },
  methods: {
    async getUsers() {
      const results = await api.users.index({ params: { results: 10 } })
      this.users = results.data.results
    },
  },
}
</script>
