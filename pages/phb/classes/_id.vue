<template lang="pug">
  v-container(:class="{ 'pa-0': $vuetify.breakpoint.smAndDown }" fluid)
    v-layout(row).hidden-sm-and-down
      v-avatar(size="128" tile)
        img(:src="`/images/classes/${id}.svg`")
      div.pl-5
        h2.display-3 {{ item.name }}
        p {{ item.description}}
    v-card(:class="{ 'pt-4': $vuetify.breakpoint.smAndDown }")
      class-tabs(:colors="colors[item.id]").mb-3
        progression-table(:item="item" v-bind:colors="colors[item.id]" slot="progression_table_tab_content")
        class-attributes(:item="item" v-bind:primaryColor="colors[item.id].primary" slot="attributes_tab_content")
        subclass-info(:item="item" v-bind:primaryColor="colors[item.id].primary" slot="subclasses_tab_content")
        spell-expansion-list(:spells="filteredSpells" slot="spell_list_tab_content")
    v-layout(row grow).my-0.mt-4
      v-flex(v-if="previous.name").primary.pa-0.xs6
        v-list(:class="previous.colors.primary" dark).py-0
          v-list-tile(:to="{ name: 'phb-classes-id', params: { id: previous.id }}" ripple)
            v-icon(dark).mr-5.hidden-xs-only chevron_left
            v-list-tile-content
              v-list-tile-sub-title Previous Class:
              v-list-tile-title(v-text="previous.name")
      v-flex(v-if="next.name" v-bind:class="{ 'offset-xs6': !previous.name }").primary.pa-0.xs6
        v-list(:class="next.colors.primary" dark).py-0
          v-list-tile(:to="{ name: 'phb-classes-id', params: { id: next.id }}" ripple)
            v-list-tile-content
              v-list-tile-sub-title.text-xs-right Next Class:
              v-list-tile-title.text-xs-right(v-text="next.name")
            v-icon(dark).ml-5.hidden-xs-only chevron_right
</template>

<script>
  import MeIcon from '~/components/MeIcon.vue'
  import ProgressionTable from '~/components/class/ProgressionTable.vue'
  import ClassAttributes from '~/components/class/ClassAttributes.vue'
  import ClassTabs from '~/components/class/ClassTabs.vue'
  import SpellExpansionList from '~/components/spell/SpellExpansionList.vue'
  import SubclassInfo from '~/components/class/SubclassInfo.vue'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapGetters} = createNamespacedHelpers('classPage')

  export default {
    components: { SubclassInfo, SpellExpansionList, ClassTabs, ClassAttributes, ProgressionTable, MeIcon },
    computed: {
      ...mapGetters(['getData', 'colors', 'order', 'sortBy']),
      filteredSpells () {
        const data = this.spells
        let sortBy = this.sortBy.key
        let order = this.order
        data.sort(function (a, b) {
          switch (sortBy) {
            case 'type':
              if (a[sortBy] === b[sortBy]) {
                if (a.level === b.level) {
                  return (a.name > b.name ? 1 : -1) * order
                } else {
                  return (a.level > b.level ? 1 : -1) * order
                }
              } else {
                return (a[sortBy] > b[sortBy] ? 1 : -1) * order
              }
            default:
              return (a[sortBy] === b[sortBy] ? 0 : a[sortBy] > b[sortBy] ? 1 : -1) * order
          }
        })
        return data
      }
    },
    created () {
      this.id = this.$route.params.id
      let classes = this.getData('classes')
      this.item = classes.find(value => value.id === this.id)
      this.spells = this.getData('spells').filter(spell => spell[this.id])
      let index = classes.indexOf(this.item)
      this.previous = classes[index - 1] ? classes[index - 1] : {}
      this.previous.colors = this.colors[this.previous.id]
      this.next = classes[index + 1] ? classes[index + 1] : {}
      this.next.colors = this.colors[this.next.id]
    },
    data () {
      return {
        id: '',
        item: {},
        spells: {},
        next: {},
        previous: {}
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | Classes - ${this.item.name}`,
        meta: [
          { hid: 'description', name: 'description', content: `Learn more about the ${this.item.name} class, including Progression table, subclasses, proficiencies, and starting equipment` }
        ]
      }
    },
    layout: 'phb-class'
  }
</script>
