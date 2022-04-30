<template>
  <v-card outlined class="pa-1 px-md-3" :min-height="minHeight" @click="showItem">
    <component :is="layoutComponent" v-bind="{showCastingTime}">
      <template #icon>
        <v-avatar v-if="item.icon" size="16" class="mr-1">
          <v-img :src="item.icon" />
        </v-avatar>
      </template>

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

      <template v-if="dc" #dc>
        <me-cs-action-dc :dc="dc" :layout="layout" />
      </template>

      <template v-if="damages.length" #damage>
        <div v-if="damages.length">
          <div v-for="(damage, index) in damages" :key="`damage-${index}`" style="min-height: 30px">
            <me-cs-action-stat>
              <me-cs-action-damage :damage="damage" />
            </me-cs-action-stat>
          </div>
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
        <div :class="{'pb-4': !!item.resource}">
          <me-cs-action-short-desc :short-desc="interpolatedShortDesc" />
        </div>
      </template>
    </component>

    <v-card v-if="item.resource" style="position: absolute; bottom: -9px" outlined @click.stop>
      <me-cs-action-resource v-if="item.resource" :id="item.resource.id" :resource="item.resource" />
      <me-cs-action-resource v-if="item.resource && item.resource.resource" :id="item.resource.resource.id" :resource="item.resource.resource" />
    </v-card>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
import { CsColors } from '~/mixins/character/csColors'
import { CsActions } from '~/mixins/character/csActions'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCsActionCard',
  mixins: [ScoreText, CsColors, CsActions],
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
    ...mapGetters({
      abilityBreakdown: 'abilities/abilityBreakdown',
      profBonus: 'profBonus',
      mcBonus: 'mechanics/mcBonus',
      mechanics: 'mechanics/mechanics',
      tentacleBlenderText: 'equipment/tentacleBlenderText',
      hp: 'hp/hp',
      level: 'klasses/level'
    }),
    layout () {
      return this.item.layout ||
        (this.item.attack
          ? 'attack'
          : this.item.damage?.length && this.item.dc && this.item.range
            ? 'attack'
            : this.item.damage?.length || this.item.dc || this.item.range
              ? 'stats-right'
              : 'simple')
    },
    layoutComponent () {
      return `me-cs-action-layout-${this.layout}`
    },
    minHeight () {
      return this.item.resource
        ? this.item.shortDesc
          ? 64
          : 52
        : undefined
    }
  },
  methods: {
    showItem (item) {
      if (!this.item.moreInfo?.component && !this.item.moreInfo?.bind && !this.item.component && !this.item.html && !this.item.moreInfo?.model) {
        return
      }
      // TODO: need to figure out the best place to conditionally display this type of information
      // perhaps it would be easiest if the me-cs-more-info component did all the work
      // right now, just check whether or not its a power
      const component = this.item.component || 'me-cs-more-info'
      this.$store.commit('character/navigation/SET', { key: 'toDisplay', value: this.item })
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', component)
    }
  }
}
</script>
