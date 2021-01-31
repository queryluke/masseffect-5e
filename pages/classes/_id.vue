<template>
  <v-container v-if="!loading">
    <v-row>
      <v-col cols="9" class="d-none d-md-flex">
        <div class="d-flex">
          <v-avatar
            tile
            size="128"
          >
            <v-img
              :src="`/images/classes/${item.id}.svg`"
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
        <v-tabs v-model="tab" class="hidden-sm-and-down mt-5" :color="tabColor">
          <v-tab v-for="tabItem in tabs" :key="tabItem">
            {{ tabItem }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item class="pa-3">
            <me-progression-table :id="item.id" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-class-attributes :id="item.id" />
          </v-tab-item>
          <v-tab-item class="pa-3">
            <div
              v-for="subclass in subclasses"
              :key="subclass.id"
            >
              <me-class-feature-list
                :class-id="item.id"
                :subclass-filter="subclass.id"
                include-subclass
                show-subclass-desc
                show-subclass-header
              />
            </div>
          </v-tab-item>
          <v-tab-item class="pa-3">
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/*
v-layout(row).hidden-sm-and-down
    v-avatar(size="128" tile)
      img(:src="`/images/classes/${id}.svg`")
    div.pl-5
      v-layout(row)
        v-flex(md8)
          h2.display-3 {{ item.name }}
        v-flex(md4).text-xs-right
          v-menu
            v-btn(slot="activator" v-bind:color="colors[item.id].primary" dark)
              span {{ item.name }}
              v-icon arrow_drop_down
            v-list
              v-list-tile(v-for="item in classes" v-bind:key="item" v-bind="{to: { name: 'phb-classes-id', params: { id: item }}}")
                v-list-tile-title {{ item | capitalize }}
      p {{ item.description}}
      p(v-if="id === 'sentinel'")
        em.
          If you enjoyed the split casting ability of the pre-v0.9.0 sentinels, check out the
          #[nuxt-link(to="/phb/appendix/alt-sentinel") Alternative Sentinel] progression.
  v-card(:class="{ 'pt-4': $vuetify.breakpoint.smAndDown }")
    class-tabs.mb-3
      progression-table(:item="item" v-bind:colors="colors[item.id]" slot="progression_table_tab_content")
      class-attributes(:item="item" v-bind:primaryColor="colors[item.id].primary" slot="attributes_tab_content")
      subclass-info(:item="item" v-bind:primaryColor="colors[item.id].primary" slot="subclasses_tab_content")
      spell-list(:items="filteredSpells" slot="spell_list_tab_content")
 */
import { createNamespacedHelpers } from 'vuex'

// State
const { mapGetters } = createNamespacedHelpers('classPage')

export default {
  async fetch () {
    await Promise.all([
      this.$store.dispatch('FETCH_DATA', 'classes'),
      this.$store.dispatch('FETCH_DATA', 'class-features'),
      this.$store.dispatch('FETCH_DATA', 'subclasses'),
      this.$store.dispatch('FETCH_DATA', 'powers'),
      this.$store.dispatch('FETCH_DATA', 'character-progression')
    ])
    this.$store.commit('pageTitle', this.item.name)
    this.$store.commit('tabbedPage/SET_TABS', this.tabs)
    this.$store.dispatch('tabbedPage/INIT_THEME', { theme: this.item.id, isDark: this.$vuetify.theme.isDark })
    this.loading = false
  },
  data () {
    return {
      id: this.$route.params.id,
      tabs: ['progression table', 'class features', 'subclasses', 'powers'],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['colors', 'order', 'sortBy', 'classes']),
    items () {
      return this.$store.getters.getData('classes')
    },
    item () {
      return this.$store.getters.getItem('classes', this.id)
    },
    subclasses () {
      return this.$store.getters.getData('subclasses').filter(i => i.class === this.item.id)
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
      return this.$store.getters['tabbedPage/tabColor']
    },
    filteredSpells () {
      const data = this.spells
      const sortBy = this.sortBy.key
      const order = this.order
      data.sort(function (a, b) {
        switch (sortBy) {
          case 'type':
            if (a.level === b.level) {
              if (a.type === b.type) {
                return (a.name > b.name ? 1 : -1) * order
              } else {
                return (a.type > b.type ? 1 : -1) * order
              }
            } else {
              return (a.level > b.level ? 1 : -1) * order
            }
          default:
            return (a[sortBy] === b[sortBy] ? 0 : a[sortBy] > b[sortBy] ? 1 : -1) * order
        }
      })
      return data
    }
  },
  head () {
    return {
      title: `${this.item.name} - Classes | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: `Learn more about the ${this.item.name} class, including Progression table, subclasses, proficiencies, and starting equipment` }
      ]
    }
  },
  layout: 'tabbed'
}
</script>
