<template>
  <v-card outlined flat :color="item.disabled && item.learned ? 'error' : undefined">
    <div class="d-flex justify-space-between align-start">
      <div class="d-flex align-center px-2">
        <v-icon v-if="item.disabled && item.learned" color="error">
          mdi-alert
        </v-icon>
        <v-avatar size="22">
          <v-img :src="require(`~/assets/images/powers/${item.type}.svg`)" />
        </v-avatar>
        <div class="pl-1">
          <div class="mb-0">
            {{ item.name }}
          </div>
          <div class="mt-n1 text-caption">
            <me-power-level :level="item.level" />
          </div>
        </div>
      </div>
      <div class="d-flex justify-end align-center">
        <!-- Advancement Menu -->
        <v-menu v-if="item.advancements && item.learned" offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              x-small
              outlined
              class="mx-1"
              :disabled="!item.learned"
              v-on="on"
            >
              {{ item.advancement ? item.advancements[item.advancement].name : 'Advance' }}
              <v-icon right>
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(adv, advId) in item.advancements"
              :key="advId"
              @click="$emit('setPowerAdv', { id: item.id, advId })"
            >
              <v-list-item-icon>
                <v-icon :color="item.advancement === advId ? 'primary' : undefined">
                  {{ item.advancement === advId ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ adv.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- add/remove button -->
        <v-btn
          x-small
          outlined
          :color="item.learned ? 'error' : 'primary'"
          class="mx-1"
          @click.stop="$emit('togglePower', item.id)"
        >
          {{ item.learned ? 'Remove' : `${prepared ? 'Prepare' : 'Learn'}` }}
        </v-btn>

        <!-- more info -->
        <v-btn
          icon
          class="mx-1"
          @click="showInfo = !showInfo"
        >
          <v-icon>
            {{ showInfo ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-expand-transition>
      <div v-show="showInfo">
        <v-divider />
        <v-card-text>
          <me-power-info :item="item" />
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
  }
}
</script>
