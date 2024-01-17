import { useAuthStore } from '@/stores/auth'
export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser()
  useAuthStore().SET_USER(user)
  
  // redirect the user to the login page
  if (!user) {
    return navigateTo({
      path: '/auth/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})