import { menu } from '~/@types/global'

export const items: menu[] = [
  {
    title: 'Accueil',
    icon: 'mdi-home',
    path: '/'
  },
  {
    title: 'Mon Profil',
    icon: 'mdi-account',
    path: '/profil'
  },
  {
    title: 'Paramètres',
    icon: 'mdi-cog',
    path: '/parameter'
  }
]

export function useMenu () {
  return {
    items
  }
}
