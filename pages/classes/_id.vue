<template>
  <v-container>
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
        <me-tabbed-page-tabs class="hidden-sm-and-down mt-5" />
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
  async asyncData ({ store }) {
    await store.dispatch('FETCH_LOTS', ['classes', 'powers', 'class-features', 'character-progression', 'subclasses'])
    store.commit('tabbedPage/SET_ACTIVE_TAB', 0)
  },
  data () {
    return {
      id: this.$route.params.id,
      tabs: [
        this.$t('progression_table_title'),
        this.$t('class_features_title'),
        this.$tc('subclass_title', 2),
        this.$tc('power_title', 2)
      ]
    }
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
      return this.$store.getters.getData('classes')
    },
    item () {
      return this.$store.getters.getItem('classes', this.$route.params.id)
    },
    powers () {
      return this.$store.getters.getData('powers').filter(i => i.classes.includes(this.item.id)).sort((a, b) => {
        return a.level === b.level
          ? a.id > b.id ? 1 : -1
          : a.level > b.level ? 1 : -1
      })
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
  },
  created () {
    this.$store.dispatch('SET_META', {
      title: this.item.name,
      subTitle: this.$tc('class_title', 2),
      description: this.$t('meta.class_info', { name: this.item.name })
    })
    this.$store.commit('pageTitle', this.item.name)
    this.$store.commit('tabbedPage/SET_TABS', this.tabs)
  }
}
</script>
