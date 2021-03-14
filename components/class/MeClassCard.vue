<template>
  <v-card
    :to="{ name: 'classes-id', params: { id: item.id }}"
    hover
    class="ma-2"
  >
    <v-row>
      <v-col cols="4" sm="3" md="5" xl="4">
        <v-img
          :src="require(`~/assets/images/classes/${item.id}.svg`)"
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
        <me-stat-list>
          <me-stat-list-item v-for="(stat, index) in stats" :key="index" :label="stat.title">
            {{ stat.value }}
          </me-stat-list-item>
        </me-stat-list>
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
