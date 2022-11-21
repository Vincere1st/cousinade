<template>
  <v-app id="inspire">
    <v-layout>
      <v-bottom-navigation>
        <template
          v-for="item in items"
          :key="item.path"
        >
          <v-btn @click.stop="navigate(item.path)">
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </template>
      </v-bottom-navigation>
      <v-main>
        <v-container fluid>
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { navigateTo, useMenu } from '#imports'
import { NavigationFailure, RouteLocationRaw } from 'vue-router'

const { items } = useMenu()

const navigate = async (path: string): Promise<void | RouteLocationRaw | NavigationFailure> => {
  return navigateTo(path)
}
</script>

<style scoped>

</style>
