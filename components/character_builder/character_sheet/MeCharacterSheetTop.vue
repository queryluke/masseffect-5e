<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col sm="12" md="6">
          <me-character-builder-level-tracker :level="character.level" />
          <v-row>
            <v-col>
              <me-character-builder-avatar />
            </v-col>
            <v-col>
              <me-character-sheet-character-name
                :character="character"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="12" md="6">
          <me-cs-health />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    character () {
      const char = this.$store.getters['cb/characters'][this.$route.query.cid] || {}
      return char.character
    }
  }
}
</script>
