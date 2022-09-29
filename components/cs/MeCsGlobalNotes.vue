<template>
  <div>
    <v-chip
      v-for="(note, index) of notes"
      :key="`gpn-${index}`"
      outlined
      color="primary"
      x-small
      class="mx-1"
      @click="showItem(note)"
    >
      <v-icon left size="14">
        {{ note.attack ? note.attack === 'ranged' ? 'mdi-target' : 'mdi-sword' : 'mdi-alert-circle' }}
      </v-icon>
      <me-html :content="value(note)" class="text-caption" />
    </v-chip>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/mechanics')

export default {
  name: 'MeCsGlobalNotes',
  props: {
    subType: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    ...mapGetters(['mechanics']),
    notes () {
      return this.mechanics.filter(i => i.type === 'global-note' && (this.subType ? i.subType === this.subType : true))
    }
  },
  methods: {
    showItem (note) {
      if ((note.moreInfo?.model && note.moreInfo?.id) || note.moreInfo?.toDisplay) {
        const component = note.component || note.moreInfo?.component || 'me-cs-more-info'
        const value = note.moreInfo?.toDisplay || note
        this.$store.commit('character/navigation/SET', { key: 'toDisplay', value })
        this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', component)
      }
    },
    value (note) {
      if (note.value === 'Sneak Attack') {
        const infil = this.$store.getters['character/klasses/selectedKlasses'].find(i => i.id === 'infiltrator')
        const levels = infil.levels
        const numDice = Math.floor((levels + 1) / 2) || 1
        const shadow = infil.subclass === 'shadow' ? ' (d8 w/ melee)' : ''
        const sniper = infil.subclass === 'sniper' && levels >= 17 ? ` (${numDice + 3}d6 w/ sniper rifles)` : ''
        return `Sneak Attack: ${numDice}d6${shadow}${sniper}`
      } else {
        return note.value
      }
    }
  }
}
</script>
