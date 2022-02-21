<template>
  <v-container>
    <v-row>
      <v-col md="9">
        <me-page-title />
        <me-tabbed-page-tabs class="hidden-sm-and-down mt-5" />
        <v-tabs-items v-model="tab">
          <!-- BACKGROUND -->
          <v-tab-item class="pa-3">
            <me-html :content="item.html" />
            <v-btn
              :href="`http://masseffect.wikia.com/wiki/${ item.name }`"
              target="_blank"
              color="secondary"
            >
              {{ $t('buttons.read_more') }} <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            <me-source-reference v-if="rorReference[item.id]" :pages="rorReference[item.id]" source="races" />
          </v-tab-item>
          <!-- TRAITS -->
          <v-tab-item class="pa-3">
            <me-species-traits-list :item="item" />
          </v-tab-item>
          <!-- SUBSPECIES -->
          <v-tab-item v-if="item.subspecies" class="pa-3">
            <me-html :content="item.subspecies.html" class="mt-1" />
            <div v-if="item.subspecies.name === 'Avatar'" class="mt-1">
              <me-tpg s="h5">
                {{ avatarsInspiration.name }}
              </me-tpg>
              <me-html :content="avatarsInspiration.html" />
            </div>
            <div v-for="sub of subspecies" :key="sub.id">
              <me-tpg s="h4">
                {{ sub.name }}
              </me-tpg>
              <me-hr size="1" class="mt-n1" color="primary" />
              <me-html :content="sub.html" />
              <me-species-traits-list v-if="item.subspecies.name !== 'Avatar'" :item="sub" />
            </div>
          </v-tab-item>
          <!-- VARIANTS -->
          <v-tab-item v-if="hasVariants" class="pa-3">
            <div v-for="variant in variants" :key="variant.id" class="mb-4">
              <me-species-variant :item="variant" />
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
                {{ $t('buttons.change_species') }} <v-icon>mdi-menu-down</v-icon>
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

import MeTpg from '~/components/MeTpg'
export default {
  components: { MeTpg },
  layout: 'tabbed',
  async asyncData ({ store }) {
    await store.dispatch('FETCH_LOTS', ['species', 'traits'])
    store.commit('tabbedPage/SET_ACTIVE_TAB', 0)
  },
  data () {
    return {
      rorReference: {
        geth: '3-4',
        krogan: '5-6',
        quarian: '7-8',
        salarian: '9-10',
        turian: '11-12'
      }
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
      return this.$store.getters.getData('species').filter(i => i.type !== 'variant' && i.type !== 'subspecies')
    },
    item () {
      return this.$store.getters.getItem('species', this.$route.params.id)
    },
    variants () {
      return this.$store.getters.getData('species').filter(i => i.type === 'variant' && i.species === this.$route.params.id)
    },
    hasVariants () {
      return this.variants.length
    },
    subspecies () {
      return this.$store.getters.getData('species').filter(i => i.type === 'subspecies' && i.species === this.$route.params.id)
    },
    avatarsInspiration () {
      return this.$store.getters.getItem('traits', 'avatars-inspiration')
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
      const tabs = [this.$tc('background_title', 1), this.$t('traits_title')]
      if (this.item.subspecies) {
        tabs.push(this.item.subspecies.name)
      }
      if (this.hasVariants) {
        tabs.push(this.$t('variants_title'))
      }
      return tabs
    }
  },
  created () {
    this.$store.commit('pageTitle', this.item.name)
    this.$store.commit('tabbedPage/SET_TABS', this.tabs)
  }
}
</script>
