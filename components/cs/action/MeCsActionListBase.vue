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
    <me-standard-dialog v-if="moreInfoDialog" :shown="moreInfoDialog" :title="shownItem.name" @close="moreInfoDialog = false">
      <me-html :content="shownItem.html || shownItem.shortDesc" />
    </me-standard-dialog>
  </div>
</template>

<script>

export default {
  name: 'MeCsActionListGroup',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      moreInfoDialog: false,
      shownItem: {}
    }
  },
  methods: {
    showItem (item) {
      this.shownItem = {}
      this.moreInfoDialog = true
      this.shownItem = item
    }
  }
}
</script>
