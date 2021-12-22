export const authUrls = {
  computed: {
    loginUrl () {
      return `${this.$config.sign_in_url}login?client_id=${this.$config.cognito_client}&response_type=token&redirect_uri=${this.$config.base_url}auth/login/&scope=email+openid+profile+aws.cognito.signin.user.admin`
    },
    logoutUrl () {
      return `${this.$config.sign_in_url}logout?client_id=${this.$config.cognito_client}&logout_uri=${this.$config.base_url}auth/logout/`
    }

  },
  methods: {
    logout () {
      this.$store.commit('auth/SET_REDIRECT', this.$nuxt.$route.path)
      window.location.href = this.logoutUrl
    },
    login () {
      this.$store.commit('auth/SET_REDIRECT', this.$nuxt.$route.path)
      window.location.href = this.loginUrl
    }
  }
}
