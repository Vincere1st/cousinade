<template>
  <v-app id="inspire">
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template #append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            />
          </template>
        </v-list-item>

        <v-divider />

        <v-list
          v-for="item in items"
          :key="item.title"
          density="compact"
          nav
        >
          <v-list-item
            :prepend-icon="item.icon"
            :title="item.title"
            @click.stop="navigate(item.path)"
          />
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { navigateTo } from '#imports'

interface menu {
  title: string,
  icon: string,
  path: string
}

import { ref } from 'vue'
import { NavigationFailure, RouteLocationRaw } from 'vue-router'

const rail = ref(true)
const drawer = ref(true)
const items: menu[] = [
  { title: 'Accueil', icon: 'mdi-home', path: '/' },
  { title: 'Mon Profil', icon: 'mdi-account', path: '/account' },
  { title: 'Paramètres', icon: 'mdi-cog', path: '/parameter' }
]

const navigate = async (path: string): Promise<void | RouteLocationRaw | NavigationFailure> => {
  return navigateTo(path)
}
</script>

<style scoped>

</style>
