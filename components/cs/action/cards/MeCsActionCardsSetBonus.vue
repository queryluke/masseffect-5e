<template>
  <v-card outlined class="pa-1 px-md-3 my-3" min-height="64">
    <div>
      <div class="d-flex align-center">
        <v-card flat color="transparent">
          <div class="mb-n1 text-body-1">
            <small class="text-truncate font-weight-bold text-capitalize">
              {{ item.name }} <small>(armor set bonus)</small>
            </small>
          </div>
        </v-card>
      </div>
      <template v-for="(ab, index) of item.activeBonuses">
        <div v-if="ab.showNote" :key="`active-bonus-${index}`" class="my-1">
          <span class="text-caption font-weight-bold">
            {{ ab.threshold }} of {{ item.max }}.
          </span>
          <me-html :content="ab.text" classes="text-caption" inline />
        </div>
      </template>
      <div class="d-flex align-center">
        <span class="text-caption font-weight-bold">
          Equipped.
        </span>
        <v-chip v-for="armItem of item.items" :key="armItem.uuid" x-small class="mx-1" @click="showArmor(armItem.uuid)">
          {{ armItem.name }}
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<script>

export default {
  name: 'MeCsActionCardsSetBonus',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    showArmor (uuid) {
      this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: uuid })
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-equipment-armor-side-nav')
    }
  }
}
</script>
