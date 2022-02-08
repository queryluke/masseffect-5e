<template>
  <!-- TODO: add action type for spells, maybe show-action-type? -->
  <v-card outlined class="pa-1 px-md-3" @click="moreInfo = !moreInfo">
    <v-row align="start" no-gutters>
      <v-col cols="5" md="3">
        <div class="d-flex align-center">
          <v-avatar v-if="item.icon" size="16" class="mr-1">
            <slot name="icon" />
          </v-avatar>
          <v-card flat color="transparent">
            <div class="mb-n1 text-body-1">
              <small class="text-truncate font-weight-bold">
                <slot name="name" />
              </small>
            </div>
            <slot name="properties" />
          </v-card>
        </div>
      </v-col>
      <v-col v-if="showCastingTime" class="text-center" cols="1">
        <slot name="castingTime" />
      </v-col>
      <v-col cols="2" class="text-center">
        <slot name="range" />
      </v-col>
      <v-col :cols="showCastingTime ? 1 : 2">
        <slot name="hitOrDc" />
      </v-col>
      <v-col cols="3" md="2">
        <v-card flat color="transparent">
          <slot name="damage" />
        </v-card>
      </v-col>
      <v-col v-if="!mobile" cols="3">
        <slot name="notes" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <slot name="resource" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'MeCsActionLayoutAttack',
  data () {
    return {
      moreInfo: false
    }
  },
  computed: {
    mobile () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
