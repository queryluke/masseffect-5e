<template lang="pug">
  div
    div.text-xs-right.mx-4.mb-2
      v-menu(bottom left).hidden-md-and-up
        span(slot="activator") Sort by: {{ sortBy.display }}
        v-list
          v-list-tile(v-for="(sort, index) of sortOptions" v-bind:key="index")
            v-list-tile-title {{ sort.display }} #[v-icon(v-if="sort.key === sortBy.key") check]
      v-btn(@click="order = order * -1" icon)
        v-icon(v-if="order > 0") arrow_downward
        v-icon(v-if="order < 0") arrow_upward
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
  import SpellType from '~/components/shared/SpellType.vue'
  import SpellDuration from '~/components/shared/SpellDuration.vue'
  import SpellRangeArea from '~/components/shared/SpellRangeArea.vue'
  import SpellDamageEffect from '~/components/shared/SpellDamageEffect.vue'
  import SpellInfo from '~/components/shared/SpellInfo.vue'
  import BookmarkButton from '~/components/shared/BookmarkButton.vue'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    components: {
      SpellType, SpellDuration, SpellRangeArea, SpellDamageEffect, SpellInfo, BookmarkButton
    },
    computed: {
      ...mapGetters(['getSpellListOptions']),
      sortBy: {
        get () {
          return this.getSpellListOptions('sortBy')
        },
        set (value) {
          this.updateSpellListOptions({key: 'sortBy', value})
        }
      },
      order: {
        get () {
          return this.getSpellListOptions('order')
        },
        set (value) {
          this.updateSpellListOptions({key: 'order', value})
        }
      }
    },
    created () {
      // TODO: sort should go back to the filtered part of spells.vue
      let sortBy = this.sortBy.key
      let order = this.order
      this.spells.sort(function (a, b) {
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
    },
    data () {
      return {
        sortOptions: [
          { key: 'name', display: 'Name' },
          { key: 'type', display: 'Spell Level' }
        ]
      }
    },
    methods: {
      ...mapActions(['updateSpellListOptions']),
      sortSpells () {

      }
    },
    props: ['spells']
  }
</script>

