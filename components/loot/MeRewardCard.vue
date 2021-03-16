<template>
  <v-card shaped>
    <v-toolbar flat>
      <v-toolbar-title>
        Reward #{{ index + 1 }}
      </v-toolbar-title>
      <v-spacer />
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="$emit('remove-loot', index)"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <div class="text-subtitle-1">
        Credits: {{ loot.credits | groupDigits(',') }}
      </div>
      <div
        v-if="loot['thermal clips'] > 0 || loot['heavy weapon charges'] > 0 || loot['omni-gel'] > 0 || loot['medi-gel'].length > 0"
      >
        <div class="text-subtitle-2">
          Consumables
        </div>
        <div v-if="loot['thermal clips'] > 0">
          {{ loot['thermal clips'] }} thermal clips
        </div>
        <div v-if="loot['heavy weapon charges'] > 0">
          {{ loot['heavy weapon charges'] }} heavy weapon charges
        </div>
        <div v-if="loot['omni-gel'] > 0">
          {{ loot['omni-gel'] }} omni-gel
        </div>
        <div v-if="loot['medi-gel'].length > 0">
          Medigel: {{ loot['medi-gel'].map(i => `${i.count} ${i.type}`).join(', ') }}
        </div>
      </div>
      <me-reward-section
        v-if="loot.weapons.length > 0"
        title="Weapons"
        :rewards="loot.weapons"
      />
      <me-reward-section
        v-if="loot.armor.length > 0"
        title="Armor"
        :rewards="loot.armor"
      />
      <me-reward-section
        v-if="loot.gear.length > 0"
        title="Gear"
        :rewards="loot.gear"
      />
      <me-reward-section
        v-if="loot.mods.length > 0"
        title="Mods"
        :rewards="loot.mods"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-information-outline' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider />
        <v-card-text>
          <v-list dense two-line>
            <v-subheader>
              REWARD INFO
            </v-subheader>
            <template v-for="(l, lIndex) in loot.log">
              <v-list-item :key="lIndex">
                <v-list-item-content>
                  <v-list-item-title style="white-space: normal">
                    {{ l.text }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ l.result }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider :key="`${lIndex}-divider`" />
            </template>
          </v-list>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'MeRewardCard',
  props: {
    index: {
      type: Number,
      required: true
    },
    loot: {
      type: Object,
      default: () => { return {} }
    }
  },
  data: () => {
    return {
      show: false
    }
  }
}
</script>

<style>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>
