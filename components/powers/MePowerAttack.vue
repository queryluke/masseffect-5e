<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'MePowerAttack',
  props: {
    mechanic: {
      type: Object,
      default: () => {
        return {
          attack: false,
          dc: false
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
      if (this.mechanic.attack) {
        array.push(this.$t(`attack_types.${this.mechanic.attack.type}`))
      }
      if (this.mechanic.dc?.save) {
        const text = ['str', 'dex', 'con', 'int', 'wis', 'cha'].includes(this.mechanic.dc.save)
          ? this.$t('save_text', { type: this.$t(`abilities.${this.mechanic.dc.save}.abbr`) })
          : this.mechanic.dc.save
        array.push(text)
      }
      if (array.length === 0) {
        return '-'
      }
      if (this.abbr) {
        return `${array[0]}${array.length > 1 ? ' (...)' : ''}`
      } else {
        return this.$t(`lists.comma_list[${array.length}]`, array)
      }
    }
  }
}
</script>
