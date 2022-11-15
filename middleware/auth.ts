import { defineNuxtRouteMiddleware, navigateTo, useProfile, useSupabaseUser } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  const userProfile = useProfile()
  if (!userProfile.profile.value.password_updated.password_update) {
    return navigateTo('/password')
  }
  if (!user.value) {
    return navigateTo('/login')
  }
})
