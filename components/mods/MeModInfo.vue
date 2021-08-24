<template>
  <div>
    <me-mod-title v-if="title" :title="item.name" />
    <div class="text-caption">
      <em>{{ item.description }}</em>
    </div>
    <v-progress-linear :value="100" color="secondary" :height="2" class="my-2" />
    <div>
      <me-html :content="item.html" />
    </div>
    <div>
      <v-row>
        <v-col cols="6">
          <me-item-stat label="Placement">
            {{ $t(`mod_placements.${item.placement}`) }}
          </me-item-stat>
        </v-col>
        <v-col cols="6">
          <me-item-stat label="Available For">
            <me-mod-availability :item="item" />
          </me-item-stat>
        </v-col>
      </v-row>
    </div>
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
