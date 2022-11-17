import { UserMetadata } from '@supabase/gotrue-js'

export interface MemberMetadata extends UserMetadata {
  password_updated?: boolean
  role?: 'string'
}