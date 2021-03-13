<template>
  <div>
    <me-character-builder-select
      :items="species"
      label="Species"
      attr="species"
    />
    <v-row>
      <v-col>
        <me-character-builder-species-card :speciesData="model" />
      </v-col>
      <v-col>
        <v-img :src="model.bodyImg" width="200px" position="center center" style="margin: auto;"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
       <!--div v-html="model.html" /-->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    species () {
      return this.$store.getters.getData('species')
    },
    model: {
      get () {
        return this.$store.getters['user/character'].species
      }
    }
  }
}
</script>
