<template>
  <div>
    <div class="d-flex justify-space-between">
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
      </div>
      <div v-if="!$vuetify.breakpoint.xsOnly" class="d-flex flex-column" style="min-width: 90px">
        <slot name="range" />
        <div class="pb-1">
          <slot name="dc" />
        </div>
        <slot name="damage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsActionLayoutStatsLeft'
}
</script>
