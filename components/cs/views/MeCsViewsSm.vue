<template>
  <div>
    <me-cs-card>
      <me-cs-abilities />
    </me-cs-card>
  </div>
</template>

<script>
export default {
  name: 'MeCsViewsSm',
  data () {
    return {
      tab: null,
      tabs: ['Actions', 'Powers', 'Gear', 'Features', 'Details', 'Notes'],
      showSettings: false
    }
  },
  computed: {
    maxWidth () {
      return this.$vuetify.breakpoint.md
        ? '900px'
        : this.$vuetify.breakpoint.lg
          ? '1000px'
          : '1200px'
    }
  }
}
</script>

<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: transparent;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 4px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: #303030;
  border-radius: 10px;
  border: 3px solid transparent;
}
</style>
