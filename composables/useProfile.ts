import { useSupabaseClient, useSupabaseUser } from '#imports'
import { ref } from 'vue'

const profile= ref()
async function getProfile() {

  try {
    const client = useSupabaseClient()
    const user = useSupabaseUser()
    const {
      data,
      error,
      status
    } = await client.from('profiles').select('*').eq('id', user.value?.id).single()
    if (error && status !== 406) {
      throw error
    }
    if (data) {
      profile.value = data
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export const useProfile = () => {
  return {
    getProfile,
    profile
  }
}
