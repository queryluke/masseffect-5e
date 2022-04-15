<template>
  <div v-if="items.length" class="mb-4">
    <div class="text-body-2 font-weight-bold" @click="moreInfo = !moreInfo">
      <slot />
    </div>
    <v-card flat class="px-1 pt-1" @click="moreInfo = !moreInfo">
      <v-icon>
        mdi-chevron-right
      </v-icon>
      <span class="text-caption font-italic pl-2">
        {{ items.map(i => i.name).join(', ') }}
      </span>
    </v-card>
    <v-expand-transition>
      <div v-show="moreInfo">
        <div v-for="(item, index) in items" :key="`action-${index}`" :class="items[index - 1] && items[index - 1].resource ? 'mt-4' : 'mt-1'">
          <component :is="component" :item="item" />
        </div>
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
    },
    component: {
      type: String,
      default: 'me-cs-action-card'
    }
  },
  data () {
    return {
      moreInfo: false
    }
  }
}
</script>
