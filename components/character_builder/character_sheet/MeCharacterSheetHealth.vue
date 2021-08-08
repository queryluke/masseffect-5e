<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center">
      <me-character-sheet-barrier-slider />
      <me-character-sheet-health-circle />
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-around align-content-start">
            <v-switch
              v-model="bypassShields"
              hint="Bypass Shields"
              dense
              persistent-hint
              class="mt-0"
            />

            <v-btn
              :color="csBgColor('damage')"
              small
              :dark="!dark"
              :light="dark"
              class="mr-5"
              @click="execDamage"
            >
              Damage
            </v-btn>
            <v-switch
              v-model="doubleShields"
              hint="2x Shields"
              dense
              persistent-hint
              class="mt-0"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="8" offset="3" offset-md="2">
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
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-space-around">
          <v-btn
            :color="csBgColor('hp')"
            small
            :dark="!dark"
            :light="dark"
            class="mx-1"
            @click="execHeal"
          >
            Heal
          </v-btn>
          <v-btn
            :color="csBgColor('shields')"
            small
            :dark="!dark"
            :light="dark"
            class="mx-1"
            @click="execRegen"
          >
            Regen ({{ character.settings.regen }})
          </v-btn>
          <v-btn
            :color="csBgColor('temp')"
            small
            :dark="!dark"
            :light="dark"
            class="mx-1"
            @click="execTempHp"
          >
            Temp HP
          </v-btn>
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
      doubleShields: false,
      modder: 0
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
      this.csCurrentShields = Math.min(this.csMaxShields, this.character.settings.regen + this.csCurrentShields)
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
      if (this.csCurrentShields > 0 && !this.bypassShields) {
        const potentialShieldDmg = Math.min(this.csCurrentShields, (this.doubleShields ? dmgLeft * 2 : dmgLeft))
        this.csCurrentShields = Math.max(this.csCurrentShields - potentialShieldDmg, 0)
        dmgLeft = this.doubleShields ? Math.floor(((dmgLeft * 2) - potentialShieldDmg) / 2) : dmgLeft - potentialShieldDmg
      }
      if (dmgLeft > 0) {
        this.csHitPointsLost = Math.min(this.csMaxHp, this.csHitPointsLost + dmgLeft)
      }
    }
  }
}
</script>
