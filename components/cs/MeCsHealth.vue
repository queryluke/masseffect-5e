<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex justify-center justify-md-space-between justify-lg-space-around">
        <me-cs-health-barrier-slider />
        <div>
          <me-cs-health-circle />
          <div class="text-center">
            <v-btn
              x-small
              color="blue"
              class="mt-1"
              @click="execRegen"
            >
              regen ({{ character.settings.regen }})
            </v-btn>
          </div>
          <div class="d-flex justify-end justify-md-space-around justify-lg-end align-center mt-5">
            <div style="max-width: 125px">
              <v-text-field
                v-model="modder"
                outlined
                dense
                hide-details
                append-outer-icon="mdi-plus"
                prepend-icon="mdi-minus"
                @click:append-outer="modder++; healthTrigger = true"
                @click:prepend="modder--; healthTrigger = true"
                @focus="healthTrigger = true"
              />
            </div>
            <v-btn id="healthTriggerMenu" fab x-small class="ml-6 ml-md-0 ml-lg-6 mr-n2 mr-md-0 mr-lg-n2" @click="healthTrigger = !healthTrigger">
              <v-icon>
                {{ healthTrigger ? 'mdi-close' : 'mdi-chevron-down' }}
              </v-icon>
            </v-btn>
          </div>
          <v-scale-transition leave-absolute>
            <v-card v-show="healthTrigger" style="position: absolute; z-index: 2" width="200">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <v-btn fab x-small title="Bypass Shields" :color="bypassShields ? 'primary' : undefined" @click="bypassShields = !bypassShields">
                    <v-icon>
                      {{ bypassShields ? 'mdi-shield-off' : 'mdi-shield-off-outline' }}
                    </v-icon>
                  </v-btn>
                  <v-btn
                    :color="csBgColor('damage')"
                    small
                    :dark="!dark"
                    :light="dark"
                    @click="execDamage"
                  >
                    Damage
                  </v-btn>
                  <v-btn fab x-small title="2x Shields" :color="doubleShields ? 'primary' : undefined" @click="doubleShields = !doubleShields">
                    <v-icon class="mx-0" :color="doubleShields ? doubleShieldsNumberColor[0] : doubleShieldsNumberColor[1]" style="z-index: 1; position: absolute">
                      mdi-numeric-2
                    </v-icon>
                    <v-icon>
                      {{ doubleShields ? 'mdi-shield-remove' : 'mdi-shield-remove-outline' }}
                    </v-icon>
                  </v-btn>
                </div>
                <v-divider class="mt-3 mb-1" />
                <div class="text-center my-2">
                  <v-btn
                    :color="csBgColor('hp')"
                    small
                    :dark="!dark"
                    :light="dark"
                    @click="execHeal"
                  >
                    Heal
                  </v-btn>
                </div>
                <div class="text-center my-2">
                  <v-btn
                    :color="csBgColor('shields')"
                    small
                    :dark="!dark"
                    :light="dark"
                    @click="execCustomRegen"
                  >
                    Regen
                  </v-btn>
                </div>
                <div class="text-center my-2">
                  <v-btn
                    :color="csBgColor('temp')"
                    small
                    :dark="!dark"
                    :light="dark"
                    @click="execTempHp"
                  >
                    Temp HP
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-scale-transition>
        </div>
      </v-col>
      <v-col cols="12">
        <v-card
          outlined
          min-height="100px"
          class="d-flex justify-space-around mx-auto"
          :min-width="$vuetify.breakpoint.mdOnly ? 280 : undefined"
          max-width="500"
        >
          <div style="width: 49%">
            <v-card-text class="pl-2 pr-1 pt-0 pb-3">
              <me-cs-defenses />
            </v-card-text>
          </div>
          <v-divider vertical />
          <div style="width: 49%">
            <v-card-text class="pl-2 pr-1 pt-0 pb-3">
              <me-cs-conditions />
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      bypassShields: false,
      doubleShields: false,
      modderState: 0,
      healthTrigger: false,
      htState: false
    }
  },
  computed: {
    modder: {
      get () {
        return this.modderState
      },
      set (value) {
        let parsed = Number.parseInt(value, 10)
        if (Number.isNaN(parsed)) {
          return
        }
        if (parsed < 0) {
          parsed = 0
        }
        this.modderState = parsed
      }
    },
    doubleShieldsNumberColor () {
      return this.$store.getters['user/darkMode'] ? ['grey darken-2', 'white'] : ['black', 'black']
    }
  },
  methods: {
    getModder () {
      let value = Number.parseInt(this.modderState, 10)
      if (Number.isNaN(value)) {
        this.modder = 0
        return 0
      }
      value = Math.max(value, 0)
      this.modder = value
      return value
    },
    execTempHp () {
      const modder = this.getModder()
      this.csTempHp = Math.max(this.csTempHp, modder, this.csCurrentTempHp + modder)
      this.csCurrentTempHp = this.csCurrentTempHp + modder
      this.modderState = 0
    },
    execRegen () {
      this.csCurrentShields = Math.min(this.csMaxShields, this.character.settings.regen + this.csCurrentShields)
    },
    execCustomRegen () {
      const modder = this.getModder()
      this.csCurrentShields = Math.min(this.csMaxShields, modder + this.csCurrentShields)
      this.modderState = 0
    },
    execHeal () {
      const modder = this.getModder()
      this.csHitPointsLost -= Math.min(modder, this.csHitPointsLost)
      this.modderState = 0
    },
    execDamage () {
      let dmgLeft = this.getModder()
      if (this.csTempHp > 0) {
        const potentialTempHpDmg = Math.min(this.csCurrentTempHp, dmgLeft)
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
      this.modderState = 0
    }
  }
}
</script>
