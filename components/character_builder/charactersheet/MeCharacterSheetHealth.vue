<template>
  <div>
    <v-row>
      <v-col>
        <me-character-sheet-health-circle v-bind="{ ...hpData, current, maximum, temporary }" />
      </v-col>
      <v-col>
        <div class="d-flex flex-column align-center mr-4" style="max-width: 130px;">
          <div class="d-flex">
            <v-btn
              class="white--text mr-2"
              :disabled="!healthMod"
              color="green accent-3"
              small="small"
              @click="addHitPoints"
            >Heal</v-btn>
            <v-btn
              class="white--text"
              :disabled="!healthMod"
              color="green accent-3"
              small="small"
              @click="/* addTHP */"
            >THP</v-btn>
          </div>
          <v-text-field
            class="my-2"
            outlined
            single-line
            hide-details
            type="number"
            v-model.number="healthMod"
          ></v-text-field>
          <v-btn
            class="white--text"
            :disabled="!healthMod"
            color="red accent-3"
            small="small"
            @click="subtractHitPoints"
          >Damage</v-btn>
        </div>
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
      healthMod: 0
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
    subtractHitPoints () {
      const totalHp = Math.max(0, this.current - this.healthMod)
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
    }
  }
}
</script>
