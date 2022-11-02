<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-select
        v-model="selectedCastingTimes"
        :items="castingTimes"
        label="Casting Time(s)"
        filled
        chips
        small-chips
        dense
        multiple
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-if="reactionIndex > -1"
        v-model="reactionQualifier"
        label="Reaction Qualifier"
        filled
        dense
        hint="e.g. When you take damage"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MeHomebrewInputCastingTimes',
  props: {
    castingTime: {
      type: Object,
      default: () => {
        return {}
      }
    },
    altCasting: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      castingTimes: [
        { value: 'action', text: 'Action' },
        { value: 'attack', text: 'Attack' },
        { value: 'bonus_action', text: 'Bonus Action' },
        { value: 'reaction', text: 'Reaction' }
      ]
    }
  },
  computed: {
    castingTimeObjects () {
      return [this.castingTime, ...this.altCasting].filter(i => i)
    },
    selectedCastingTimes: {
      get () {
        return this.castingTimeObjects.map(i => i.unit)
      },
      set (value) {
        const filtered = value.filter(i => i)
        const castingTime = {
          unit: filtered[0]
        }
        const altCasting = filtered.slice(1).map((i) => {
          const base = {
            unit: i
          }
          if (i === 'reaction') {
            base.reaction = this.reactionQualifier
          }
          return base
        })
        this.$emit('update', { castingTime, altCasting })
      }
    },
    reactionIndex () {
      return this.castingTimeObjects.findIndex(i => i.unit === 'reaction')
    },
    reactionQualifier: {
      get () {
        if (this.reactionIndex > -1) {
          const reaction = this.castingTimeObjects.find(i => i.unit === 'reaction')
          return reaction?.reaction || ''
        }
        return ''
      },
      set (value) {
        if (this.reactionIndex > -1) {
          const castingTime = { unit: 'reaction', reaction: value }
          if (this.reactionIndex === 0) {
            this.$emit('update', { castingTime })
          } else {
            const newAltCasting = this.altCasting.slice()
            newAltCasting.splice(this.reactionIndex, 1, castingTime)
            this.$emit('update', { altCasting: newAltCasting })
          }
        }
      }
    }
  }
}
</script>
