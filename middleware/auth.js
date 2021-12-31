export default async function ({ store, route }) {
  // exit middleware when the route matches '/admin/login'
  const isLoginPage = route.fullPath === '/auth/login'
  const isLogoutPage = route.fullPath === '/auth/logout'
  if (!isLoginPage && !isLogoutPage) {
    await store.dispatch('auth/LOAD_USER')
  }
}
