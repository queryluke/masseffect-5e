<template>
  <div class="d-flex justify-center">
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
        const char = this.$store.getters['cb/characters'][this.$route.query.cid].character
        const img = char.image || char.species.bodyImg
        return img
      },
      set (value) {
        return this.$store.commit('cb/UPDATE_CHARACTER', { cid: this.$route.query.cid, attr: 'image', value })
      }
    },
    size () {
      return this.$vuetify.breakpoint.xs
        ? 150
        : this.$vuetify.breakpoint.smAndDown
          ? 125
          : 150
    }
  }
}
</script>
