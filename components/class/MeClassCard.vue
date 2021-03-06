<template>
  <v-card
    :to="{ name: 'classes-id', params: { id: item.id }}"
    hover
    class="ma-2"
  >
    <v-row>
      <v-col cols="4" sm="3">
        <v-img
          :src="require(`~/assets/images/classes/${item.id}.svg`)"
          height="200px"
          position="right"
        />
      </v-col>
      <v-col class="pa-6 pl-0">
        <h3 class="text-h4 font-weight-thin">
          {{ item.name }}
        </h3>
        <p class="body-2">
          {{ item.snippet }}
        </p>
        <div class="d-flex justify-space-around flex-wrap">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="text-center mb-1"
          >
            <div class="text-overline mb-n1">
              {{ stat.title }}
            </div>
            <div class="text-body-2">
              {{ stat.value }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    stats () {
      return [
        { title: 'Hit Dice', value: `1d${this.item.hitDice}` },
        { title: 'Primary Ability', value: this.item.primaryAbility },
        { title: 'Saves', value: this.item.savingThrows.text }
      ]
    }
  }
}
</script>
