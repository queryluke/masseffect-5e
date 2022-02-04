<template>
  <v-tooltip bottom :disabled="!item.note">
    <template #activator="{ on, attrs }">
      <v-card flat class="text-center" v-bind="attrs" color="transparent" v-on="on">
        <div class="text-subtitle-2 mb-n1">
          {{ save }}<span v-if="item.note">*</span>
        </div>
        <div v-if="item.save" class="text-caption font-weight-light">
          <small>
            {{ item.save.toUpperCase() }}
          </small>
        </div>
      </v-card>
    </template>
    <span>{{ item.note }}</span>
  </v-tooltip>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCsActionDc',
  props: {
    dc: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaults: {
        base: 8,
        proficient: true,
        mod: false,
        save: false,
        textBonus: false
      }
    }
  },
  computed: {
    ...mapGetters({ abilityBreakdown: 'abilities/abilityBreakdown', profBonus: 'profBonus' }),
    item () {
      return { ...this.defaults, ...this.dc }
    },
    mod () {
      if (this.item.mod) {
        return this.abilityBreakdown[this.item.mod].mod
      }
      return 0
    },
    save () {
      return this.mod + this.item.base + (this.item.proficient ? this.profBonus : 0)
    }
  }
}
</script>
