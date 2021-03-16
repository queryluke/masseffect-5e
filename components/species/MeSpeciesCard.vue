<template>
  <v-card
    :to="{ name: 'species-id', params: { id: item.id } }"
    nuxt
    hover
    class="flex-grow-1"
  >
    <v-img :src="item.img" height="200" />
    <v-card-title>
      {{ item.name }}
    </v-card-title>
    <v-card-text>
      <p>
        {{ item.snippet }}
      </p>
      <p class="text-subtitle-1 mb-0">
        Racial Traits
      </p>
      <p>
        <me-species-ability-score-increase-summary :data="item.abilityScoreIncrease" />, {{ item.traits.map(i => i.name).join(', ') }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
