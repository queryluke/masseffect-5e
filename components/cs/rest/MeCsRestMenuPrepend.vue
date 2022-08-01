<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="text-capitalize">
        {{ type }} Rest
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn small text @click="reset">
        Reset
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>

export default {
  name: 'MeCsRestMenuPrepend',
  computed: {
    type () {
      return this.$store.getters['character/navigation/restMenu']
    }
  },
  methods: {
    reset () {
      this.$store.commit('character/navigation/SET', { key: 'restState', value: 'reset' })
    }
  }
}
</script>
