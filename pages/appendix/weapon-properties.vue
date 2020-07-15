<template>
  <v-container>
    <me-page-title />
    <v-list class="mt-5">
      <v-list-item
        v-for="item in items"
        :key="item.name"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <div class="text-body-2 font-weight-light">
            {{ item.description }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.items = await this.$store.dispatch('FETCH_DATA', 'weapon-properties')
    this.$store.commit('pageTitle', 'Weapon Properties')
  },
  data () {
    return {
      items: []
    }
  },
  head () {
    return {
      title: 'Weapon Properties - Appendix | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Mass Effect 5e comes with some new and fun weapon properties!' }
      ]
    }
  }
}
</script>
