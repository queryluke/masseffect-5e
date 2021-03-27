<template>
  <div>
    <v-dialog v-model="dialog" max-width="500">
      <template #activator="{ on, attrs }">
        <v-avatar
          :size="size"
          tile
          v-bind="attrs"
          v-on="on"
        >
          <img :src="image" alt="Character Image">
        </v-avatar>
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
        return this.$store.getters['cb/characters'][this.$route.query.cid].character.image
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: 'image', value })
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
