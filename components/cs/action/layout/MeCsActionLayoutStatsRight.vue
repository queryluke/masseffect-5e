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
        <div>
          <slot name="resource" />
        </div>
      </div>
      <div v-if="!$vuetify.breakpoint.xsOnly" class="d-flex flex-column" style="min-width: 68px">
        <div class="py-1">
          <slot name="range" />
        </div>
        <div class="py-1">
          <slot name="dc" />
        </div>
        <div class="py-1">
          <slot name="damage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsActionLayoutStatsLeft'
}
</script>
