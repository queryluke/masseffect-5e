<template>
  <v-card outlined class="my-2" elevation="0">
    <v-card class="pa-2" elevation="0" color="transparent" @click="showPower = !showPower">
      <v-row align="center" :no-gutters="$vuetify.breakpoint.smAndDown">
        <v-col cols="5">
          <div class="text-truncate">
            {{ item.power.name }}
          </div>
          <div v-if="item.csData.advancement" class="text-caption mt-n2 font-italic text-truncate">
            Adv: {{ item.power.advancements[item.csData.advancement].name }}
          </div>
        </v-col>
        <v-col cols="2" class="text-center">
          {{ castingTime }}
        </v-col>
        <v-col cols="2" class="text-center">
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
          <div v-else>
            -
          </div>
        </v-col>
        <v-col cols="3" md="3" class="text-subtitle-2 text-center">
          <me-power-range :range="item.power.range" :aoe="item.power.aoe" :size="10" :split="$vuetify.breakpoint.smAndDown" />
        </v-col>
      </v-row>
    </v-card>
    <div class="d-flex justify-end">
      <me-character-sheet-use-tracker v-if="uses" :used="timesUsed" :uses="uses" @increment="timesUsed++" @decrement="timesUsed--" />
    </div>
    <v-expand-transition>
      <div v-if="showPower">
        <v-divider />
        <v-card-text class="mb-0">
          <me-power-info :item="item.power" />
        </v-card-text>
      </div>
    </v-expand-transition>
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
      showPower: false
    }
  },
  computed: {
    castingTime () {
      return this.item.power.castingTimes.map(i => this.$t(`times.${i}_abbr`)).join(' | ')
    },
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
