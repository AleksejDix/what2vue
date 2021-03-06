<template>
  <Selector>
    <template #default="{ select, selected }">
      <div>
        <div v-if="Number.isInteger(selected)">
          <h1 class="py-2 font-bold">Admins</h1>
          <div class="flex items-start py-2">
            <div class="pr-2">
              <img
                class="rounded-full w-12 h-12"
                :src="users[selected].picture.large"
              />
            </div>
            <div>
              <h3>
                {{ users[selected].name.first }} {{ users[selected].name.last }}
              </h3>
              <span class="text-gray-500"
                ><slot :user="users[selected]"></slot
              ></span>
            </div>
          </div>
        </div>
        <h1 class="py-2 font-bold">Users</h1>
        <ul>
          <li
            v-for="(user, index) in users"
            :key="user.login.uuid"
            @click="select(index)"
          >
            <div class="flex items-start py-2">
              <div class="pr-2">
                <img class="rounded-full w-12 h-12" :src="user.picture.large" />
              </div>
              <div>
                <h3>{{ user.name.first }} {{ user.name.last }}</h3>
                <span class="text-gray-500"><slot :user="user"></slot></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </Selector>
</template>

<script>
import Selector from '@/components/Selector'
export default {
  components: {
    Selector,
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
