<template>
  <v-card
    :to="localePath({ name: 'classes-id', params: { id: item.id }})"
    hover
    class="ma-2"
  >
    <v-row>
      <v-col cols="4" sm="3" md="5" xl="4">
        <v-img
          :src="require(`~/assets/images/classes/${item.id}.svg`)"
          position="right"
        />
      </v-col>
      <v-col class="pa-6 pl-0">
        <h3 class="text-h4 font-weight-thin">
          {{ item.name }}
        </h3>
        <p class="body-2">
          {{ item.snippet }}
        </p>
        <me-stat-list>
          <me-stat-list-item v-for="(stat, index) in stats" :key="index" :label="stat.title">
            {{ stat.value }}
          </me-stat-list-item>
        </me-stat-list>
      </v-col>
    </v-row>
  </v-card>
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
    stats () {
      return [
        { title: this.$t('hit_dice_title'), value: this.$t('dice', { dieCount: 1, dieType: this.item.hitDie }) },
        { title: this.$t('primary_ability_title'), value: this.$t(`lists.short_or_list[${this.item.primaryAbility.length}]`, this.primaryAbilityTextArray) },
        { title: this.$t('saves_title'), value: this.$t(`lists.short_comma_list[${this.item.profs['saving-throw'].has.length}]`, this.savingThrowsTextArray) }
      ]
    },
    primaryAbilityTextArray () {
      return this.item.primaryAbility.map(i => this.$t(`abilities.${i}.title`))
    },
    savingThrowsTextArray () {
      return this.item.profs['saving-throw'].has.map(i => this.$t(`abilities.${i}.title`))
    }
  }
}
</script>
