<template>
  <v-card outlined class="pa-1 px-md-3" :min-height="minHeight" @click="showItem">
    <component :is="layoutComponent" v-bind="{showCastingTime}">
      <template #name>
        {{ item.name }}
      </template>

      <template #properties>
        <me-cs-action-properties :properties="item.properties" />
      </template>

      <template v-if="range" #range>
        <me-cs-action-range :layout="layout" :range="range" />
      </template>

      <template v-if="hit" #hit>
        <me-cs-action-stat v-if="hit">
          <me-cs-roll-card :roll="hitRoll" min-width="36">
            <div class="my-1">
              {{ modText(hit.bonus) }}
            </div>
          </me-cs-roll-card>
        </me-cs-action-stat>
      </template>

      <template v-if="dc && !hit" #dc>
        <me-cs-action-dc :dc="dc" :layout="layout" />
      </template>

      <template v-if="damages.length" #damage>
        <div v-for="(damage, index) in damages" :key="`damage-${index}`" style="min-height: 30px">
          <me-cs-action-stat>
            <template v-if="layout !== 'attack'" #title>
              <span v-if="damage.healing" class="text-capitalize">{{ damage.type === 'temp' ? 'temp hp' : damage.type }}</span>
              <span v-else>{{ damage.label || 'Damage' }}</span>
            </template>
            <me-cs-action-damage :damage="damage" />
          </me-cs-action-stat>
        </div>
      </template>

      <template v-if="!damages && layout === 'power'" #effect>
        <me-cs-action-stat>
          <span class="text-caption text-capitalize">
            {{ (item.effect || []).join(', ') }}
          </span>
        </me-cs-action-stat>
      </template>

      <template #notes>
        <me-cs-action-notes-list :notes="notes" />
      </template>

      <template v-if="item.shortDesc" #shortDesc>
        <div :class="{'pb-4': !!item.resource || !!item.toggle}">
          <me-cs-action-short-desc :short-desc="interpolatedShortDesc" />
        </div>
      </template>
    </component>

    <v-card v-if="item.resource || item.toggle" style="position: absolute; bottom: -9px" outlined class="d-flex" @click.stop>
      <v-menu v-if="toggleOptions" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            outlined
            x-small
            v-bind="attrs"
            class="mt-1 mr-2"
            v-on="on"
          >
            {{ toggleSelection.name }}
            <V-icon right>
              mdi-menu-down
            </V-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="toggleItem in toggleOptions"
            :key="toggleItem.id"
            @click="toggleSelection = toggleItem.id"
          >
            <v-list-item-title>{{ toggleItem.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-switch
        v-if="item.toggle"
        v-model="toggle"
        dense
        hide-details
        class="mt-0 px-1"
      >
        <template v-if="item.toggle.showLabel" #label>
          <span class="text-caption mr-1" style="margin-top: -2px; margin-left: -6px;">
            {{ item.toggle.name }}
          </span>
        </template>
      </v-switch>
      <me-cs-action-resource v-if="item.resource" :id="item.resource.id" :resource="item.resource" />
      <me-cs-action-resource v-if="item.resource && item.resource.resource" :id="item.resource.resource.id" :resource="item.resource.resource" />
    </v-card>
  </v-card>
</template>

<script>
import { CsActions } from '~/mixins/character/csActions'

export default {
  name: 'MeCsActionCard',
  mixins: [CsActions],
  props: {
    item: {
      type: Object,
      required: true
    },
    showCastingTime: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    layout () {
      return this.item.layout ||
        (this.item.attack
          ? 'attack'
          : this.item.damage?.length && this.item.dc && this.item.range
            ? 'attack'
            : this.item.damage?.length || this.item.dc || this.item.range || this.item.toggle
              ? 'stats-right'
              : 'simple')
    },
    layoutComponent () {
      return `me-cs-action-layout-${this.layout}`
    },
    minHeight () {
      const truths = [!!this.range, !!this.dc, !!this.damages, !!this.hit].filter(i => i).length
      if (this.item.resource || this.item.toggle || this.layout === 'stats-right') {
        if (this.item.shortDesc || this.item.properties?.length || truths) {
          if (this.layout === 'stats-right') {
            return truths > 2
              ? 136
              : truths > 1
                ? 86
                : 64
          }
          return 64
        }
        return 52
      }
      return undefined
    }
  },
  methods: {
    showItem () {
      if (!this.item.moreInfo?.component && !this.item.moreInfo?.bind && !this.item.component && !this.item.html && !this.item.moreInfo?.model) {
        return
      }
      // TODO: need to figure out the best place to conditionally display this type of information
      // perhaps it would be easiest if the me-cs-more-info component did all the work
      // right now, just check whether or not its a power
      // item.component for powers, item.moreInfo.component for gear/weapons, default is everything else
      const component = this.item.component || this.item.moreInfo.component || 'me-cs-more-info'
      const value = this.item.moreInfo?.toDisplay || this.item
      this.$store.commit('character/navigation/SET', { key: 'toDisplay', value })
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', component)
    }
  }
}
</script>
