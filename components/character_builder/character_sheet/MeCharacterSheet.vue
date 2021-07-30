<template>
  <div>
    <div v-if="$vuetify.breakpoint.smAndDown" class="mb-16">
      <div v-if="mobileView === 'abilities'">
        <me-character-sheet-card>
          <me-character-sheet-abilities />
        </me-character-sheet-card>
        <me-character-sheet-card>
          <me-character-sheet-saving-throws />
        </me-character-sheet-card>
        <me-character-sheet-card>
          <me-character-sheet-senses />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'skills'">
        <me-character-sheet-card>
          <me-character-sheet-skills />
        </me-character-sheet-card>
      </div>
      <div v-if="mobileView === 'features'">
        <me-character-sheet-card>
          <me-character-sheet-features />
        </me-character-sheet-card>
      </div>
    </div>
  </div>
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
