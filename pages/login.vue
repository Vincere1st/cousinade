<template>
  <login-card
    :title="'Bienvenue sur le site de la cousinade!'"
    :button-value="'Se connecter'"
    @submit="login"
    @password="password = $event"
    @email="email = $event"
    :email="email"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta, navigateTo, useSupabase } from '#imports'

definePageMeta({
  layout: 'login'
})
const supabase = useSupabase()
const email = ref<string | null>(null)
const password = ref<string | null>(null)
const login = async () => {
  if (email.value && password.value) {
    const
    { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) {
      // TODO manage error
      if(error.message === 'Invalid login credentials') {

      }
    } else if( user) {
      try {
        const {
          data,
          error,
          status
        } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error
        }
        if (data) {
          console.log(data)
        }
      } catch (error) {
        navigateTo('/member')
      } finally {
        navigateTo('')
      }
    }
  }
}
</script>

<style scoped>

</style>
