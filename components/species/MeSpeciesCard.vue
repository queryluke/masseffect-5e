<template>
  <v-card
    :to="localePath({ name: 'species-id', params: { id: item.id } })"
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
