<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div class="text-overline text--primary">
          {{ label }}
        </div>
        <me-skeleton-loader :pending="pending" type="heading">
          <div class="mb-3">
            <slot name="header">
              <me-item-title :title="item.name" />
            </slot>
          </div>
        </me-skeleton-loader>
        <me-skeleton-loader :pending="pending" type="item">
          <slot>
            <me-html :content="item.html" />
          </slot>
        </me-skeleton-loader>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    pending: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => { return {} }
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
