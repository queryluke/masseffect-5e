<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12)
        h2.display-3 Grenades & Mines
      v-flex(xs12)
        div.expansion-panel__sortable.primary
          v-layout.px-4
            v-flex(v-for="header in headers" v-bind:key="header.key" v-bind:class="header.classes")
              v-list(dark).primary.pa-0
                v-list-tile(@click.stop="sortBy(header.key)" ripple v-bind:class="{ active: header.key === sortKey }")
                  v-list-tile-content
                    v-list-tile-title(v-text="header.display")
                  v-icon(:class="[sortOrder > 0 ? 'asc' : 'dsc']" dark) arrow_downward
        div.mt-3
          v-expansion-panel(popout).mb-2
            v-expansion-panel-content(v-for="grenade in filteredData" v-bind:key="grenade.id" hide-actions).large-panel
              div(slot="header")
                v-layout
                  v-flex.xs12.sm5.md4 {{ grenade.name }}
                  v-flex.hidden-xs-only.sm3.md2 {{ grenade.damage_amount }}{{ grenade.dd }}
                  v-flex.hidden-xs-only.sm4.md2 {{ grenade.damage_type }}
                  v-flex.hidden-sm-and-down.md2 {{ grenade.range }}
                  v-flex.hidden-sm-and-down.md2 {{ grenade.blast }}
              v-card.grey.lighten-3
                v-card-text
                  grenade-info(:grenade="grenade")
                v-card-actions
                  bookmark-button(:card="grenade" type="grenade" v-bind:props="{flat: true}")
    page-footer(:list="listName")
</template>

<script>
  import MeElement from '~/components/shared/MeElement.vue'
  import GrenadeInfo from '~/components/shared/GrenadeInfo.vue'
  import PageFooter from '~/components/phb/PageFooter.vue'
  import BookmarkButton from '~/components/shared/BookmarkButton'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      GrenadeInfo,
      MeElement,
      PageFooter,
      BookmarkButton
    },
    computed: {
      ...mapGetters(['getData']),
      filteredData () {
        let data = this.items
        let sortKey = this.sortKey
        let order = this.sortOrder
        let getDamage = (grenade) => {
          let diceCount = grenade.damage_amount ? parseInt(grenade.damage_amount, 10) : 0
          let diceType = grenade.dd ? parseInt(grenade.dd.replace(/\D/, ''), 10) : 0
          return diceCount * diceType
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            switch (sortKey) {
              case 'intensity':
                a = getDamage(a)
                b = getDamage(b)
                break
              case 'effect':
                a = a.damage_type
                b = b.damage_type
                break
              default:
                a = a[sortKey]
                b = b[sortKey]
            }
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    data () {
      return {
        items: [],
        listName: 'grenades',
        headers: [
          { key: 'name', display: 'Name', classes: 'xs12 sm5 md4' },
          { key: 'intensity', display: 'Intensity', classes: 'xs12 sm3 md2' },
          { key: 'effect', display: 'Damage/Effect', classes: 'xs12 sm4 md2' },
          { key: 'range', display: 'Range', classes: 'hidden-sm-and-down md2' },
          { key: 'blast', display: 'Blast', classes: 'hidden-sm-and-down md2' }
        ],
        sortKey: 'name',
        sortOrder: 1
      }
    },
    created () {
      this.items = this.getData(this.listName)
    },
    head () {
      return {
        title: 'Mass Effect 5e | Equipment - Grenades & Mines',
        meta: [
          { hid: 'description', name: 'description', content: 'Grenades offer an offensive boost while mines can be used like D&D traps.' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      sortBy (key) {
        if (this.sortKey === key) {
          this.sortOrder = this.sortOrder * -1
        } else {
          this.sortKey = key
          this.sortOrder = 1
        }
      }
    }
  }
</script>
