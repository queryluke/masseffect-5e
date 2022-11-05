<template>
  <v-list-item two-line>
    <v-list-item-avatar>
      <v-avatar>
        <v-img :src="require(`~/assets/images/powers/${powerData.type}.svg`)" />
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ powerData.name }}</v-list-item-title>
      <v-list-item-subtitle class="text-caption text-capitalize">
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>

export default {
  name: 'MeCsPowerSideNavPrepend',
  computed: {
    powerToDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    powerData () {
      return this.$store.getters['character/powers/powerList'].find(i => i.id === this.powerToDisplay.id)
    },
    subtitle () {
      if (this.powerData.level === 0) {
        return `${this.powerData.type} Cantrip`
      }
      return `${this.$t(`ordinal_numbers[${this.powerData.level}]`)} Level ${this.powerData.type} power`
    }
  }
}
</script>
