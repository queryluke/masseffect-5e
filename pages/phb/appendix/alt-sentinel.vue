<template lang="pug">
  v-container(:class="{ 'pa-0': $vuetify.breakpoint.smAndDown }" fluid)
    v-layout(row).hidden-sm-and-down
      v-avatar(size="128" tile)
        img(:src="`/images/classes/sentinel.svg`")
      div.pl-5
        h2.display-3 {{ item.name }}
        p {{ item.description}}
    v-card(:class="{ 'pt-4': $vuetify.breakpoint.smAndDown }")
      class-tabs.mb-3
        progression-table(:item="item" v-bind:colors="colors['sentinel']" slot="progression_table_tab_content")
        class-attributes(:item="item" v-bind:primaryColor="colors['sentinel'].primary" slot="attributes_tab_content")
        subclass-info(:item="item" v-bind:primaryColor="colors['sentinel'].primary" slot="subclasses_tab_content")
        spell-list(:items="filteredSpells" slot="spell_list_tab_content")
</template>

<script>
  import MeIcon from '~/components/MeIcon.vue'
  import ProgressionTable from '~/components/class/ProgressionTable.vue'
  import ClassAttributes from '~/components/class/ClassAttributes.vue'
  import ClassTabs from '~/components/class/ClassTabs.vue'
  import SpellList from '~/components/spell/SpellList.vue'
  import SubclassInfo from '~/components/class/SubclassInfo.vue'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapGetters} = createNamespacedHelpers('classPage')

  export default {
    components: { SubclassInfo, SpellList, ClassTabs, ClassAttributes, ProgressionTable, MeIcon },
    data () {
      const id = 'alt_sentinel'
      const item = require(`~/static/data/alt_sentinel.json`)
      const spells = require(`~/static/data/spells`).filter(spell => spell.availableClasses.includes('sentinel'))
      return {
        id,
        item,
        spells
      }
    },
    computed: {
      ...mapGetters(['colors', 'order', 'sortBy']),
      filteredSpells () {
        const data = this.spells
        let sortBy = this.sortBy.key
        let order = this.order
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
        title: `Mass Effect 5e | Classes - Alt Sentinel`,
        meta: [
          { hid: 'description', name: 'description', content: `Learn more about the alternative sentinel class, including Progression table, subclasses, proficiencies, and starting equipment` }
        ]
      }
    },
    layout: 'phb-class'
  }
</script>
