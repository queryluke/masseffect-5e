<template>
  <div>
    <v-hover>
      <template #default="{hover}">
        <v-card elevation="0" :height="defaultSize" :width="defaultSize" @click="dialog = true">
          <v-img :src="image" alt="Character Image" contain :height="defaultSize" :width="defaultSize" />
          <v-fade-transition>
            <v-overlay
              v-if="hover"
              absolute
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          Change Image URL
          <v-spacer />
          <v-icon @click="dialog = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <div class="d-flex justify-center">
            <v-img :src="image" alt="Character Image" contain :height="250" :width="250" />
          </div>
          <me-cb-debounced-input path="image" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  props: {
    size: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['image']),
    defaultSize () {
      if (this.size) {
        return this.size
      }
      return this.$vuetify.breakpoint.xs
        ? 150
        : this.$vuetify.breakpoint.smAndDown
          ? 125
          : 150
    }
  }
}
</script>
