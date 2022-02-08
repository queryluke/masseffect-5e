<template>
  <!-- TODO: add action type for spells, maybe show-action-type? -->
  <v-card outlined class="pa-1 px-md-3" @click="moreInfoDialog = !moreInfoDialog">
    <div class="d-flex">
      <div>
        <div class="d-flex align-center">
          <slot name="icon" />
          <v-card flat color="transparent">
            <div class="mb-n1 text-body-1">
              <small class="text-truncate font-weight-bold">
                <slot name="name" />
              </small>
            </div>
          </v-card>
        </div>
        <div>
          <slot name="shortDesc" />
        </div>
        <div>
          <slot name="resource" />
        </div>
      </div>
    </div>
    <me-standard-dialog v-if="moreInfo" :shown="moreInfoDialog" :title="moreInfo.title" @close="moreInfoDialog = false">
      <component :is="moreInfo.component" v-if="moreInfo.component" :item="moreInfo.bind" />
      <me-html v-else :content="moreInfo.html" />
    </me-standard-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'MeCsActionLayoutSimple',
  props: {
    moreInfo: {
      type: [Object, Boolean],
      default: false
    },
    showCastingTime: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      moreInfoDialog: false
    }
  }
}
</script>
