<template>
  <div>
    <v-card-text>
      <div class="text-right">
        <v-btn x-small outlined color="primary" @click="addCompanion">
          Add Companion
        </v-btn>
      </div>
    </v-card-text>
    <v-expansion-panels multiple mandatory focusable>
      <v-expansion-panel v-for="companion in companions" :key="companion.id">
        <v-expansion-panel-header>
          {{ companion.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0 companion-expansion-panel">
          <me-cs-companion-stat-block :companion="companion" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/companion')
export default {
  name: 'MeCsCompanion',
  computed: {
    ...mapGetters(['companions']),
    viewOnly () {
      return this.$store.state.character.viewOnly
    }
  },
  methods: {
    async addCompanion () {
      await this.$store.dispatch('character/companion/ADD_COMPANION')
    }
  }
}
</script>

<style>
  .companion-expansion-panel .v-expansion-panel-content__wrap {
    padding: 0px !important;
  }
</style>
