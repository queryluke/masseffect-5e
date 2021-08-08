<template>
  <div>
    <me-character-sheet-views-xs v-if="$vuetify.breakpoint.smAndDown" />
    <me-character-sheet-views-lg v-if="$vuetify.breakpoint.mdAndUp" />
  </div>
</template>
