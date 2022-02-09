<template>
  <div v-if="hasValues">
    <div class="d-flex align-center">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <div v-bind="attrs" class="d-flex justify-center align-center" style="height: 18px" v-on="on">
            <v-icon v-if="item.subIcon" :color="item.subIconColor" style="z-index: 1; position: absolute" size="18">
              {{ item.subIcon }}
            </v-icon>
            <v-icon :color="item.iconColor" :title="item.title" size="18">
              {{ item.icon }}
            </v-icon>
          </div>
        </template>
        <span>{{ item.title }}</span>
      </v-tooltip>
      <div class="text-caption d-flex pl-1 flex-wrap">
        <span v-for="(text, index) of item.text" :key="`text-${index}`" class="pl-1">
          <v-tooltip v-if="text.noteIndex" bottom>
            <template #activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                {{ defenseTypeText(text) }}{{ item.text.length > index + 1 ? ',' : '' }}
              </div>
            </template>
            <span>{{ asters(text.noteIndex) }} - {{ item.notes[text.noteIndex] }}</span>
          </v-tooltip>
          <span v-else>
            {{ defenseTypeText(text) }}{{ item.text.length > index + 1 ? ',' : '' }}
          </span>
        </span>
        <span v-if="item.special">
          {{ item.text.length ? ', ' : '' }}{{ item.special.join(', ') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/defenses')
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['conditionsTextMap']),
    hasValues () {
      return this.item.text.length > 0 || this.item.special.length > 0
    }
  },
  methods: {
    asters (index = null) {
      if (!index) {
        return ''
      }
      return ''.padStart(index, '*')
    },
    defenseTypeText ({ id, noteIndex = null }) {
      const text = this.item.type === 'condition-immunity' ? this.conditionsTextMap[id] : this.$t(`damage_types.${id}_title`)
      const asters = this.asters(noteIndex)
      return `${text}${asters}`
    }
  }
}
</script>
