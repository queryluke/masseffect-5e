<template>
  <v-card outlined class="pl-2 pt-1">
    <v-row align="center">
      <v-col cols="6">
        <div class="text-truncate">
          <slot name="name" />
        </div>
        <div>
          <small v-if="$vuetify.breakpoint.smAndDown">
            <slot name="mRange" />
          </small>
          <span>
            <slot name="props" />
          </span>
        </div>
        <div v-if="$vuetify.breakpoint.mdAndUp">
          <slot name="heat" />
        </div>
      </v-col>
      <v-col cols="2" md="2" class="text-h6">
        <slot name="hit" />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="2" class="text-subtitle-2">
        <slot name="range" />
      </v-col>
      <v-col cols="4" md="2" class="text-subtitle-2 text-center">
        <div>
          <slot name="damage" />
        </div>
        <div class="mt-n2 text-caption">
          <slot name="damageType" />
        </div>
      </v-col>
    </v-row>
    <div v-if="$vuetify.breakpoint.smAndDown">
      <slot name="mHear" />
    </div>
  </v-card>
</template>
