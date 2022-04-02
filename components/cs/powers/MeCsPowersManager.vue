<template>
  <v-expansion-panels flat tile>
    <template v-for="klass in klasses">
      <me-cs-klass-power-select :key="klass.id" :klass="klass" />
    </template>
    <!-- TEMP: old builder -->
    <v-expansion-panel v-if="unlinkedPowers.length">
      <v-expansion-panel-header>
        Powers Not Linked To a Class ({{ unlinkedPowers.length }})
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <template v-for="item in unlinkedPowers">
          <me-cs-power-select-card
            :key="item.id"
            :item="item"
            @togglePower="removeUnlinkedPower"
          />
        </template>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsPowersManager',
  computed: {
    ...mapGetters({ klasses: 'klasses/klasses', character: 'character' }),
    unlinkedPowers () {
      return this.character.powers.filter(i => !i.klass).map((i) => {
        return {
          ...this.$store.getters.getItem('powers', i.id),
          ...i,
          learned: true
        }
      })
    }
  },
  methods: {
    removeUnlinkedPower (id) {
      const cloned = this.character.powers.slice()
      const index = cloned.findIndex(i => i.id === id && !i.klass)
      if (index > -1) {
        cloned.splice(index, 1)
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: 'powers', value: cloned })
      }
    }
  }
}
</script>
