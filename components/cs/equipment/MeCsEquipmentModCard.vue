<template>
  <v-card outlined @click="expand">
    <v-card-text class="pa-2 d-flex justify-space-between">
      <div class="d-flex">
        <div class="text-caption text-uppercase" style="width: 69px">
          <small>
            <slot />
          </small>
        </div>
        <div>
          <span v-if="item" :class="textColor">
            {{ item.name }}
          </span>
          <span v-else class="grey--text text--darken-1">
            (empty)
          </span>
        </div>
      </div>
      <v-btn
        v-if="item"
        x-small
        color="error"
        outlined
        icon
        @click.stop="expanded = false; $emit('remove')"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-text>
    <v-expand-transition>
      <v-card-text v-show="expanded">
        <me-html v-if="!loading" :content="item.html" :classes="'text-caption'" />
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      expanded: false,
      loading: false
    }
  },
  computed: {
    item () {
      if (this.id) {
        return this.$store.getters.getData('mods').find(i => i.id === this.id)
      }
      return false
    },
    textColor () {
      return this.$store.getters['config/rarityTextColor'](this.item.rarity)
    }
  },
  watch: {
    id () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 100)
    }
  },
  methods: {
    expand () {
      if (this.item) {
        this.expanded = !this.expanded
      }
    }
  }
}
</script>
