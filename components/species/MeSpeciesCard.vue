<template>
  <v-card
    :to="localePath({ name: 'species-id', params: { id: item.id } })"
    nuxt
    hover
    class="flex-grow-1"
  >
    <v-img :src="item.img" height="200" />
    <v-card-title>
      {{ item.name }}
    </v-card-title>
    <v-card-text>
      <p>
        {{ item.snippet }}
      </p>
      <p class="text-subtitle-1 mb-0">
        {{ $t('traits_title') }}
      </p>
      <p>
        {{ traitsPreview }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    traits () {
      return this.$store.getters.getData('traits').filter(i => i.species.includes(this.item.id))
    },
    traitsPreview () {
      let textArray = this.item.abilityScoreIncrease.map((i) => {
        return `+${i.amount} ${this.$t(`abilities.${i.ability}.title`)}`
      })
      if (this.traits.length > 0) {
        textArray = textArray.concat(this.traits.map(i => i.name))
      }
      return this.$t(`lists.comma_list[${textArray.length}]`, textArray)
    }
  }
}
</script>
