<template>
  <div>
    <v-row align="baseline" no-gutters>
      <v-col cols="5" md="3">
        <div class="d-flex align-center">
          <slot name="castBtn" />
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
      <v-col class="text-center" cols="1">
        <slot name="castingTime" />
      </v-col>
      <v-col cols="2" class="text-center">
        <slot name="range" />
      </v-col>
      <v-col cols="1">
        <slot name="hit" />
        <slot name="dc" />
      </v-col>
      <v-col cols="3" md="2">
        <v-card flat color="transparent">
          <slot name="damage" />
          <slot name="effect" />
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
  </div>
</template>

<script>
export default {
  name: 'MeCsActionLayoutPower',
  props: {
    showCastingTime: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mobile () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
