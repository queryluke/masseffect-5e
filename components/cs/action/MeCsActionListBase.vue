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
    <me-standard-dialog v-if="moreInfoDialog" :shown="moreInfoDialog" :title="item.name" @close="moreInfoDialog = false">
      <me-html :content="item.html || item.shortDesc" />
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
      item: {}
    }
  },
  methods: {
    showItem (item) {
      this.item = {}
      this.moreInfoDialog = true
      this.item = item
    }
  }
}
</script>
