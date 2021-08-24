<template>
  <div class="d-flex">
    <v-icon @click="$emit('decrement')">
      mdi-minus
    </v-icon>
    <v-row v-if="progress">
      <v-col cols="10" offset="1">
        <v-progress-linear height="20" :value="Math.ceil(((uses - used) / uses) * 100)">
          {{ uses - used }} / {{ uses }}
        </v-progress-linear>
      </v-col>
    </v-row>
    <div v-else>
      <template v-for="value in Array.from({length: uses}, (x, i) => i)">
        <v-icon :key="`use-track-${value}`" :color="value >= used ? 'primary' : 'red'">
          {{ value >= used ? 'mdi-checkbox-blank-outline' : 'mdi-minus-box' }}
        </v-icon>
      </template>
    </div>
    <v-icon @click="$emit('increment')">
      mdi-plus
    </v-icon>
  </div>
</template>

<script>

export default {
  props: {
    uses: {
      type: Number,
      default: 1
    },
    used: {
      type: Number,
      default: 0
    },
    progress: {
      type: Boolean,
      default: false
    }
  }
}
</script>
