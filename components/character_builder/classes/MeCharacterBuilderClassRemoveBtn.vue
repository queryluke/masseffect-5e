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
        v-bind="attrs"
        :icon="$vuetify.breakpoint.smAndUp"
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
          <v-col>
            Delete {{ klassData.name }} Class
          </v-col>
          <v-col class="text-right">
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
          Yes, remove my {{ klassData.name }} class
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    classIndex: {
      type: Number,
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
      const tempArr = this.characterClasses.slice()
      tempArr.splice(this.classIndex, 1)
      this.$store.dispatch('cb/DELETE_SELECTIONS', { cid: this.cid, id: `klass-${this.klass.id}` })
      if (['soldier', 'vanguard', 'sentinel'].includes(this.klass.id)) {
        // FIXME
        const oldFs = [...this.character.fightingStyles]
        const fsIndex = oldFs.findIndex(i => i.id === `fighting-style-${this.klass.id}`)
        if (fsIndex > -1) {
          oldFs.splice(fsIndex, 1)
          if (this.subklass === 'gladiator') {
            const gladIndex = oldFs.find(i => i.id === 'additional-fighting-style')
            if (gladIndex) {
              oldFs.splice(gladIndex, 1)
            }
          }
          this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'fightingStyles', value: oldFs })
        }
      }
      this.characterClasses = tempArr
      this.dialog = false
    }
  }
}
</script>
