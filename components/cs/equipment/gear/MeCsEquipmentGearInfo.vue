<template>
  <v-card-text>
    <div class="text-body-2 font-italic">
      {{ $t(`gear_types.${item.type}`) }}<span v-if="item.subType" class="pl-1">({{ $t(`gear_types.${item.subType}`) }})</span>, {{ $t(`rarities.${item.rarity}`) }}
    </div>
    <v-divider class="my-1" />
    <div v-if="item.weight" class="text-caption">
      <span class="font-weight-bold pr-1">Weight:</span>
      <me-weight :amount="item.weight" num-only />
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Cost:</span>
      {{ cost }}
    </div>
    <me-hr size="2" />
    <div class="mt-1">
      <me-html v-if="!loading" :content="item.html" :classes="'text-caption'" />
    </div>
  </v-card-text>
</template>

<script>

export default {
  name: 'MeCsEquipmentGearInfo',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    cost () {
      return this.item.cost === 0 ? '-' : this.$options.filters.groupDigits(this.item.cost, ',')
    }
  },
  watch: {
    item () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 10)
    }
  }
}
</script>
