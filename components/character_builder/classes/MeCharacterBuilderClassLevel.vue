<template>
  <div>
    <v-select
      :items="levelArray"
      v-model="levels"
      label="Number of levels in this class"
    />
  </div>
</template>

<script>
export default {
  props: {
    classIndex: {
      type: Number,
      required: true
    },
    characterLevel: {
      type: Number,
      required: false
    }
  },
  computed: {
    levels: {
      get () {
        return this.$store.getters['user/character'].classes[this.classIndex].levels
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'classes.' + this.classIndex.toString() + '.levels', value })
      }
    },
    levelArray () {
      const posLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      return posLevels.slice(0, posLevels.length - this.characterLevel + this.levels)
    }
  }
}
</script>
