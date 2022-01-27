<template>
  <v-card>
    <v-card-text>
      <me-tpg s="h5">
        {{ item.name }}
      </me-tpg>
      <div class="text-body-2">
        <strong>Threshold</strong>: {{ item.threshold }}
      </div>
      <div class="text-body-2">
        <strong>Prerequisite</strong>: {{ prereqText }}
      </div>
      <div class="mt-2">
        <me-html :content="item.html" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MeBenefitsItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    prereqText () {
      const stats = this.item.prereq.paragon || this.item.prereq.renegade
      if (stats.within) {
        return `Paragon = (Renegade ± ${stats.within})`
      }
      const which = this.item.prereq.paragon ? 'Paragon' : 'Renegade'
      const other = this.item.prereq.paragon ? 'Renegade' : 'Paragon'
      return `${which} >= ${stats.min} and ${which} >= ${other}`
    }
  }
}
</script>
