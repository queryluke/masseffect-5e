<template>
  <v-container>
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
              {{ $t('site.read_more') }} <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <me-species-trait :label="$t('character.abi_title')">
              {{ abilityScoreIncreaseText }}
            </me-species-trait>
            <me-species-trait :label="$t('character.species.age')">
              {{ item.age }}
            </me-species-trait>
            <me-species-trait :label="$t('alignments.title')">
              {{ item.alignment }}
            </me-species-trait>
            <me-species-trait :label="$t('sizes.title')">
              {{ item.size }}
            </me-species-trait>
            <me-species-trait :label="$t('speeds.title')">
              <me-html :content="speedText" />
            </me-species-trait>
            <template v-for="trait in traits">
              <me-species-trait :key="trait.id" :label="trait.name">
                <me-html :content="trait.html" />
              </me-species-trait>
            </template>
          </v-tab-item>
          <v-tab-item class="pa-3">
            <div v-for="variant in variants" :key="variant.id" class="mb-4">
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
            <template #activator="{ on, attrs }">
              <v-btn
                color="secondary"
                v-bind="attrs"
                v-on="on"
              >
                {{ $t('site.change_species') }} <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="i in items" :key="i.id" :to="localePath({ name: 'species-id', params: { id: i.id }})">
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
import { SpeciesMixins } from '~/mixins/speciesMixins'

export default {
  mixins: [SpeciesMixins],
  layout: 'tabbed',
  async asyncData ({ store }) {
    await store.dispatch('FETCH_LOTS', ['species', 'traits', 'species-variants'])
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  head () {
    return {
      title: `${this.item.name} - Species | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: this.item.snippet }
      ]
    }
  },
  computed: {
    items () {
      return this.$store.getters.getData('species')
    },
    item () {
      return this.$store.getters.getItem('species', this.id)
    },
    variants () {
      return this.$store.getters.getData('species-variants').filter(i => i.species === this.id)
    },
    traits () {
      return this.$store.getters.getData('traits').filter(i => i.species.includes(this.id))
    },
    hasVariants () {
      return this.variants.length > 0
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
      const tabs = [this.$tc('character.background.title', 1), this.$t('character.species.traits')]
      if (this.hasVariants) {
        tabs.push(this.$t('character.species.variants'))
      }
      return tabs
    }
  },
  created () {
    this.$store.commit('pageTitle', this.item.name)
    this.$store.commit('tabbedPage/SET_TABS', this.tabs)
    this.$store.dispatch('tabbedPage/INIT_THEME')
  }
}
</script>
