<template>
  <me-cs-roll-card v-if="damageRoll" :roll="damageRoll">
    <div class="ma-1">
      {{ damage.text }}
      <v-tooltip bottom open-delay="200">
        <template #activator="{ on, attrs }">
          <v-icon
            size="12"
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
</template>
<script>
export default {
  name: 'MeCsActionDc',
  props: {
    damage: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon () {
      return 'mdi-' + this.$store.state.config.damageTypeAttributes[this.damage.type].icon
    },
    color () {
      return this.$store.state.config.damageTypeAttributes[this.damage.type].color
    },
    damageRoll () {
      if (!this.damage.text.toString().includes('d')) {
        return false
      }
      const type = this.damage.type === 'temp'
        ? 'temp hp'
        : this.damage.type
      return {
        notation: this.damage.text,
        detail: this.damage.detail,
        type
      }
    }
  }
}
</script>
