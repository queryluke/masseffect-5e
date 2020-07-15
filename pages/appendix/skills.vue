<template>
  <v-container>
    <me-page-title />
    <v-row>
      <v-col cols="12" md="6">
        <p class="text-h6">
          New
        </p>
        <p class="text-body-2">
          Electronics, Engineering, Science, Vehicle Handling
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <p class="text-h6">
          Removed
        </p>
        <p class="text-body-2">
          Animal Handling, Arcana, Nature, Religion
        </p>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.name"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.link }}</v-list-item-subtitle>
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
    this.items = await this.$store.dispatch('FETCH_DATA', 'skills')
    this.$store.commit('pageTitle', 'Skills')
  },
  data () {
    return {
      dialog: false,
      items: [],
      headers: [
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Ability', value: 'link', align: 'left' }
      ],
      item: {
        name: '',
        link: '',
        description: ''
      }
    }
  },
  methods: {
    showSkill (item) {
      this.item = item
      this.dialog = true
    }
  },
  head () {
    return {
      title: 'Skills - Appendix | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Mass Effect 5e comes with a few futuristic skill options!' }
      ]
    }
  }
}
</script>
