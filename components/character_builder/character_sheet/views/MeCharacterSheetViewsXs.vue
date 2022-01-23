<template>
  <div class="mb-16">
    <div v-if="mobileView === 'abilities'">
      <me-character-sheet-card>
        <me-character-sheet-abilities />
      </me-character-sheet-card>
      <me-character-sheet-card>
        <me-cs-saving-throws />
      </me-character-sheet-card>
      <me-character-sheet-card>
        <me-character-sheet-senses />
      </me-character-sheet-card>
    </div>
    <div v-if="mobileView === 'skills'">
      <me-character-sheet-card>
        <me-character-sheet-skills />
      </me-character-sheet-card>
      <me-character-sheet-card>
        <me-character-sheet-proficiencies />
      </me-character-sheet-card>
    </div>
    <div v-if="mobileView === 'notes'">
      <me-character-sheet-card>
        <me-character-sheet-notes />
      </me-character-sheet-card>
    </div>
    <div v-if="mobileView === 'details'">
      <me-character-sheet-card>
        <me-character-sheet-details />
      </me-character-sheet-card>
    </div>
    <div v-if="mobileView === 'equipment'">
      <me-character-sheet-card>
        <me-character-sheet-equipment />
      </me-character-sheet-card>
    </div>
    <div v-if="mobileView === 'settings'">
      <me-character-sheet-card>
        <me-character-sheet-settings />
      </me-character-sheet-card>
    </div>
    <div v-if="mobileView === 'actions'">
      <me-character-sheet-short-long-rest />
      <me-character-sheet-card>
        <me-character-sheet-actions />
      </me-character-sheet-card>
    </div>
    <div v-if="mobileView === 'powers'">
      <me-character-sheet-card>
        <me-character-sheet-powers />
      </me-character-sheet-card>
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
