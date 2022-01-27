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
        <me-cs-senses />
      </me-character-sheet-card>
    </div>
    <div v-if="mobileView === 'skills'">
      <me-character-sheet-card>
        <me-cs-skills />
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
        <me-cs-reputation />
      </me-character-sheet-card>
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
        <me-cs-actions />
      </me-character-sheet-card>
    </div>
    <div v-if="mobileView === 'features'">
      <me-character-sheet-card>
        <me-cs-features />
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
import MeCsReputation from '~/components/cs/MeCsReputation'
export default {
  components: { MeCsReputation },
  computed: {
    mobileView () {
      return this.$store.getters['cb/mobileView']
    }
  }
}
</script>
