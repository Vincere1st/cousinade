import { defineNuxtRouteMiddleware, navigateTo, useSupabase } from '#imports'
import { MemberMetadata } from '~/@types/MemberMetadata'

export default defineNuxtRouteMiddleware(async () => {

  const supabase = useSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return navigateTo('/login')
  } else if (user && user.user_metadata && !(user.user_metadata as MemberMetadata).password_updated){
    return navigateTo('/password')
  }
})
