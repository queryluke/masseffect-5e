<template>
  <v-container style="max-width: 1200px">
    <v-card>
      <me-tabbed-page-tabs grow class="hidden-sm-and-down mt-5" />
      <v-card-text>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <me-cb-species-select />
          </v-tab-item>
          <v-tab-item>
            <me-character-builder-class />
          </v-tab-item>
          <v-tab-item>
            <me-character-builder-ability-scores />
          </v-tab-item>
          <v-tab-item>
            <me-character-builder-character-description />
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
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  layout: 'characterbuilder',
  async asyncData ({ store, redirect, route }) {
    if (!route.query.id) {
      redirect('/characters')
    }
    if (!store.state.cb.characters[route.query.id]) {
      redirect('/characters')
    }
    store.commit('pageTitle', 'Character Builder')
    await store.dispatch('cb/FETCH_CB_DATA')
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
  computed: {
    tab: {
      get () {
        return this.$store.getters['tabbedPage/activeTab']
      },
      set (value) {
        this.$store.commit('tabbedPage/SET_ACTIVE_TAB', value)
      }
    }
  },
  methods: {
    async goToSheet () {
      if (this.$store.getters['auth/isAuthenticated']) {
        this.loading = true
        await this.$store.dispatch('cb/REMOTE_UPDATE', this.cid)
        this.loading = false
      }
      await this.$router.push({
        path: `/characters/sheet?id=${this.cid}`
      })
    }
  }
}
</script>
