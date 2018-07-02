<template lang="pug">
  div
    div.text-xs-right.mb-2.hidden-lg-and-up
      v-menu(bottom left)
        span(slot="activator").subheading Sort by: {{ sortBy.display }}
        v-list
          v-list-tile(v-for="(sort, index) of sortOptions" v-bind:key="index" v-on:click="sortBy = sort")
            v-list-tile-title {{ sort.display }} #[v-icon(v-if="sort.key === sortBy.key") check]
      v-btn(@click="order = order * -1" icon small)
        v-icon {{ order > 0 ? 'arrow_downward' : 'arrow_upward' }}
    v-layout(row).pl-4.pr-5.my-2.hidden-md-and-down
      v-flex(v-for="header in headers" v-bind:class="header.classes")
        button(v-if="header.sort" v-on:click="sort(header.sort)").body-2 {{ header.name }}
          v-icon(v-if="sortBy.key === header.sort" size="16").ml-3 {{ order > 0 ? 'arrow_downward' : 'arrow_upward' }}
        span(v-else).body-2 {{ header.name }}
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="spell in spells" v-bind:spell="spell" v-bind:key="spell.id")
        div(slot="header")
          v-layout.spell-header
            v-flex.xs4.sm3.lg2
              spell-type(:spell="spell")
            v-flex.xs8.sm9.lg2
              strong {{ spell.name }}
            v-flex.hidden-md-and-down.lg2
              spell-duration(:spell="spell")
            v-flex.hidden-md-and-down.lg2
              spell-range-area(:spell="spell")
            v-flex.hidden-md-and-down.lg2 {{ spell.attack_type[0] }}
              span(v-if="spell.attack_type.length > 1") (...)
            v-flex.hidden-md-and-down.lg2
              spell-damage-effect(:spell="spell")
        v-card.grey.lighten-3
          v-card-text
            spell-info(:spell="spell").mt-2
          v-card-actions
            bookmark-button(:card="spell" type="spell" v-bind:props="{flat: true}")
</template>

<script>
  import SpellType from '~/components/spell/SpellType.vue'
  import SpellDuration from '~/components/spell/SpellDuration.vue'
  import SpellRangeArea from '~/components/spell/SpellRangeArea.vue'
  import SpellDamageEffect from '~/components/spell/SpellDamageEffect.vue'
  import SpellInfo from '~/components/spell/SpellInfo.vue'
  import BookmarkButton from '~/components/shared/BookmarkButton.vue'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    components: {
      SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect, SpellInfo, BookmarkButton
    },
    computed: {
      ...mapGetters('spellList', {
        getOrder: 'order',
        getSortBy: 'sortBy'
      }),
      order: {
        get () {
          return this.getOrder
        },
        set (value) {
          this.updateSpellList({key: 'order', value: value})
        }
      },
      sortBy: {
        get () {
          return this.getSortBy
        },
        set (value) {
          this.updateSpellList({key: 'sortBy', value: value})
        }
      }
    },
    data () {
      return {
        sortOptions: [
          { key: 'name', display: 'Name' },
          { key: 'type', display: 'Spell Level' }
        ],
        headers: [
          { name: 'Type/Level', sort: 'type', classes: 'xs4 sm3 lg2' },
          { name: 'Name', sort: 'name', classes: 'xs8 sm9 lg2' },
          { name: 'Duration', classes: 'hidden-md-and-down lg2' },
          { name: 'Range (Area)', classes: 'hidden-md-and-down lg2' },
          { name: 'Attack', classes: 'hidden-md-and-down lg2' },
          { name: 'Damage/Effect', classes: 'hidden-md-and-down lg2' }
        ]
      }
    },
    methods: {
      ...mapActions('spellList', ['updateSpellList']),
      sort (key) {
        const currentKey = this.sortBy.key
        const newSort = this.sortOptions.find(so => so.key === key)
        if (currentKey === newSort.key) {
          this.order = this.order * -1
        } else {
          this.sortBy = newSort
        }
      }
    },
    props: ['spells']
  }
</script>

