<template>
  <v-container v-if="!$fetchState.pending">
    <v-row>
      <v-col cols="12" sm="6" lg="4">
        <me-character-builder-text-input label="Character Name" attr="name" />
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <me-character-builder-save-load />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="4">
        <img title="Mass Effect 5e Logo" src="~/assets/images/me5e_logo_450w.png" alt="Mass Effect 5e logo">
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="8" order="2" order-lg="1">
        <v-row>
          <v-col cols="12" sm="6">
            <me-character-builder-level />
          </v-col>
          <v-col>
            <me-character-builder-select :items="species" label="Species" attr="species" />
          </v-col>
          <v-col>
            <me-character-builder-select :items="classes" label="Class" attr="class" />
          </v-col>
          <v-col>
            <me-character-builder-select :items="subclasses" label="Sub-class" attr="subclass" />
          </v-col>
          <v-col>
            <me-character-builder-select :items="backgrounds" label="Background" attr="background" />
          </v-col>
        </v-row>
        <v-row>
        </v-row>
      </v-col>
      <v-col cols="12" lg="8" order="1" order-lg="2" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', this.$store.getters['user/character'].name)
    await this.$store.dispatch('FETCH_LOTS', ['species', 'weapons', 'armor', 'powers', 'feats', 'backgrounds', 'classes', 'class-features', 'subclasses'])
  },
  computed: {
    character () {
      return this.$store.getters['user/character']
    },
    species () {
      return this.$store.getters.getData('species')
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    subclasses () {
      return this.$store.getters.getData('subclasses').filter(i => this.character.class ? i.class === this.character.class.id : false)
    },
    backgrounds () {
      return this.$store.getters.getData('backgrounds')
    }
  }
}
</script>
