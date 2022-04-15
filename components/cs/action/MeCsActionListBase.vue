<template>
  <div v-if="items.length" class="mb-4">
    <div class="text-body-2 font-weight-bold">
      <slot />
    </div>
    <v-card flat class="px-1 pt-1">
      <v-icon>
        mdi-chevron-right
      </v-icon>
      <span class="text-caption font-italic pl-2">
        <span v-for="(item, index) in items" :key="`base-action-${index}`">
          <span style="cursor: pointer;" @click="showItem(item)">
            {{ item.name }}{{ items.length - 1 > index ? ', ' : '' }}
          </span>
        </span>
      </span>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'MeCsActionListBase',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    showItem (item) {
      this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: item })
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', (item.component || 'me-cs-more-info'))
    }
  }
}
</script>
