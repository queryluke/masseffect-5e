<template>
  <v-card flat class="mx-auto" max-width="450px">
    <v-card-title>
      Selected Species
    </v-card-title>
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <v-avatar size="64">
          <v-img :src="species.bodyImg" :position="avatarPosition" />
        </v-avatar>
        <div>
          <div v-if="subName" class="text-overline">
            {{ subName }}
          </div>
          <me-tpg s="h4">
            {{ species.name }}
          </me-tpg>
        </div>
      </div>
      <div class="d-flex flex-column align-center justify-space-around">
        <v-btn outlined small @click="keepOrChange">
          {{ change ? 'Change' : 'Keep' }}
        </v-btn>
        <v-btn
          v-if="change && species.id !== 'custom'"
          x-small
          plain
          color="primary"
          text
          class="mt-3"
          :to="`/species/${variant ? species.species : species.id}`"
          target="_blank"
        >
          View Species Info
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/species')
export default {
  name: 'MeCbSpeciesSelectedCard',
  props: {
    change: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['species', 'subName', 'variant']),
    avatarPosition () {
      return ['volus'].includes(this.species.id) ? 'center center' : 'top center'
    }
  },
  methods: {
    keepOrChange () {
      if (this.change) {
        this.$emit('changeSpecies')
      } else {
        this.$emit('keepSpecies')
      }
    }
  }
}
</script>
