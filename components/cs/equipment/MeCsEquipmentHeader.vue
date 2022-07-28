<template>
  <v-row class="mx-4 mt-sm-2" no-gutters>
    <v-col cols="12" order="1" order-sm="2" class="d-flex justify-center justify-sm-end align-center mb-6 mb-sm-0">
      <v-card flat class="px-1 mr-2 d-flex align-start" @click="showSideNav('me-cs-equipment-credits')">
        <v-avatar size="16">
          <v-img :src="require(`~/assets/images/misc/credits.png`)" />
        </v-avatar>
        <span class="text-uppercase text-caption font-weight-bold mx-1">
          {{ credits | groupDigits(',') }}
        </span>
      </v-card>
      <v-btn x-small outlined color="primary" @click="showSideNav('me-cs-equipment-manager')">
        Manage
      </v-btn>
    </v-col>
    <v-col cols="12" order="2" order-sm="1" class="text-center text-sm-left">
      <me-cs-equipment-filter />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MeCsEquipmentHeader',
  computed: {
    credits () {
      return this.$store.getters['character/credits']
    }
  },
  methods: {
    showSideNav (value) {
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', value)
    }
  }
}
</script>
