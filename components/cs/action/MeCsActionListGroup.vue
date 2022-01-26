<template>
  <div v-if="items.length" class="mb-4">
    <div class="text-body-2 font-weight-bold">
      <slot />
    </div>
    <v-card flat class="px-1 pt-1" @click="moreInfo = !moreInfo">
      <v-icon>
        mdi-chevron-right
      </v-icon>
      <span class="text-caption font-italic pl-2">
        {{ items.map(i => i.name).join(',') }}
      </span>
    </v-card>
    <v-expand-transition>
      <div v-show="moreInfo">
        <me-cs-action-card v-for="(item, index) in items" :key="`action-${index}`" :item="item" />
      </div>
    </v-expand-transition>
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
      moreInfo: false
    }
  }
}
</script>
