<template lang="pug">
  div
    sort-options(:headers="headers" defaultSort="1")
    v-expansion-panel.mb-2
      v-expansion-panel-content(v-for="item in items" v-bind:key="item.id")
        div(slot="header")
          v-layout
            v-flex(:class="headers[0].classes")
              weapon-type(:weapon="item")
            v-flex(:class="headers[1].classes") #[strong {{ item.name }}]
            v-flex(:class="headers[2].classes") {{ item.damage }}
            v-flex(:class="headers[3].classes") {{ item.heat }}
            v-flex(:class="headers[4].classes") {{ item | weaponRange }}
            v-flex(:class="headers[5].classes") {{ item.weight }}
            v-flex(:class="headers[6].classes") {{ item.cost | groupDigits(',') }}
        v-card.grey.lighten-3
          v-card-text
            weapon-info(:weapon="item").mt-2
          v-card-actions
            bookmark-button(:card="item" type="weapon" v-bind:props="{flat: true}")
</template>

<script>
  import WeaponInfo from '~/components/weapon/WeaponInfo.vue'
  import WeaponType from '~/components/weapon/WeaponType.vue'
  import BookmarkButton from '~/components/BookmarkButton.vue'
  import SortOptions from '~/components/list/Sort.vue'

  export default {
    components: {
      WeaponInfo, WeaponType, BookmarkButton, SortOptions
    },
    data () {
      return {
        headers: [
          { key: 'type', label: 'Type', classes: 'xs4 sm3 lg1', sortable: true },
          { key: 'name', label: 'Name', classes: 'xs8 sm9 lg3', sortable: true },
          { key: 'damage', label: 'Damage', classes: 'hidden-md-and-down lg2', sortable: true },
          { key: 'heat', label: 'Heat', classes: 'hidden-md-and-down lg2', sortable: true },
          { key: 'range', label: 'Range', classes: 'hidden-md-and-down lg2', sortable: true },
          { key: 'weight', label: 'Weight', classes: 'hidden-md-and-down lg2', sortable: true },
          { key: 'cost', label: 'Cost', classes: 'hidden-md-and-down lg2', sortable: true }
        ]
      }
    },
    props: ['items']
  }
</script>

