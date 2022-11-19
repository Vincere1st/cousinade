import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const options = {
    db: {
      schema: 'public',
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }

  const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY, options)

  nuxtApp.provide('supabase', supabase)
})
