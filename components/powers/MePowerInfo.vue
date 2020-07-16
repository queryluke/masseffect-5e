<template>
  <div>
    <me-item-title
      v-if="title"
      :title="item.name"
      avatar
      :avatar-src="`/images/powers/${item.type}.svg`"
    />
    <v-row>
      <v-col cols="6" md="3">
        <me-item-stat label="Level">
          <template v-slot:stat>
            <me-power-level :item="item" />
          </template>
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat label="Casting Time">
          <template v-slot:stat>
            {{ item.castingTime }}
          </template>
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat label="Duration">
          <template v-slot:stat>
            <me-power-duration :item="item" />
          </template>
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat label="Range / Area">
          <template v-slot:stat>
            <me-power-range :item="item" />
          </template>
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat label="Primes / Detonates">
          <template v-slot:stat>
            <span v-if="item.primes" :class="pdCss(item.primes)">
              Primes ({{ item.primes }})
            </span>
            <span v-if="item.primes && item.detonates" class="mx-1">
              |
            </span>
            <span v-if="item.detonates" :class="pdCss('detonates')">
              Detonates
            </span>
            <span v-if="!item.detonates && !item.primes">
              -
            </span>
          </template>
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat label="Attack Type">
          <template v-slot:stat>
            <me-power-attack :item="item" />
          </template>
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <me-item-stat label="Damage / Effect">
          <template v-slot:stat>
            <me-power-effect :item="item" />
          </template>
        </me-item-stat>
      </v-col>
      <v-col cols="6" md="3">
        <div>
          <v-row justify="start" align-content="center" no-gutters>
            <v-col v-for="klass in item.availableClasses" :key="klass" cols="auto">
              <v-avatar size="45" tile>
                <v-img :src="`/images/classes/${klass}.svg`" :alt="klass" />
              </v-avatar>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-progress-linear :value="100" color="secondary" class="my-3" />
    <me-html :content="item.html" />
    <!-- TODO: Move Advancements into the markdown via custom content (:::) -->
    <div v-if="item.advancementOptions">
      <p class="text-h6 mb-0">
        Advancement Options
      </p>
      <v-row justify="center">
        <v-col v-for="opt in item.advancementOptions" :key="opt.name" cols="12" md="6">
          <v-card>
            <v-card-title class="text-subtitle-1">
              {{ opt.name }}
            </v-card-title>
            <v-card-text>
              {{ opt.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MePowerInfo',
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    title: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    primeTypeText () {
      return this.$store.getters['config/primeTypeText']
    }
  },
  methods: {
    pdCss (string) {
      const mode = this.$vuetify.theme.dark ? 'dark' : 'light'
      return this.primeTypeText[mode][string]
    }
  }
}
</script>
