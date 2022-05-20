<template>
  <div class="d-flex">
    <div>
      <template v-for="value in Array.from({length: max}, (x, i) => i)">
        <v-btn :key="`use-track-${value}`" icon x-small>
          <v-icon :color="value >= current ? 'primary' : 'red'" @click.stop="set(value)">
            {{ value >= current ? 'mdi-checkbox-blank-outline' : 'mdi-minus-box' }}
          </v-icon>
        </v-btn>
      </template>
    </div>
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
      if (value + 1 === this.current || value < this.current) {
        this.$emit('set', this.current - 1)
      } else {
        this.$emit('set', this.current + 1)
      }
    }
  }
}
</script>
