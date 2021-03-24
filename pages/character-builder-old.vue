<template>
  <v-container v-if="!$fetchState.pending">
    <v-row justify="space-around">
      <v-col cols="5" md="12" lg="6">
        <me-character-builder-save-load />
      </v-col>
      <v-col cols="7" lg="6" class="text-center">
        <img v-if="$vuetify.breakpoint.lgAndUp" title="Mass Effect 5e Logo" src="~/assets/images/me5e_logo_450w.png" alt="Mass Effect 5e logo">
        <me-character-builder-avatar v-if="$vuetify.breakpoint.smAndDown" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="8">
            <me-character-builder-text-input label="Character Name" attr="name" class-name="text-h5" />
          </v-col>
          <v-col cols="4">
            <me-character-builder-level />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <me-character-builder-select :items="species" label="Species" attr="species" />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <me-character-builder-select :items="classes" label="Class" attr="class" />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <me-character-builder-select :items="subclasses" label="Sub-class" attr="subclass" />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <me-character-builder-select :items="backgrounds" label="Background" attr="background" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="2">
            <me-character-builder-text-input label="AC" attr="ac" />
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <me-character-builder-text-input label="Initiative" attr="initiative" />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <me-character-builder-text-input label="Movement" attr="movement" />
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <!-- TODO: this should not be editable -->
            <me-character-builder-text-input label="Proficiency Bonus" attr="proficiencyBonus" />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <me-character-builder-xp />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <me-character-builder-avatar v-if="$vuetify.breakpoint.mdAndUp" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.$store.commit('pageTitle', this.$store.getters['user/character'].name)
    await this.$store.dispatch('FETCH_LOTS', ['species', 'weapons', 'armor', 'powers', 'feats', 'backgrounds', 'classes', 'class-features', 'subclasses', 'character-progression'])
  },
  computed: {
    character () {
      return this.$store.getters['cb/character']
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
