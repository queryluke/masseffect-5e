<template>
  <div class="mb-16 mx-1">
    <div v-if="mobileView === 'abilities'">
      <me-cs-card>
        <me-cs-abilities />
      </me-cs-card>
      <me-cs-card>
        <me-cs-saving-throws />
      </me-cs-card>
      <me-cs-card>
        <me-cs-senses />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'skills'">
      <me-cs-card>
        <me-cs-skills />
      </me-cs-card>
      <me-cs-card>
        <me-cs-proficiencies />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'notes'">
      <me-cs-card>
        <me-cs-notes />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'details'">
      <me-cs-card>
        <me-cs-reputation />
      </me-cs-card>
      <me-cs-card>
        <me-cs-details />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'equipment'">
      <me-cs-card>
        <me-cs-equipment />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'actions'">
      <me-cs-card>
        <me-cs-actions />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'features'">
      <me-cs-card>
        <me-cs-features />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'powers'">
      <me-cs-card>
        <me-cs-powers />
      </me-cs-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsViewsXs',
  computed: {
    mobileView () {
      return this.$store.getters['character/navigation/mobileView']
    }
  }
}
</script>
