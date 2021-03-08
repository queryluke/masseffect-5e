<template>
  <div>
    <v-avatar
      :size="size"
      tile
    >
      <img :src="image" alt="Character Image">
    </v-avatar>
    <div>
      <v-dialog v-model="dialog" max-width="500">
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            Change Image
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            Change Image URL
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="image" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    image: {
      get () {
        return this.$store.getters['user/character'].image
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'image', value })
      }
    },
    size () {
      return this.$vuetify.breakpoint.xs
        ? 75
        : this.$vuetify.breakpoint.smAndDown
          ? 125
          : 200
    }
  }
}
</script>
