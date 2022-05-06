<template>
  <div>
    <v-chip
      v-for="(note, index) of notes"
      :key="`gpn-${index}`"
      outlined
      color="primary"
      x-small
      @click="showItem(note)"
    >
      <v-icon left size="14">
        mdi-alert-circle
      </v-icon>
      {{ note.name }}
    </v-chip>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/mechanics')

export default {
  name: 'MeCsPowersGlobalNotes',
  computed: {
    ...mapGetters(['mechanics']),
    notes () {
      return this.mechanics.filter(i => i.type === 'global-power-note')
    }
  },
  methods: {
    showItem (note) {
      if (!note.moreInfo?.model || !note.moreInfo?.id) {
        return
      }
      const component = note.component || 'me-cs-more-info'
      this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: note })
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', component)
    }
  }
}
</script>
