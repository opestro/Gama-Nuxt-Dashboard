export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()
    // redirect the user to the dash page
    if (user) {
      return navigateTo({
        path: '/dashboards/modern',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  })