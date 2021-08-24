<template>
  <div>
    <div class="d-flex justify-center" :class="{'error--text': count > max}">
      <v-icon v-if="count > max" class="mr-1" color="error" size="18">
        mdi-alert-octagram
      </v-icon>
      <div class="text-button mt-1">
        {{ label }}
      </div>
      <v-icon v-if="count > max" class="ml-1" color="error" size="18">
        mdi-alert-octagram
      </v-icon>
    </div>
    <v-progress-linear height="15" :value="pgValue" rounded :color="count > max ? 'error' : 'accent'">
      {{ count }} / {{ max }}
    </v-progress-linear>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    pgValue () {
      return Math.ceil((this.count / this.max) * 100)
    }
  }
}
</script>
