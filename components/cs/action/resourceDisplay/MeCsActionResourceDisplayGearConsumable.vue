<template>
  <div class="d-flex align-center">
    <me-cs-action-consume-btn :id="id" :use-equipped-amount="useEquippedAmount" class="ma-1" />
    <div class="text-caption font-italic mr-1">
      {{ equippedAmount }} remaining
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsActionResourceDisplayGearConsumable',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    item () {
      return this.$store.getters['character/equipment/equipment'].find(i => i.uuid === this.id)
    },
    useEquippedAmount () {
      const option = this.item.subType === 'grenade'
        ? 'grenadeSlots'
        : this.item.subType === 'medi_gel'
          ? 'medigelSlots'
          : null
      return option ? this.$store.getters['character/character'].options[option] : false
    },
    equippedAmount () {
      return this.useEquippedAmount ? this.item.equippedAmount : this.item.uses
    }
  }
}
</script>
