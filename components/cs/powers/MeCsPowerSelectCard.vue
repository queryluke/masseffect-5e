<template>
  <v-card tile outlined flat class="mb-1" @click="showInfo = !showInfo">
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
            {{ item.data.name }} <small class="font-weight-thin"><me-power-level :level="item.data.level" /></small>
          </div>
        </div>
      </div>
      <div class="d-flex justify-end align-center">
        <!-- add/remove button -->
        <v-btn
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
          @click="showInfo = !showInfo"
        >
          <v-icon>
            {{ showInfo ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-card-actions v-if="item.data.advancements && item.learned" class="pt-0">
      <!-- Advancement Menu -->
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            x-small
            outlined
            class="mr-1"
            :disabled="!item.learned"
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
            @click="$emit('setPowerAdv', { id: item.data.id, advId: adv.id })"
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
        <v-card-text>
          <div class="text-caption">
            <span class="font-weight-bold pr-1">Casting Time:</span>
            <me-power-casting-time :casting-times="item.data.castingTimes" />
          </div>
          <div class="text-caption">
            <span class="font-weight-bold pr-1">Duration:</span>
            <me-power-duration :duration="item.data.duration" :concentration="item.data.concentration" />
          </div>
          <div class="text-caption">
            <span class="font-weight-bold pr-1">Range/AoE:</span>
            <me-power-range :range="item.data.range" :aoe="item.data.aoe" />
          </div>
          <div class="text-caption">
            <span class="font-weight-bold pr-1">Primes/Detonates:</span>
            <me-power-primes-detonates :primes="item.data.primes" :detonates="item.data.detonates" />
          </div>
          <div class="mt-1">
            <me-html :content="item.data.html" :classes="'text-caption'" />
          </div>
          <div class="text-caption mt-1">
            <div class="font-weight-bold">
              Advancements
            </div>
            <div v-for="(opt, id) in item.data.advancements" :key="id" class="mb-1">
              <span class="font-weight-medium font-italic">> {{ opt.name }}.</span>
              <me-html :content="opt.text" inline :classes="'text-caption'" />
            </div>
          </div>
        </v-card-text>
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
    advMenuText () {
      return this.item.advancement ? this.item.data.advancements.find(i => i.id === this.item.advancement)?.name || '- unknown -' : 'Advance'
    }
  }
}
</script>
