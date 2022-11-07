<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-select
          v-model="short"
          :items="ranges"
          :item-text="imperial ? 'imperialText' : 'metricText'"
          :label="ignoreLong ? 'Range' : 'Short Range'"
          filled
          dense
        />
      </v-col>
      <v-col v-if="!ignoreLong" cols="12" sm="6">
        <v-select
          v-model="long"
          :items="ranges"
          :item-text="imperial ? 'imperialText' : 'metricText'"
          label="Long Range"
          filled
          dense
        />
      </v-col>
    </v-row>
    <v-row v-if="!ignoreAoe">
      <v-col cols="12" sm="2">
        <v-switch v-model="aoe" label="AoE?" />
      </v-col>
      <v-col v-if="aoe" cols="12" sm="5">
        <v-select
          v-model="aoeSize"
          :items="aoeRanges"
          :item-text="imperial ? 'imperialText' : 'metricText'"
          filled
          dense
          label="AoE Size/Distance"
        />
      </v-col>
      <v-col v-if="aoe" cols="12" sm="5">
        <v-select
          v-model="aoeShape"
          :items="aoeTypes"
          filled
          dense
          label="AoE Shape"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputRange',
  props: {
    range: {
      type: Object,
      default: () => {
        return { short: 0, long: false, aoe: false }
      }
    },
    ignoreLong: {
      type: Boolean,
      default: false
    },
    ignoreAoe: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ranges: [
        { value: false, metricText: 'None', imperialText: 'None' },
        { value: 0, metricText: 'Self', imperialText: 'Self' },
        { value: 1, metricText: 'Touch', imperialText: 'Touch' },
        { value: 5, metricText: '2 meters', imperialText: '5 Feet' },
        { value: 10, metricText: '4 meters', imperialText: '10 Feet' },
        { value: 15, metricText: '6 meters', imperialText: '15 Feet' },
        { value: 20, metricText: '8 meters', imperialText: '20 Feet' },
        { value: 25, metricText: '10 meters', imperialText: '25 Feet' },
        { value: 30, metricText: '12 meters', imperialText: '30 Feet' },
        { value: 35, metricText: '14 meters', imperialText: '35 Feet' },
        { value: 40, metricText: '16 meters', imperialText: '40 Feet' },
        { value: 50, metricText: '20 meters', imperialText: '50 Feet' },
        { value: 60, metricText: '24 meters', imperialText: '60 Feet' },
        { value: 75, metricText: '30 meters', imperialText: '75 Feet' },
        { value: 90, metricText: '36 meters', imperialText: '90 Feet' },
        { value: 120, metricText: '48 meters', imperialText: '120 Feet' },
        { value: 150, metricText: '60 meters', imperialText: '150 Feet' },
        { value: 300, metricText: '120 meters', imperialText: '300 Feet' },
        { value: 600, metricText: '240 meters', imperialText: '600 Feet' }
      ],
      aoeTypes: [
        { value: 'sphere', text: 'Sphere' },
        { value: 'line', text: 'Line' },
        { value: 'cube', text: 'Cube' },
        { value: 'cone', text: 'Cone' },
        { value: 'cylinder', text: 'Cylinder' }
      ]
    }
  },
  computed: {
    imperial () {
      return this.$store.getters['user/imperial']
    },
    aoeRanges () {
      return this.ranges.filter(i => ![false, 0, 1].includes(i.value))
    },
    short: {
      get () {
        return this.range.short
      },
      set (value) {
        this.$emit('update', { ...this.range, short: value })
      }
    },
    long: {
      get () {
        return this.range.long
      },
      set (value) {
        this.$emit('update', { ...this.range, long: value })
      }
    },
    aoe: {
      get () {
        return !!this.range.aoe
      },
      set (value) {
        this.$emit('update', { ...this.range, aoe: value ? { size: 5, type: 'sphere' } : false })
      }
    },
    aoeSize: {
      get () {
        return this.range.aoe?.size
      },
      set (value) {
        this.$emit('update', { ...this.range, aoe: { type: this.aoeShape, size: value } })
      }
    },
    aoeShape: {
      get () {
        return this.range.aoe?.type
      },
      set (value) {
        this.$emit('update', { ...this.range, aoe: { size: this.aoeSize, type: value } })
      }
    }
  }
}
</script>
