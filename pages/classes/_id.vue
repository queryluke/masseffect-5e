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
        <me-class-tabs
          v-if="$vuetify.breakpoint.mdAndUp"
          :id="id"
          :tabs="tabs"
          :value="tab"
          @change="changeTab"
        />
        <v-tabs-items v-model="tab">
          <v-tab-item class="pa-3">
            <me-progression-table :id="item.id" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-class-attributes :id="item.id" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-subclass-feature-list :id="item.id" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-power-list :items="filteredPowers" />
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
      tabs: ['progression table', 'class features', 'subclasses', 'powers']
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_LOTS', ['classes', 'class-features', 'subclasses', 'powers', 'character-progression'])
    this.$store.commit('pageTitle', this.item.name)
    this.$store.commit('tabbedPage/SET_TABS', this.tabs)
    this.$store.dispatch('tabbedPage/INIT_THEME', this.item.id)
  },
  head () {
    return {
      title: `${this.item.name} - Classes | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Learn more about the ${this.item.name} class, including Progression table, subclasses, proficiencies, and starting equipment` }
      ]
    }
  },
  computed: {
    items () {
      return this.$store.getters.getData('classes')
    },
    item () {
      return this.$store.getters.getItem('classes', this.id)
    },

    tab: {
      get () {
        return this.$store.getters['tabbedPage/activeTab']
      },
      set (value) {
        this.$store.commit('tabbedPage/SET_ACTIVE_TAB', value)
      }
    },
    filteredPowers () {
      return this.$store.getters.getData('powers')
        .filter(i => i.availableClasses.includes(this.item.id))
        .sort((a, b) => {
          return a.level === b.level
            ? a.id > b.id ? 1 : -1
            : a.level > b.level ? 1 : -1
        })
    }
  },
  methods: {
    changeTab (value) {
      this.tab = value
    }
  }
}
</script>
