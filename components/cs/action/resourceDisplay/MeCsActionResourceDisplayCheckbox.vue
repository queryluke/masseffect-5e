<template>
  <div class="d-flex">
    <v-icon @click.stop="$emit('remove')">
      mdi-minus
    </v-icon>
    <div>
      <template v-for="value in Array.from({length: max}, (x, i) => i)">
        <v-icon :key="`use-track-${value}`" :color="value >= current ? 'primary' : 'red'" @click.stop="set(value)">
          {{ value >= current ? 'mdi-checkbox-blank-outline' : 'mdi-minus-box' }}
        </v-icon>
      </template>
    </div>
    <v-icon @click.stop="$emit('add')">
      mdi-plus
    </v-icon>
  </div>
</template>

<script>

export default {
  props: {
    current: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  methods: {
    set (value) {
      console.log(value, this.current)
      if (value === this.current) {
        this.$emit('set', this.current + 1)
      }
      if (value + 1 === this.current) {
        this.$emit('set', this.current - 1)
      }
    }
  }
}
</script>
