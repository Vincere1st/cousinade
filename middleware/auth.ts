import { defineNuxtRouteMiddleware, navigateTo, useProfile, useSupabaseUser } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  // const userProfile = useProfile()
  // if (userProfile && userProfile.profile.value) {
  //   if (!userProfile.profile.value.password_updated.password_update) {
  //     return navigateTo('/password')
  //   }
  // }
  console.log(user.value)
  if (!user.value) {
    return navigateTo('/login')
  }
})
