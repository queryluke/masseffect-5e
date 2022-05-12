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
      <me-html :content="note.value" class="text-caption" />
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
