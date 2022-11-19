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

        <v-divider/>

        <v-list
          v-for="item in items"
          :key="item.path"
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
          <slot/>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { navigateTo, useMenu } from '#imports'
import { ref } from 'vue'
import { NavigationFailure, RouteLocationRaw } from 'vue-router'

const { items } = useMenu()

const rail = ref(true)
const drawer = ref(true)


const navigate = async (path: string): Promise<void | RouteLocationRaw | NavigationFailure> => {
  return navigateTo(path)
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}

</style>
