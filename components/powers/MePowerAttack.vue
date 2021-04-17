<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MePowerAttack',
  props: {
    attack: {
      type: Object,
      default: () => {
        return {
          melee: false,
          ranged: false
        }
      }
    },
    save: {
      type: Object,
      default: () => {
        return {
          dex: false,
          str: false,
          con: false,
          int: false,
          wis: false,
          cha: false
        }
      }
    },
    abbr: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    text () {
      const array = []
      for (const key in this.attack) {
        if (this.attack[key]) {
          array.push(this.$t(`attack_types.${key}`))
        }
      }
      for (const key in this.save) {
        if (this.save[key]) {
          array.push(this.$t('save_text', { type: this.$t(`abilities.${key}.abbr`) }))
        }
      }
      if (array.length === 0) {
        return '-'
      }
      if (this.abbr) {
        return `${array[0]} (...)`
      } else {
        return this.$t(`lists.comma_list[${array.length}]`, array)
      }
    }
  }
}
</script>
