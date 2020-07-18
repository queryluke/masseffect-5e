<template>
  <div>
    <me-gear-title v-if="title" :title="item.name" />
    <v-row>
      <v-col cols="12" :md="item.image ? 8 : 12" class="text-body-2">
        <me-html :content="item.html" />
      </v-col>
      <v-col cols="12" md="4" class="text-sm-center">
        <v-img
          v-if="item.image"
          :src="item.image"
          :max-height="$vuetify.breakpoint.smAndDown ? 150 : null"
          :contain="$vuetify.breakpoint.smAndDown"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: Boolean,
      default: false
    }
  }
}
</script>
