<template lang="pug">
  v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions)
    template(slot="items" slot-scope="props")
      td {{ props.item.xp | groupDigits(',') }}
      td {{ props.item.level | ordinal }}
      td +{{ props.item.bonus }}
</template>

<script>
import characterProgression from '~/static/data/character_progression.json'

export default {
  data () {
    return {
      headers: [
        { text: 'Experience Points', value: 'xp', sortable: false, align: 'left' },
        { text: 'Level', value: 'level', sortable: false, align: 'left' },
        { text: 'Proficiency Bonus', value: 'bonus', sortable: false, align: 'left' }
      ],
      items: characterProgression
    }
  }
}
</script>
