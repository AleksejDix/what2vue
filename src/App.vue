<template>
  <div>
    <header class="bg-gray-800">
      <nav>
        <div class="">
          <div class="border-b border-gray-700 border-red">
            <div
              class="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <AppLogo></AppLogo>
                </div>
                <div class="hidden lg:block pl-10">
                  <NavigationList :navigation="navigation" />
                </div>
              </div>
              <div class="flex-1">
                <MultiSearch />
              </div>
              <div class="hidden lg:block">
                <div class="ml-4 flex items-center lg:ml-6">
                  <login />
                </div>
              </div>
              <div class="-mr-2 flex lg:hidden">
                <button
                  class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                  :aria-label="isMenuOpen ? 'Close main menu' : 'Main menu'"
                  :aria-expanded="isMenuOpen"
                  @click="isMenuOpen = !isMenuOpen"
                >
                  <svg
                    class="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      :class="{
                        hidden: isMenuOpen,
                        'inline-flex': !isMenuOpen,
                      }"
                      class="inline-flex"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      :class="{
                        hidden: !isMenuOpen,
                        'inline-flex': isMenuOpen,
                      }"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <MobileMenu
          v-if="isMenuOpen"
          :navigation="navigation"
          @close="isMenuOpen = false"
        />
      </nav>
    </header>

    <div>
      <dynamic-layout>
        <template #default="{ updateLayout }">
          <transition name="fade" mode="out-in">
            <router-view :key="$route.params.id" @updateLayout="updateLayout" />
          </transition>
        </template>
      </dynamic-layout>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppLogo from '@/components/Logo'
import MultiSearch from '@/components/MultiSearch'
import NavigationList from '@/components/NavigationList'
import MobileMenu from '@/components/MobileMenu'
import Login from '@/components/Login'
import api from '@/api'
import DynamicLayout from './layouts/DynamicLayout.vue'

export default {
  components: {
    AppLogo,
    MultiSearch,
    NavigationList,
    MobileMenu,
    Login,
    DynamicLayout,
  },
  data() {
    return {
      isOpen: false,
      isMenuOpen: false,
      navigation: [
        {
          title: 'Discover',
          name: 'discover',
          params: {},
          query: {
            page: 1,
            sort_by: 'popularity',
            sort_order: 'desc',
          },
        },
      ],
    }
  },
  mounted() {
    this.getProfile()
    this.getCategories()
  },
  methods: {
    ...mapActions(['getProfile']),
    getCategories() {
      const cats = api.category.index()
      const catLinks = cats.map(({ name: title, id }) => ({
        title,
        name: 'category',
        params: {
          id,
        },
        query: {
          page: 1,
        },
      }))
      this.navigation = this.navigation.concat(catLinks)
    },
    navOpen() {
      this.isMenuOpen = true
    },
    navClose() {
      this.isMenuOpen = false
    },
    navToggle() {
      if (this.isMenuOpen) {
        this.navClose()
      } else {
        this.navOpen()
      }
    },
  },
}
</script>
