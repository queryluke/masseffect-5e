<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="this.$vuetify.breakpoint.xsOnly"
    :transition="transition"
    width="70vw"
    scrollable
  >
    <template v-slot:activator="{ on }">
      <a
        :class="stringCss"
        v-on="on"
      >{{ text }}</a>
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
</template>

<script>
export default {
  name: 'MeCondition',
  props: {
    id: {
      type: String,
      default: ''
    },
    sub: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: false,
      item: {
        name: '',
        html: ''
      }
    }
  },
  computed: {
    text () {
      return this.sub !== '' ? `${this.id}: ${this.sub}` : this.id
    },
    primeTypeText () {
      return this.$store.getters['config/primeTypeText']
    },
    stringCss () {
      const mode = this.$vuetify.theme.dark ? 'dark' : 'light'
      return this.id === 'primed' ? this.primeTypeText[mode][this.sub] : ''
    },
    transition () {
      return this.$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'
    }
  },
  async created () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'conditions', id: this.id })
  }
}
</script>
