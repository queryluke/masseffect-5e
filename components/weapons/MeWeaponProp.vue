<template>
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
        <me-html :content="item.description" />
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
      dialog: false,
      item: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    transition () {
      return this.$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'
    }
  },
  async created () {
    // TODO: replace weapon prop array with slug-case
    const id = this.id.toLowerCase().replace(' ', '-')
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'weapon-properties', id })
  }
}
</script>
