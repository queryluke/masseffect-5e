export default function ({ store, redirect }) {
  if (!store.state.auth.isAuthenticated) {
    redirect('/')
  }
  if (!store.state.auth.isAdmin) {
    redirect('/')
  }
}
