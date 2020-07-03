<template lang="pug">
  ul
    li(v-for="item in items" v-bind:key="item.id").
      #[strong #[em {{ item.name }}]]
      #[v-chip(v-if="item.new" color="secondary" text-color="white" class="pa-0 v-chip--x-small" disabled) new].
      {{ item.description }}
</template>

<script>
import skills from '~/static/data/skills.json'
export default {
  props: {
    abilityLimit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      skills
    }
  },
  computed: {
    items () {
      if (this.abilityLimit) {
        return this.skills.filter(s => s.link === this.abilityLimit)
      }
      return this.skills
    }
  }
}
</script>
