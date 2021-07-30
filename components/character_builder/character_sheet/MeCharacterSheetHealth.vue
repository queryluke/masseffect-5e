<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <me-character-sheet-barrier-slider />
      <me-character-sheet-health-circle />
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            :color="csBgColor('damage')"
            small
            :dark="!dark"
            :light="dark"
            @click="execDamage"
          >
            Damage
          </v-btn>
        </v-col>
        <v-col cols="6" offset="3">
          <v-text-field
            v-model="modder"
            outlined
            dense
            hide-details
            append-outer-icon="mdi-plus"
            prepend-icon="mdi-minus"
            @click:append-outer="modder++"
            @click:prepend="reduceModder"
          />
        </v-col>
        <v-col cols="12" class="d-flex justify-space-between px-12">
          <v-btn
            :color="csBgColor('hp')"
            small
            :dark="!dark"
            :light="dark"
            @click="execHeal"
          >
            Heal
          </v-btn>
          <v-btn
            :color="csBgColor('shields')"
            small
            :dark="!dark"
            :light="dark"
            @click="execRegen"
          >
            Regen
          </v-btn>
          <v-btn
            :color="csBgColor('temp')"
            small
            :dark="!dark"
            :light="dark"
            @click="execTempHp"
          >
            Temp HP
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <v-slider
            v-model="csMaxShields"
            :color="csBgColor('shields')"
            label="Max Shields"
            step="5"
            max="30"
          >
            Max Shields
          </v-slider>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      bypassShields: false,
      modder: 0,
      showEditMaxShields: false
    }
  },
  methods: {
    reduceModder () {
      this.modder = Math.max(0, Number.parseInt(this.modder) - 1)
    },
    execTempHp () {
      this.csTempHp = Math.max(this.csTempHp, this.modder, this.csCurrentTempHp + this.modder)
      this.csCurrentTempHp = this.csCurrentTempHp + this.modder
    },
    execRegen () {
      this.csCurrentShields = Math.min(this.csMaxShields, this.modder + this.csCurrentShields)
    },
    execHeal () {
      this.csHitPointsLost = Math.max(0, this.csHitPointsLost - this.modder)
    },
    execDamage () {
      let dmgLeft = Number.parseInt(this.modder, 10)
      if (this.csTempHp > 0) {
        const potentialTempHpDmg = Math.min(this.csCurrentTempHp, this.modder)
        this.csCurrentTempHp = Math.max(0, this.csCurrentTempHp - potentialTempHpDmg)
        if (this.csCurrentTempHp === 0) {
          this.csTempHp = 0
        }
        dmgLeft -= potentialTempHpDmg
      }
      if (this.csCurrentShields > 0) {
        const potentialShieldDmg = Math.min(this.csCurrentShields, dmgLeft)
        this.csCurrentShields = Math.max(this.csCurrentShields - dmgLeft, 0)
        dmgLeft -= potentialShieldDmg
      }
      if (dmgLeft > 0) {
        this.csHitPointsLost = Math.min(this.csMaxHp, this.csHitPointsLost + dmgLeft)
      }
    }
  }
}
</script>
