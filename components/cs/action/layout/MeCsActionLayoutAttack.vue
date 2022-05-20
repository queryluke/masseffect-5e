<template>
  <div>
    <v-row no-gutters align="baseline">
      <v-col cols="4">
        <v-card flat color="transparent">
          <div class="mb-n1 text-body-1">
            <small class="text-truncate font-weight-bold">
              <slot name="name" />
            </small>
          </div>
          <div class="text-caption font-weight-light d-flex align-center">
            <small class="text-capitalize text-truncate">
              <slot name="properties" />
            </small>
          </div>
        </v-card>
      </v-col>

      <!-- RANGE -->
      <v-col cols="3" sm="2" class="text-center">
        <slot name="range" />
      </v-col>

      <!-- HIT/DC -->
      <v-col cols="2" sm="1" class="text-center">
        <slot name="hit" />
        <slot name="dc" />
      </v-col>

      <!-- Damages -->
      <v-col cols="3" sm="2">
        <slot name="damage" />
      </v-col>

      <!-- NOTES -->
      <v-col v-if="$vuetify.breakpoint.smAndUp" cols="3">
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
  name: 'MeCsActionLayoutAttack',
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
