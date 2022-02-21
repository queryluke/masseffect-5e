export const DamageTypes = {
  computed: {
    damageTypes () {
      const items = []
      for (const key in this.$i18n.messages.en.damage_types) {
        if (key.endsWith('_damage') || key.endsWith('_title')) {
          continue
        }
        items.push({
          text: this.$t(`damage_types.${key}_title`),
          value: key
        })
      }
      return items
    }
  }
}
