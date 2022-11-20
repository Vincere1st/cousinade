import type { SupabaseClient } from '@supabase/supabase-js'
import { useNuxtApp } from '#imports'

export const useSupabase = (): SupabaseClient => {
  const app = useNuxtApp()

  const supabase = app.$supabase

  if (!app.$supabase) {
    throw new Error('Supabase Not Initialized Properly')
  }
  return supabase as SupabaseClient
}
