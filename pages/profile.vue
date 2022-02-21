<template>
  <v-container text-center>
    <v-row justify="center" class="mt-8 mt-sm-16">
      <v-col cols="12" md="8" lg="6">
        <v-card v-if="!isAuthenticated">
          <v-card-text>
            <p class="text-h4">
              Sign in to view your profile
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="$store.dispatch('auth/LOG_IN', $nuxt.$route.path)">
              Sign In
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-card-title>
            Edit your Profile
          </v-card-title>
          <v-card-text>
            <div class="text-left text-overline">
              Profile
            </div>
            <v-alert v-if="error" type="error" dense>
              {{ error }}
            </v-alert>
            <v-hover v-slot="{ hover }">
              <v-avatar size="128" color="secondary" style="cursor: pointer" @click="changeImage">
                <v-img v-if="avatar" :src="avatar" />
                <v-icon v-else size="100">
                  mdi-account
                </v-icon>
                <v-overlay v-if="hover" absolute>
                  Update
                </v-overlay>
              </v-avatar>
            </v-hover>
            <v-file-input ref="profileImage" v-model="image" class="d-none" accept="image/*" @change="setPreview" />
            <v-text-field :value="email" disabled label="Email" hint="email cannot be updated" persistent-hint />
            <v-text-field ref="username" :value="username" label="Username" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text :loading="loading" color="secondary" @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      error: false,
      image: undefined,
      preview: null,
      loading: false,
      profileImg: null,
      usernameRules: [
        v => !v.match(/^[a-z0-9]+$/i) || 'Username can only be alphanumeric'
      ]
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    },
    attributes () {
      const { attributes } = this.$store.state.auth.cognitoUser
      return attributes
    },
    email () {
      return this.attributes.email
    },
    username () {
      return this.$store.state.user.username
    },
    avatar () {
      return this.preview || this.$store.getters['user/avatar']
    }
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.isAuthenticated ? 'Profile' : 'Sign In'
    })
  },
  methods: {
    setPreview (image) {
      this.error = false
      this.image = image
      if (!image) {
        return
      }
      if (!image.type.startsWith('image')) {
        this.error = 'Only image files can be uploaded.'
        return
      }
      const kbs = image.size / 1024
      if (kbs > 200) {
        this.error = 'File size cannot exceed 200 Kbs.'
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        this.preview = e.target.result
      }
      reader.readAsDataURL(image)
    },
    async save () {
      this.loading = true
      try {
        this.error = false
        let change = false
        if (this.image) {
          const response = await this.$store.dispatch('api/STORE_IMAGE', { file: this.image, qualifier: 'profile' })
          this.$store.commit('user/SET_USER_SETTINGS', { profileImg: response.key })
          change = true
        }
        if (this.username !== this.$refs.username.$refs.input.value) {
          this.$store.commit('user/SET_USER_SETTINGS', { username: this.$refs.username.$refs.input.value })
          change = true
        }
        if (change) {
          await this.$store.dispatch('user/UPDATE_PROFILE', true)
        }
      } catch (e) {
        console.error(e)
        this.error = 'There was an error saving your profile.'
      }
      this.loading = false
    },
    changeImage () {
      this.$refs.profileImage.$refs.input.click()
    }
  }
}
</script>
