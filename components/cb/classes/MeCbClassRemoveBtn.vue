<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template
      #activator="{ on, attrs }"
    >
      <v-btn
        class="mx-2"
        color="red"
        small
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>
          mdi-trash-can
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="10">
            Delete {{ item.data.name }} Class
          </v-col>
          <v-col class="text-right" cols="2">
            <v-btn
              color=""
              small
              icon
              @click="dialog=false"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        Are you sure you want to delete this class? This action cannot be undone.
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red"
          text
          @click="removeClass"
        >
          Yes, remove my {{ item.data.name }} class
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'MeCbClassRemoveBtn',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    removeClass () {
      this.$store.dispatch('character/klasses/REMOVE_KLASS', this.item.id)
      this.$store.dispatch('character/mechanics/INIT_MECHANICS')
      this.dialog = false
    }
  }
}
</script>
