<template>
  <v-container>
    <me-list-page
      :pending="$fetchState.pending"
      rule-link="/manual/equipment#weapons"
      model="weapons"
      component="MeWeaponList"
      default-sort="name"
      :custom-sort="customSort"
    />
  </v-container>
</template>

<script>
import { AverageFromDie } from '~/mixins/averageFromDie'

export default {
  mixins: [AverageFromDie],
  layout: 'list',
  async fetch () {
    this.$store.dispatch('SET_META', {
      title: this.$tc('weapon_title', 2),
      subTitle: this.$tc('equipment_title', 2),
      description: this.$t('meta.weapons')
    })
    await this.$store.dispatch('FETCH_LOTS', ['weapons', 'weapon-properties'])
  },
  methods: {
    customSort (items, sortBy, sortDesc) {
      const desc = sortDesc ? 1 : -1
      items.sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]
        switch (sortBy) {
          case 'type':
          case 'name':
            aVal = aVal.toUpperCase()
            bVal = bVal.toUpperCase()
            break
          case 'damage':
            aVal = this.averageFromDie(a.damage.dieType, a.damage.dieCount)
            bVal = this.averageFromDie(b.damage.dieType, b.damage.dieCount)
            break
          case 'range':
            aVal = a.range.short
            bVal = b.range.short
            break
          default:
            aVal = a[sortBy]
              ? typeof a[sortBy] === 'number'
                ? a[sortBy]
                : parseInt(a[sortBy].replace(/\D/, ''), 10)
              : 0
            bVal = b[sortBy]
              ? typeof b[sortBy] === 'number'
                ? b[sortBy]
                : parseInt(b[sortBy].replace(/\D/, ''), 10)
              : 0
        }
        return aVal === bVal
          ? a.id > b.id ? desc : desc * -1
          : aVal > bVal ? desc : desc * -1
      })
      return items
    }
  }
}
</script>
