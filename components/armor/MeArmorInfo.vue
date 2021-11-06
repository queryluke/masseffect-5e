<template>
  <div>
    <me-armor-title v-if="title" :title="item.name" />
    <v-row>
      <v-col cols="12" md="9" lg="10" class="text-body-2">
        <div class="text-caption">
          <em>{{ item.flavor }}</em>
        </div>
        <v-progress-linear :value="100" color="secondary" :height="2" class="my-2" />
        <div>
          <me-html :content="item.html" />
        </div>
        <div v-if="item.set">
          <span class="text-overline">
            {{ $t('set_bonus') }}
          </span>
          <ul v-if="!$fetchState.pending">
            <li v-for="(bonus, index) in setBonus.bonuses" :key="index">
              <span class="pr-1">{{ $t('set_bonus_range', {min: bonus.threshold, max: setBonus.max}) }}</span>
              <me-html :content="bonus.text" inline />
            </li>
          </ul>
          <me-andromeda-chip v-if="item.andromeda" />
        </div>
      </v-col>
      <v-col cols="12" md="3" lg="2" class="text-sm-center">
        <v-img
          v-if="item.image"
          :src="item.image"
          :max-height="$vuetify.breakpoint.smAndDown ? 150 : null"
          :contain="$vuetify.breakpoint.smAndDown"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: Boolean,
      default: false
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'set-bonuses')
  },
  computed: {
    setBonus () {
      return this.$store.getters.getData('set-bonuses').find(i => i.id === this.item.set)
    }
  }
}
</script>
