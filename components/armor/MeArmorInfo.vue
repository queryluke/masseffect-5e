<template>
  <div>
    <me-armor-title v-if="title" :title="item.name" />
    <v-row>
      <v-col cols="12" md="9" lg="10" class="text-body-2">
        <div class="text-caption">
          <em>{{ item.description }}</em>
        </div>
        <v-progress-linear :value="100" color="secondary" :height="2" class="my-2" />
        <div v-for="(feature, index) in item.features" :key="index">
          <me-html :content="feature" />
        </div>
        <div v-if="item.setBonus.length > 0">
          <ul>
            <li v-for="(bonus, index) in item.setBonus" :key="index">
              {{ bonus }}
            </li>
          </ul>
        </div>
      </v-col>
      <v-col cols="12" md="3" lg="2" class="text-sm-center">
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
