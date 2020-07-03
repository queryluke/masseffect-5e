<template lang="pug">
  div
    p.mb-0
      strong
        em {{ attack.name }}.
      em.ml-1 {{ attack.type | capitalize }} Weapon Attack:
      span.ml-1 +{{ attack.attackMod }} to hit,
      span.ml-1 {{ range }},
      span.ml-1 {{ attack.target }}.
      p(:class="[attack.miss ? 'my-0' : 'mt-0']") #[em Hit]: {{ attack.hit }}
      p(v-if="attack.miss").mt-0 #[em Miss]: {{ attack.miss }}
</template>

<script>
export default {
  props: {
    attack: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    range () {
      if (this.attack.type === 'melee') {
        return `reach ${this.attack.range}m`
      }
      if (this.attack.type === 'ranged') {
        return `range ${this.attack.range}/${this.attack.range * 3}m`
      }
      return ''
    }
  }
}
</script>
