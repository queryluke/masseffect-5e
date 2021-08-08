<template>
  <div>
    <me-character-sheet-card-title v-if="$vuetify.breakpoint.smAndDown">
      Notes
    </me-character-sheet-card-title>
    <me-character-builder-debounced-input input-type="textarea" path="notes" />
  </div>
</template>
