<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <div>
          <div>
            {{ name }}
          </div>
          <div class="text-caption mt-n1">
            Remaining Uses: {{ remainingUses }}
          </div>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="text-right">
          <v-btn small color="primary" @click="remainingUses = Math.max(0, remainingUses - 1)">
            Use
          </v-btn>
        </div>
        <div v-if="type === 'gear'">
          {{ item.notes }}
        </div>
        <me-html :content="itemData.html" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    itemData () {
      return this[this.type].find(i => i.id === this.item.id)
    },
    name () {
      return this.itemData.name
    },
    remainingUses: {
      get () {
        return this.type === 'gear' ? this.item.uses : 0 // TODO: this.itemData.mechanics.featureMax - this.character.currentStats.featureTimesUsed[item.id] || 0
      },
      set (value) {
        if (this.type === 'gear') {
          const changedItem = { ...this.item, uses: value }
          this.removeEquipment('gear', this.item.uuid, changedItem)
        } else {
          // TODO: this.$store.commit('cb/UPDATE_CHARACTER', {cid: this.cid, attr: `currentStats.featureTimesUsed.${this.item.id}`, value }
        }
      }
    }
  }
}
</script>
