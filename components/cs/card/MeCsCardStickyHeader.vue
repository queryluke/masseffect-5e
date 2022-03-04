<template>
  <v-card elevation="0" class="my-3" outlined>
    <div class="d-flex flex-column">
      <div style="flex: 0 0 auto">
        <slot name="header" />
      </div>
      <v-divider v-if="!hideDivider" />
      <div style="flex: 1 1 auto; position: relative;" :style="{ height: contentHeight }" class="overflow-y-auto">
        <slot />
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'MeCsCardStickyHeader',
  props: {
    height: {
      type: Number,
      default: 0
    },
    outlined: {
      type: Boolean,
      default: false
    },
    hideDivider: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentHeight () {
      if (this.height) {
        return `${this.height - 12}px`
      }
      return 'calc(100vh - 382px)'
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
