<template>
  <v-row>
    <v-col cols="7">
      <v-row>
        <v-col cols="8">
          <v-card class="pr-4">
            <me-character-sheet-main-menu />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <me-character-sheet-abilities />
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <me-character-sheet-card>
                <me-character-sheet-skills />
              </me-character-sheet-card>
            </v-col>
            <v-col cols="6">
              <me-character-sheet-card>
                <me-character-sheet-saving-throws />
              </me-character-sheet-card>
              <me-character-sheet-card>
                <me-character-sheet-senses />
              </me-character-sheet-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="5">
      <v-card>
        <me-character-sheet-health />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    mobileView () {
      return this.$store.getters['cb/mobileView']
    }
  }
}
</script>
