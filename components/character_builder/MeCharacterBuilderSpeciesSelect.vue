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
        <div>
          <v-img :src="model.bodyImg" width="200px" position="center center" style="margin: auto;"/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>{{ model.name }} Traits</h3>
        <p>As a {{ model.name }}, you have the following special traits.</p>
        <v-expansion-panels>
            <v-expansion-panel v-for="trait in model.traits" :key="trait.name">
                <v-expansion-panel-header>{{trait.name}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-html="trait.html"></div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
       <div v-html="model.html" />
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
