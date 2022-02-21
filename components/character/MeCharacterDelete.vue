<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <slot name="deleteBtn">
        <v-btn class="mx-2" color="red" v-bind="attrs" :text="textBtn" v-on="on">
          <v-icon>
            mdi-trash-can
          </v-icon>
        </v-btn>
      </slot>
    </template>

    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            Delete {{ name }}?
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
        Are you sure you want to delete this character? This action cannot be undone.
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red"
          text
          :loading="deleting"
          @click="removeCharacter"
        >
          Yes, permenantly delete {{ name }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    textBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      deleting: false
    }
  },
  methods: {
    async removeCharacter () {
      this.deleting = true
      await this.$store.dispatch('characters/DELETE_CHARACTER', this.id)
      this.dialog = false
      this.deleting = false
    }
  }
}
</script>
