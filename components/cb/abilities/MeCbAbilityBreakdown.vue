<template>
  <v-card elevation="0" outlined>
    <v-card-title>
      <me-cb-ability-line-item>
        <template #title>
          {{ $t(`abilities.${ability}.title`) }}
        </template>
        {{ breakdown.total || '--' }}
      </me-cb-ability-line-item>
    </v-card-title>
    <v-card-text>
      <me-cb-ability-line-item>
        <template #title>
          Modifier
        </template>
        {{ modText }}
      </me-cb-ability-line-item>
      <me-cb-ability-line-item>
        <template #title>
          Base Score
        </template>
        {{ breakdown.base || '--' }}
      </me-cb-ability-line-item>
      <me-cb-ability-line-item>
        <template #title>
          Species Bonus
        </template>
        +{{ breakdown.species }}
      </me-cb-ability-line-item>
      <me-cb-ability-line-item>
        <template #title>
          Ability Improvements
        </template>
        +{{ breakdown.klass }}
      </me-cb-ability-line-item>
      <me-cb-ability-line-item>
        <template #title>
          Misc Bonus
        </template>
        +{{ breakdown.misc }}
      </me-cb-ability-line-item>
      <v-divider class="my-3" />
      <me-cb-ability-line-item>
        <template #title>
          <div class="mt-3">
            Other Modifier
          </div>
        </template>
        <v-text-field
          v-model="other"
          outlined
          dense
          hide-details
          type="number"
          min="-10"
          max="10"
        />
      </me-cb-ability-line-item>
      <me-cb-ability-line-item>
        <template #title>
          <div class="mt-3">
            Override Score
          </div>
        </template>
        <v-text-field
          v-model="override"
          outlined
          dense
          hide-details
          type="number"
          :min="1"
          :max="30"
        />
      </me-cb-ability-line-item>
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/abilities')
export default {
  name: 'MeCbAbilityBreakdown',
  props: {
    ability: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['abilityBreakdown']),
    breakdown () {
      return this.abilityBreakdown[this.ability]
    },
    other: {
      get () {
        return this.breakdown.other
      },
      set (val) {
        let intVal = parseInt(val, 10)
        intVal = isNaN(intVal) ? 0 : intVal
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `abilityScores.${this.ability}.other`, value: intVal })
      }
    },
    override: {
      get () {
        return this.breakdown.override
      },
      set (val) {
        let intVal = parseInt(val, 10)
        intVal = isNaN(intVal) ? 0 : intVal
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `abilityScores.${this.ability}.override`, value: intVal })
      }
    },
    modText () {
      return this.breakdown.total
        ? this.breakdown.mod >= 0 ? `+${this.breakdown.mod}` : `-${this.breakdown.mod * -1}`
        : '--'
    }
  }
}
</script>
