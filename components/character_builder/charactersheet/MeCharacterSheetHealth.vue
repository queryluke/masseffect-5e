<template>
  <div>
    <v-row class="pt-5">
      <v-col>
        <me-character-sheet-health-circle v-bind="{ ...hpData, current, maximum, temporary, shields }" />
      </v-col>
      <v-col class="heal-btns d-flex justify-center">
        <div class="btn-stack">
          <v-btn
            class="white--text ma-1"
            :disabled="!healthMod"
            color="secondary accent-3"
            small="small"
            @click="addHitPoints"
          >
            Heal
          </v-btn>
          <v-btn
            class="white--text ma-1"
            :disabled="!healthMod"
            color="#FF6600"
            small="small"
            @click="addTHP"
          >
            THP
          </v-btn>
          <v-btn
            class="white--text ma-1"
            :disabled="!healthMod"
            color="blue accent-3"
            small="small"
            @click="addShields"
          >
            Shields
          </v-btn>
        </div>
      </v-col>
      <v-col class="text-center">
        <v-text-field
          class="my-2"
          outlined
          single-line
          hide-details
          type="number"
          min="0"
          v-model.number="healthMod"
        ></v-text-field>
        <v-btn
          class="white--text"
          :disabled="!healthMod"
          color="secondary accent-3"
          small
          @click="subtractHitPoints"
        >
          <v-icon>mdi-skull</v-icon> Damage
        </v-btn>
        <v-checkbox
          label="Bypass Shields"
          v-model="bypassShields"
        >Bypass Shields</v-checkbox>
      </v-col>
      <v-col>
        Barrier Ticks
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MeCharacterSheetHealthCircle from './MeCharacterSheetHealthCircle.vue'
export default {
  components: { MeCharacterSheetHealthCircle },
  data () {
    return {
      healthMod: 0,
      bypassShields: false
    }
  },
  methods: {
    addHitPoints () {
      const totalHp = Math.min(this.maximum, this.current + this.healthMod)
      const missingHp = this.maximum - totalHp
      this.hpData = {
        attr: 'currentStats.hitPointsLost',
        val: missingHp
      }
    },
    addTHP () {
      this.hpData = {
        attr: 'currentStats.temporaryHitPoints',
        val: this.healthMod + this.temporary
      }
    },
    addShields () {
      this.hpData = {
        attr: 'currentStats.shields.value',
        val: Math.min(this.shields.value + this.healthMod, this.shields.max)
      }
    },
    subtractHitPoints () {
      let hpDown = this.healthMod // Shields, then THP, then HP
      if (this.shields.value > 0 && !this.bypassShields) {
        const shieldsDiff = this.shields.value - hpDown
        this.hpData = {
          attr: 'currentStats.shields.value',
          val: Math.max(0, shieldsDiff)
        }
        hpDown = shieldsDiff < 0 ? -shieldsDiff : 0
      }
      if (this.temporary > 0) {
        const tempDiff = this.temporary - hpDown
        this.hpData = {
          attr: 'currentStats.temporaryHitPoints',
          val: Math.max(0, tempDiff)
        }
        hpDown = tempDiff < 0 ? -tempDiff : 0
      }
      const totalHp = Math.max(0, this.current - hpDown)
      const missingHp = this.maximum - totalHp
      this.hpData = {
        attr: 'currentStats.hitPointsLost',
        val: missingHp
      }
    }
  },
  computed: {
    character () {
      const char = this.$store.getters['cb/characters'][this.$route.query.cid] || {}
      return char.character
    },
    hpData: {
      get () {
        return this.$store.getters['cb/getCharacterHealth'](this.$route.query.cid)
      },
      set (value) {
        this.$store.commit('cb/UPDATE_CHARACTER', {
          cid: this.$route.query.cid,
          attr: value.attr,
          value: value.val
        })
      }
    },
    current () {
      return this.maximum - this.hpData.hitPointsLost
    },
    maximum () {
      return this.hpData.hitPointsMax
    },
    temporary () {
      return this.hpData.temporaryHitPoints || 0
    },
    shields () {
      return this.hpData.shields
    }
  }
}
</script>

<style lang="scss">
  .btn-stack {
    display: flex;
    flex-direction: column;
  }
  .heal-btns {
    .v-btn {
      width: 80px;
    }
  }
</style>
