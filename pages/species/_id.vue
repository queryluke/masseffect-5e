<template>
  <v-container v-if="!$fetchState.pending">
    <v-row>
      <v-col md="9">
        <me-page-title />
        <v-tabs v-model="tab" class="hidden-sm-and-down mt-5">
          <v-tab v-for="tabItem in tabs" :key="tabItem">
            {{ tabItem }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item class="pa-3">
            <me-html :content="item.html" />
            <v-btn
              :href="`http://masseffect.wikia.com/wiki/${ item.name }`"
              target="_blank"
              color="secondary"
            >
              Read More <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-species-trait label="Ability Score Increase">
              <me-species-ability-score-increase-summary :data="item.abilityScoreIncrease" />
            </me-species-trait>
            <me-species-trait label="Age">
              {{ item.age }}
            </me-species-trait>
            <me-species-trait label="Alignment">
              {{ item.alignment }}
            </me-species-trait>
            <me-species-trait label="Size">
              {{ item.size }}
            </me-species-trait>
            <me-species-trait label="Speed">
              <me-species-speed :data="item.speed" />
            </me-species-trait>
            <template v-for="trait in item.traits">
              <me-species-trait :key="trait.id" :label="trait.name">
                <me-html :content="trait.html" />
              </me-species-trait>
            </template>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <div v-for="variant in item.variants" :key="variant.id" class="mb-4">
              <p class="text-h6 text-md-h4">
                {{ variant.name }}
              </p>
              <me-hr />
              <me-html :content="variant.html" />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col md="3" class="hidden-sm-and-down">
        <div class="text-right">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                v-bind="attrs"
                v-on="on"
              >
                Change Species <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="i in items" :key="i.id" :to="{ name: 'species-id', params: { id: i.id }}">
                <v-list-item-title>
                  {{ i.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-img :src="item.bodyImg" height="80vh" contain />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  async fetch () {
    this.items = await this.$store.dispatch('FETCH_DATA', 'species')
    this.$store.commit('pageTitle', this.item.name)
    this.$store.commit('tabbedPage/SET_TABS', this.tabs)
    this.$store.dispatch('tabbedPage/INIT_THEME', { theme: false, isDark: this.$vuetify.theme.isDark })
  },
  data () {
    return {
      items: [],
      id: this.$route.params.id
    }
  },
  computed: {
    item () {
      return this.$store.getters.getItem('species', this.id)
    },
    hasVariants () {
      return this.item.variants.length > 0
    },
    tab: {
      get () {
        return this.$store.getters['tabbedPage/activeTab']
      },
      set (value) {
        this.$store.commit('tabbedPage/SET_ACTIVE_TAB', value)
      }
    },
    tabs () {
      const tabs = ['background', 'traits']
      if (this.hasVariants) {
        tabs.push('variants')
      }
      return tabs
    }
  },
  head () {
    return {
      title: `${this.item.name} - Races | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: this.item.snippet }
      ]
    }
  },
  layout: 'tabbed'
}
</script>
