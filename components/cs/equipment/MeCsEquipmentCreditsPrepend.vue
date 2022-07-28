<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-avatar>
        <v-img :src="require(`~/assets/images/misc/credits.png`)" />
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ credits | groupDigits(',') }} credits
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>

export default {
  name: 'MeCsEquipmentCreditsPrepend',
  computed: {
    credits () {
      return this.$store.getters['character/credits']
    }
  }
}
</script>
