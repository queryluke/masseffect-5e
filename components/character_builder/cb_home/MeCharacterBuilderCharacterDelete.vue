<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template
      v-slot:activator="{ on, attrs }"
    >
      <v-btn
        class="mx-2"
        color="red"
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
          <v-col>
            Delete {{character.name}}
          </v-col>
          <v-col class="text-right">
            <v-btn
              color=""
              small
              icon
              @click="dialog=false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        Are you sure you want to delete this character? This action cannot be undone.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          text
          @click="removeCharacter(character.id)"
        >
          Yes, permenantly delete {{character.name}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeCharacter () {
      // console.log('EMMITING deleteCharacter with id: ' + charId)
      this.$emit('deleteCharacter', this.character)
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
