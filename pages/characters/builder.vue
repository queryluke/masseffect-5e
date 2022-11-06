<template>
  <v-container style="max-width: 1200px">
    <v-card :loading="$fetchState.pending">
      <me-tabbed-page-tabs grow class="hidden-sm-and-down mt-5" />
      <v-card-text v-if="!$fetchState.pending" class="px-0">
        <v-tabs-items v-model="tab">
          <v-tab-item class="px-4">
            <me-cb-species-select />
          </v-tab-item>
          <v-tab-item class="px-0">
            <v-row class="px-5">
              <v-col cols="12" md="6" offset-md="3">
                <me-cb-xp-interface />
              </v-col>
            </v-row>
            <me-cb-classes-select />
          </v-tab-item>
          <v-tab-item class="px-4">
            <me-cb-abilities-select />
          </v-tab-item>
          <v-tab-item class="px-0">
            <me-cb-description />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions v-if="$vuetify.breakpoint.mdAndUp">
        <me-cb-nav @goToSheet="goToSheet" />
      </v-card-actions>
    </v-card>
    <v-footer v-if="$vuetify.breakpoint.smAndDown" app class="px-0">
      <me-cb-nav @goToSheet="goToSheet" />
    </v-footer>
  </v-container>
</template>

<script>

export default {
  layout: 'characterbuilder',
  asyncData ({ store, redirect, route }) {
    if (!route.query.id) {
      redirect('/characters')
    }
    store.commit('pageTitle', 'Character Builder')
    const tabs = ['Species', 'Class', 'Abilities', 'Description']
    store.commit('tabbedPage/SET_TABS', tabs)
    store.dispatch('tabbedPage/INIT_THEME')
    return {
      tabs
    }
  },
  data () {
    return {
      loading: false
    }
  },
  async fetch () {
    await this.$store.dispatch('character/FETCH_CB_DATA')
    // TODO: check that character is editable
    const character = await this.$store.dispatch('character/LOAD_CHARACTER', this.$route.query.id)
    if (!character) {
      await this.$router.push('/characters')
    }
  },
  computed: {
    tab: {
      get () {
        return this.$store.getters['tabbedPage/activeTab']
      },
      set (value) {
        this.$store.commit('tabbedPage/SET_ACTIVE_TAB', value)
      }
    },
    id () {
      return this.$store.getters['character/id']
    }
  },
  methods: {
    async goToSheet () {
      if (this.$store.getters['auth/isAuthenticated']) {
        this.loading = true
        await this.$store.dispatch('character/REMOTE_UPDATE_CHARACTER')
        this.loading = false
      }
      await this.$router.push({
        path: `/characters/sheet/?id=${this.id}`
      })
    }
  }
}
</script>
