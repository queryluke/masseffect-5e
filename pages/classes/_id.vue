<template>
  <v-container v-if="!$fetchState.pending">
    <v-row>
      <v-col cols="9" class="d-none d-md-flex">
        <div class="d-flex">
          <v-avatar
            tile
            size="128"
          >
            <v-img
              :src="require(`~/assets/images/classes/${item.id}.svg`)"
            />
          </v-avatar>
          <div>
            <me-page-title />
            <me-html :content="item.html" />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs
          v-model="tab"
          class="hidden-sm-and-down mt-5"
          :[tabsMode]="true"
          :color="tabColor"
          :background-color="tabsColor"
        >
          <v-tab v-for="tabItem in tabs" :key="tabItem">
            {{ tabItem }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item class="pa-3">
            <me-progression-table :item="item" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-class-attributes :item="item" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-subclass-feature-list :klass-id="item.id" flavor />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-power-list :items="powers" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  layout: 'tabbed',
  data () {
    return {
      id: this.$route.params.id,
      // items: [],
      powers: [],
      tabs: [
        this.$t('character.klass.progression_table'),
        this.$t('character.klass.class_features'),
        this.$t('character.klass.subclasses'),
        this.$t('powers.title')
      ]
    }
  },
  async fetch () {
    const data = await this.$store.dispatch('FETCH_LOTS', ['classes', 'powers'])
    // this.items = data[0]
    this.powers = data[1].filter(i => i.classes.includes(this.item.id)).sort((a, b) => {
      return a.level === b.level
        ? a.id > b.id ? 1 : -1
        : a.level > b.level ? 1 : -1
    })
    this.$store.commit('pageTitle', this.item.name)
    this.$store.commit('tabbedPage/SET_TABS', this.tabs)
    this.$store.dispatch('tabbedPage/INIT_THEME', this.item.id)
  },
  head () {
    return {
      title: `${this.item ? this.item.name : ''} - Classes | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Learn more about the ${this.item ? this.item.name : ''} class, including Progression table, subclasses, proficiencies, and starting equipment` }
      ]
    }
  },
  computed: {
    items () {
      console.log('computing items')
      return this.$store.getters.getData(this.$i18n.locale, 'classes')
    },
    item () {
      return this.items.find(i => i.id === this.$route.params.id)
    },
    tab: {
      get () {
        return this.$store.getters['tabbedPage/activeTab']
      },
      set (value) {
        this.$store.commit('tabbedPage/SET_ACTIVE_TAB', value)
      }
    },
    tabColor () {
      return this.$store.getters['config/classThemeTabColor'](this.item.id)
    },
    tabsColor () {
      return this.$store.getters['config/classThemeTabsColor'](this.item.id)
    },
    tabsMode () {
      return this.$store.getters['config/classThemeTabsMode'](this.item.id)
    },
    hrColor () {
      return this.$store.getters['config/classThemeHrColor'](this.item.id)
    }
  }
}
</script>
