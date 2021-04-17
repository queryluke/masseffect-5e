<template>
  <v-skeleton-loader
    :loading="$fetchState.pending"
    type="text"
    class="d-inline-block"
    width="75"
  >
    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      :transition="transition"
      width="70vw"
      scrollable
    >
      <template #activator="{ on }">
        <a v-on="on">{{ item.name }}</a>
      </template>
      <v-card>
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-text>
          <me-html :content="item.html" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click.native="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'MeWeaponProp',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  async fetch () {
    await this.$store.dispatch('FETCH_DATA', 'weapon-properties')
  },
  computed: {
    item () {
      return this.$store.getters.getItem('weapon-properties', this.id)
    },
    transition () {
      return this.$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'
    }
  }
}
</script>
