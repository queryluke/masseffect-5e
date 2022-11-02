<template>
  <v-card
    tile
    outlined
    flat
    class="mb-1 power-select-card"
    @click="showInfo = !showInfo"
  >
    <div class="d-flex justify-space-between align-start py-1">
      <div class="d-flex align-center text-truncate">
        <v-tooltip v-if="item.disabled && item.learned" bottom>
          <template #activator="{ on, attrs }">
            <v-icon
              color="error"
              v-bind="attrs"
              v-on="on"
            >
              mdi-alert
            </v-icon>
          </template>
          <span>You no longer meet the requirements for this power</span>
        </v-tooltip>

        <v-avatar size="22">
          <v-img :src="require(`~/assets/images/powers/${item.data.type}.svg`)" />
        </v-avatar>
        <div class="pl-1">
          <div class="mb-0 text-caption">
            <v-badge v-if="!!item.data.homebrew" inline dot>
              <span>
                {{ item.data.name }} <small class="font-weight-thin"><me-power-level :level="item.data.level" /></small>
              </span>
            </v-badge>
            <span v-else>
              {{ item.data.name }} <small class="font-weight-thin"><me-power-level :level="item.data.level" /></small>
            </span>
          </div>
        </div>
      </div>
      <div class="d-flex justify-end align-center">
        <!-- add/remove button -->
        <v-btn
          v-if="item.fromFeature"
          x-small
          text
          disabled
          max-width="52"
        >
          {{ prepared ? 'Prepared' : 'Learned' }}
        </v-btn>
        <v-btn
          v-else
          x-small
          outlined
          :color="item.learned ? 'error' : 'primary'"
          max-width="52"
          @click.stop="$emit('togglePower', item.data.id)"
        >
          {{ item.learned ? 'Remove' : `${prepared ? 'Prepare' : 'Learn'}` }}
        </v-btn>
        <!-- more info -->
        <v-btn
          x-small
          icon
          class="ml-1"
          @click.stop="showInfo = !showInfo"
        >
          <v-icon>
            {{ showInfo ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-card-actions v-if="item.data.advancements && (item.learned || item.fromFeature)" class="pt-0">
      <!-- Advancement Menu -->
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            x-small
            outlined
            class="mr-1"
            :disabled="!item.learned && !item.fromFeature"
            v-on="on"
          >
            {{ advMenuText }}
            <v-icon right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="adv in item.data.advancements"
            :key="adv.id"
            @click="$emit('setPowerAdv', { id: item.data.id, advId: adv.id, fromFeature: item.fromFeature })"
          >
            <v-list-item-icon>
              <v-icon :color="item.advancement === adv.id? 'primary' : undefined" size="16">
                {{ item.advancement === adv.id ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-caption">
              {{ adv.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showInfo">
        <v-divider />
        <div v-if="item.data.homebrew" class="text-caption pl-4 pt-1">
          <em>homebrew by {{ item.data.homebrew.createdBy }}</em>
        </div>
        <me-cs-powers-info :item="mechanic" :html="item.data.html" :advancements="item.data.advancements" :selected-advancement="item.advancement" />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>

export default {
  name: 'MeCsPowerSelectCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    prepared: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showInfo: false
    }
  },
  computed: {
    mechanic () {
      return this.item.data.mechanics[0]
    },
    advMenuText () {
      return this.item.advancement ? this.item.data.advancements.find(i => i.id === this.item.advancement)?.name || '- unknown -' : 'Advance'
    }
  }
}
</script>

<style>
.power-select-card.v-card--link:focus:before {
  opacity: 0;
}
</style>
