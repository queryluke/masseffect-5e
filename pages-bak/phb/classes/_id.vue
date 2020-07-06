<template lang="pug">
  v-container(:class="{ 'pa-0': $vuetify.breakpoint.smAndDown }" fluid)
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
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MeIcon from '~/components/MeIcon.vue'
import ProgressionTable from '~/components/class/ProgressionTable.vue'
import ClassAttributes from '~/components/class/ClassAttributes.vue'
import ClassTabs from '~/components/class/ClassTabs.vue'
import SpellList from '~/components/spell/SpellList.vue'
import SubclassInfo from '~/components/class/SubclassInfo.vue'

// State
const { mapGetters } = createNamespacedHelpers('classPage')

export default {
  components: { SubclassInfo, SpellList, ClassTabs, ClassAttributes, ProgressionTable, MeIcon },
  data () {
    const id = this.$route.params.id
    const item = require(`~/static/data/classes/${this.$route.params.id}.json`)
    const spells = require('~/static/data/spells').filter(spell => spell.availableClasses.includes(id))
    return {
      id,
      item,
      spells
    }
  },
  computed: {
    ...mapGetters(['colors', 'order', 'sortBy', 'classes']),
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
  layout: 'phb'
}
</script>
