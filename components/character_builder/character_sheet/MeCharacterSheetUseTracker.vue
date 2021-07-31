<template>
  <div class="d-flex">
    <v-icon @click="$emit('decrement')">
      mdi-minus
    </v-icon>
    <template v-for="value in [...Array(uses).keys()]">
      <v-icon :key="`use-track-${value}`" :color="value + 1 >= used ? 'primary' : undefined">
        {{ value + 1 >= used ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
      </v-icon>
    </template>
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
    }
  }
}
</script>
