<template>
  <v-card outlined class="px-1 px-md-3 pt-1">
    <v-row align="start" no-gutters>
      <v-col cols="5" md="3">
        <div class="text-truncate mb-n1">
          {{ item.name }}
        </div>
        <me-cs-action-properties :properties="item.properties" />
      </v-col>
      <v-col cols="2" class="text-center">
        <me-cs-action-range :range="item.range" />
      </v-col>
      <v-col cols="2">
        <me-cs-action-hit v-if="item.attack" :hit="item.attack" />
        <me-cs-action-dc v-if="item.dc" :dc="item.dc" />
      </v-col>
      <v-col cols="3" md="2">
        <v-card flat>
          <me-cs-action-damage v-for="(damage, index) in item.damage" :key="`damage-${index}`" :damage="damage" />
        </v-card>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3">
        <me-cs-action-notes :notes="item.notes" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <me-html :content="item.shortDesc" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col v-if="item.resource">
        <me-cs-action-resource :id="item.resource.id" :resource="item.resource" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'MeCsActionCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    mobile () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
