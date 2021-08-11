<template>
  <v-card outlined class="pl-2 pt-1">
    <v-row align="center" :no-gutters="$vuetify.breakpoint.smAndDown">
      <v-col cols="4" md="3">
        <div class="text-truncate d-inline-block mt-1">
          {{ item.power.name }}
        </div>
        <div v-if="item.csData.advancement && $vuetify.breakpoint.mdAndUp" class="text-caption mt-n2 font-italic">
          Adv: {{ item.power.advancements[item.csData.advancement].name }}
        </div>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3">
        <me-character-sheet-use-tracker v-if="uses" :used="timesUsed" :uses="uses" @increment="timesUsed++" @decrement="timesUsed--" />
      </v-col>
      <v-col cols="3" md="2" class="text-center">
        <div v-if="isAttackPower" class="text-h6">
          +{{ toHit }}
        </div>
        <div v-else-if="isSavePower">
          <div class="text-overline mt-n2">
            <small>
              {{ powerSaveType }}
            </small>
          </div>
          <div class="text-body-2 mt-n2">
            DC {{ saveMod }}
          </div>
        </div>
      </v-col>
      <v-col cols="4" md="3" class="text-subtitle-2">
        <me-power-range :range="item.power.range" :aoe="item.power.aoe" :size="10" />
      </v-col>
      <v-col cols="1">
        <v-icon size="18" class="mt-n1" @click="powerInfoDialog = true">
          mdi-information-outline
        </v-icon>
      </v-col>
    </v-row>
    <v-row v-if="$vuetify.breakpoint.smAndDown" justify="space-between" no-gutters>
      <v-col cols="auto">
        <div v-if="item.csData.advancement" class="text-caption font-italic">
          Adv: {{ item.power.advancements[item.csData.advancement].name }}
        </div>
      </v-col>
      <v-col cols="auto" class="text-right">
        <me-character-sheet-use-tracker v-if="uses" :used="timesUsed" :uses="uses" @increment="timesUsed++" @decrement="timesUsed--" />
      </v-col>
    </v-row>
    <me-standard-dialog :title="item.power.name" :shown="powerInfoDialog" @close="powerInfoDialog = false">
      <me-power-info :item="item.power" />
    </me-standard-dialog>
  </v-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      powerInfoDialog: false
    }
  },
  computed: {
    uses () {
      return this.item.csData.max || this.item.power.uses || 0
    },
    isAttackPower () {
      return (this.item.power.attack.ranged || this.item.power.attack.melee) && this.item.power.id !== 'hawk-missile-launcher'
    },
    isSavePower () {
      return Object.values(this.item.power.save).includes(true)
    },
    powerSaveType () {
      const ability = Object.entries(this.item.power.save).find(i => i[1])[0]
      return this.$t(`abilities.${ability}.abbr`)
    },
    atkMod () {
      let ability
      if (this.item.power.type === 'combat') {
        ability = this.item.power.mod
      } else {
        ability = this.item.csData.mod || this.character.settings.powerModAbility || this.csStartingClassPowerAbility
      }
      if (ability === 'noMod') {
        return 0
      }
      return this.absMod(ability)
    },
    saveMod () {
      return 8 + this.atkMod + this.profBonus
    },
    toHit () {
      return this.atkMod + this.profBonus
    },
    timesUsed: {
      get () {
        return this.character.currentStats.featuresTimesUsed[this.item.csData.id] || 0
      },
      set (value) {
        const setValue = value > this.uses ? this.uses : value < 0 ? 0 : value
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.cid, attr: `currentStats.featuresTimesUsed.${this.item.csData.id}`, value: setValue })
      }
    }
  }
}
</script>
