<template>
  <span>
    {{ text }}
  </span>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    text () {
      return this.item.type === 'armor'
        ? this.item.availability.length >= 3
          ? this.$t('mod_availabilities.all_armor')
          : this.$t(`lists.comma_list[${this.item.availability.length}]`, this.item.availability.map(i => this.$t(`armor_types.${i}_armor_title`)))
        : this.item.availability.length >= 5
          ? this.$t('mod_availabilities.all_ranged')
          : this.$t(`lists.comma_list[${this.item.availability.length}]`, this.item.availability.map(i => this.$tc(`weapon_types.${i}`, 1)))
    }
  }
}
</script>
