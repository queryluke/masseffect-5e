<template>
  <v-card-text>
    <div v-if="item.homebrew" class="text-caption mb-2">
      <em>homebrew by {{ item.homebrew.createdBy }}</em>
    </div>
    <div class="text-body-2 font-italic">
      {{ $tc(`weapon_types.${item.type}`, 1) }}, {{ $t(`rarities.${item.rarity}`) }}
    </div>
    <v-divider class="my-1" />
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Proficient:</span>
      {{ proficient }}
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Range:</span>
      <me-weapon-range :item="item" />
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Damage:</span>
      {{ $t('dice', {dieType: item.damage.dieType, dieCount: item.damage.dieCount}) }} {{ $t(`damage_types.${item.damage.type}`) }}
    </div>
    <div v-if="item.heat" class="text-caption">
      <span class="font-weight-bold pr-1">Heat:</span>
      {{ item.heat }}
    </div>
    <div v-if="item.weight" class="text-caption">
      <span class="font-weight-bold pr-1">Weight:</span>
      <me-weight :amount="item.weight" num-only />
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Cost:</span>
      {{ item.cost | groupDigits(',') }}
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Properties:</span>
      {{ properties }}
    </div>
    <me-hr size="2" />
    <div class="mt-1">
      <me-html v-if="!loading" :content="item.html" :classes="'text-caption'" />
    </div>
  </v-card-text>
</template>

<script>

export default {
  name: 'MeCsEquipmentWeaponInfo',
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
    proficient () {
      return this.$store.getters['character/profs/profs'].weapon.includes(this.item.type) ? 'Yes' : 'No'
    },
    weaponProperties () {
      return this.$store.getters['character/equipment/weaponPropertiesList']
    },
    properties () {
      return this.item.properties.map(i => this.weaponProperties.find(j => j.id === i)?.name).join(', ')
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
