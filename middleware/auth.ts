import { defineNuxtRouteMiddleware, navigateTo, useSupabaseUser } from '#imports'
import { MemberMetadata } from '~/@types/MemberMetadata'

export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo('/login')
  } else if (user.value && user.value?.user_metadata && !(user.value?.user_metadata as MemberMetadata).password_updated){
    return navigateTo('/password')
  }
})
