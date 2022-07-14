<template>
  <div>
    <me-cs-roll-card v-if="damageRoll" :roll="damageRoll">
      <div class="ma-1" :class="{'text-body-1': large, 'font-weight-bold': large }">
        {{ damage.text }}
        <v-tooltip bottom open-delay="200">
          <template #activator="{ on, attrs }">
            <v-icon
              :size="large ? 16 : 12"
              v-bind="attrs"
              v-on="on"
            >
              {{ icon }}
            </v-icon>
          </template>
          <span>{{ damage.type }}</span>
        </v-tooltip>
      </div>
    </me-cs-roll-card>
    <div v-else class="ma-1">
      {{ damage.text }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'MeCsActionDamage',
  props: {
    damage: {
      type: Object,
      required: true
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon () {
      return 'mdi-' + this.$store.state.config.damageTypeAttributes[this.damage.type]?.icon
    },
    color () {
      return this.$store.state.config.damageTypeAttributes[this.damage.type]?.color
    },
    damageRoll () {
      const type = this.damage.type === 'temp'
        ? 'temp hp'
        : this.damage.type
          ? this.damage.type
          : 'Damage'
      return {
        notation: this.damage.notation,
        detail: this.damage.detail,
        type: this.damage.label || type,
        text: this.damage.text
      }
    }
  }
}
</script>
