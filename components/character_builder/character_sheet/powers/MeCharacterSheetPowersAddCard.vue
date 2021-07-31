<template>
  <v-card outlined elevation="0">
    <div class="d-flex justify-space-between align-start">
      <v-list two-line dense>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="require(`~/assets/images/powers/${itemData.type}.svg`)" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ itemData.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <me-power-level :item="itemData.level" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn
        v-if="deletable"
        color="error"
        text
        class="mt-3"
        style="margin-right: -6px"
        @click="removePower(item.id)"
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </div>
    <v-card-actions class="mt-n5">
      <v-btn v-if="prepareable" color="primary" text @click="addPower(item.id)">
        Prepare
      </v-btn>
      <v-btn v-if="learnable" color="primary" text @click="addPower(item.id, true)">
        Learn
      </v-btn>
      <v-menu v-if="deletable && itemData.advancements" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            text
            v-bind="attrs"
            v-on="on"
          >
            <div class="d-flex align-end">
              <div class="d-block">
                <div v-if="item.advancement" class="text-caption">
                  <small>Advancement</small>
                </div>
                <div>
                  {{ item.advancement ? itemData.advancements[item.advancement].name : 'Advance' }}
                </div>
              </div>
              <v-icon>mdi-menu-down</v-icon>
            </div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(adv, advId) in itemData.advancements"
            :key="advId"
            @click="togglePowerAdvancement(item.id, advId)"
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
      <v-spacer />
      <v-btn
        icon
        @click="showInfo = !showInfo"
      >
        <v-icon>{{ showInfo ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showInfo">
        <v-divider />
        <v-card-text>
          <me-power-info :item="itemData" />
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    },
    addable: {
      type: Boolean,
      default: false
    },
    deletable: {
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
    itemData () {
      return this.powers.find(i => i.id === this.item.id)
    },
    prepareable () {
      return this.addable && this.hasSomeClasses(['engineer', 'infiltrator']) && this.item.type === 'tech'
    },
    learnable () {
      return this.addable && this.hasSomeClasses(['adept', 'sentinel', 'infiltrator', 'vanguard', 'soldier']) && (this.hasClass('sentinel') ? true : this.item.type !== 'tech')
    }
  }
}
</script>
