<template>
  <v-card-text>
    <div class="text-body-2 font-italic">
      {{ $t(`armor_types.${item.type}_armor_title`) }}, {{ $t(`rarities.${item.rarity}`) }}
    </div>
    <v-divider class="my-1" />
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Proficient:</span>
      {{ proficient }}
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Placement:</span>
      {{ $t(`armor_placements.${item.placement}_title`) }}
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Mod Slots:</span>
      {{ item.slots || 0 }}
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Cost:</span>
      {{ item.cost | groupDigits(',') }}
    </div>
    <me-hr size="2" />
    <div class="mt-1">
      <me-html v-if="!loading" :content="item.html" :classes="'text-caption'" />
      <div v-if="item.setBonus" class="text-caption mt-1">
        <div class="font-weight-bold">
          Set Bonus
        </div>
        <div v-for="(bonus, index) in item.setBonus.bonuses" :key="`sb-${index}`">
          <v-card :outlined="setEqCount >= bonus.threshold" flat :class="setEqCount >= bonus.threshold ? 'mt-4' : ''">
            <div class="px-1 py-2">
              <v-badge tile :value="setEqCount >= bonus.threshold" content="Active" offset-x="60" offset-y="2">
                <span class="font-weight-medium font-italic">> {{ bonus.threshold }} of {{ item.setBonus.max }}.</span>
                <me-html v-if="!loading" :content="bonus.text" inline :classes="'text-caption'" />
              </v-badge>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </v-card-text>
</template>

<script>

export default {
  name: 'MeCsEquipmentArmorInfo',
  props: {
    item: {
      type: Object,
      required: true
    },
    setEqCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    proficient () {
      return this.$store.getters['character/profs/profs'].armor.includes(this.item.type) ? 'Yes' : 'No'
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
