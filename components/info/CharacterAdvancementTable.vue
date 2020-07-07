<template lang="pug">
  v-data-table(v-bind:headers="headers" v-bind:items="items" hide-default-footer :items-per-page="-1")
    template(slot="items" slot-scope="props")
      td {{ props.item.xp | groupDigits(',') }}
      td {{ props.item.level | ordinal }}
      td +{{ props.item.bonus }}
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Experience Points', value: 'xp', sortable: false, align: 'left' },
        { text: 'Level', value: 'level', sortable: false, align: 'left' },
        { text: 'Proficiency Bonus', value: 'bonus', sortable: false, align: 'left' }
      ],
      items: []
    }
  },
  created () {
    this.items = this.$store.dispatch('FETCH_DATA', 'character-progression')
  }
}
</script>
