<template lang="pug">
  div
    div.text-xs-right.mb-2.hidden-lg-and-up
      v-menu(bottom left)
        span(slot="activator").subheading Sort by: {{ sortBy.display }}
        v-list
          v-list-tile(v-for="(sort, index) of headers" v-bind:key="index" v-on:click="sortBy = sort")
            v-list-tile-title {{ sort.display }} #[v-icon(v-if="sort.key === sortBy.key") check]
      v-btn(@click="order = order * -1" icon small)
        v-icon {{ order > 0 ? 'arrow_downward' : 'arrow_upward' }}
    v-layout(row).pl-4.pr-5.my-2.hidden-md-and-down
      v-flex(v-for="(header, index) in headers" v-bind:key="index" v-bind:class="header.classes")
        button(@click="sort(header.key)").body-2 {{ header.display }}
          v-icon(v-if="sortBy.key === header.key" size="16").ml-2 {{ order > 0 ? 'arrow_downward' : 'arrow_upward' }}
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="weapon in weapons" v-bind:weapon="weapon" v-bind:key="weapon.id")
        div(slot="header")
          v-layout.spell-header
            v-flex.xs4.sm3.lg1
              weapon-type(:weapon="weapon")
            v-flex.xs8.sm9.lg3
              strong {{ weapon.name }}
            v-flex.hidden-md-and-down.lg2
              span {{ weapon.damage }}
            v-flex.hidden-md-and-down.lg2 {{ weapon.heat }}
            v-flex.hidden-md-and-down.lg2 {{ weapon | weaponRange }}
            v-flex.hidden-md-and-down.lg2 {{ weapon.weight }}
            v-flex.hidden-md-and-down.lg2 {{ weapon.cost | groupDigits(',') }}
        v-card.grey.lighten-3
          v-card-text
            weapon-info(:weapon="weapon").mt-2
          v-card-actions
            bookmark-button(:card="weapon" type="weapon" v-bind:props="{flat: true}")
</template>

<script>
  import WeaponInfo from '~/components/weapon/WeaponInfo.vue'
  import WeaponType from '~/components/weapon/WeaponType.vue'
  import BookmarkButton from '~/components/BookmarkButton.vue'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    components: {
      WeaponInfo, WeaponType, BookmarkButton
    },
    computed: {
      ...mapGetters('weaponList', {
        getOrder: 'order',
        getSortBy: 'sortBy'
      }),
      order: {
        get () {
          return this.getOrder
        },
        set (value) {
          this.updateList({key: 'order', value: value})
        }
      },
      sortBy: {
        get () {
          return this.getSortBy
        },
        set (value) {
          this.updateList({key: 'sortBy', value: value})
        }
      }
    },
    data () {
      return {
        headers: [
          { key: 'type', display: 'Type', classes: 'xs4 sm3 lg1' },
          { key: 'name', display: 'Name', classes: 'xs8 sm9 lg3' },
          { key: 'damage', display: 'Damage', classes: 'hidden-md-and-down lg2' },
          { key: 'heat', display: 'Heat', classes: 'hidden-md-and-down lg2' },
          { key: 'range', display: 'Range', classes: 'hidden-md-and-down lg2' },
          { key: 'weight', display: 'Weight', classes: 'hidden-md-and-down lg2' },
          { key: 'cost', display: 'Cost', classes: 'hidden-md-and-down lg2' }
        ]
      }
    },
    methods: {
      ...mapActions('weaponList', ['updateList']),
      sort (key) {
        const currentKey = this.sortBy.key
        const newSort = this.headers.find(so => so.key === key)
        if (currentKey === newSort.key) {
          this.order = this.order * -1
        } else {
          this.sortBy = newSort
        }
      }
    },
    props: ['weapons']
  }
</script>

