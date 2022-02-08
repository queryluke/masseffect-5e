<template>
  <!-- TODO: add action type for spells, maybe show-action-type? -->
  <v-card outlined class="pa-1 px-md-3" @click="moreInfo = !moreInfo">
    <v-row align="start" no-gutters>
      <v-col cols="5" md="3">
        <div class="d-flex align-center">
          <v-avatar v-if="item.icon" size="16" class="mr-1">
            <v-img :src="item.icon" />
          </v-avatar>
          <v-card flat color="transparent">
            <div class="mb-n1 text-body-1">
              <small class="text-truncate font-weight-bold">
                {{ item.name }}
              </small>
            </div>
            <me-cs-action-properties :properties="item.properties" />
          </v-card>
        </div>
      </v-col>
      <v-col v-if="showCastingTime" class="text-center" cols="1">
        {{ item.castingTime }}
      </v-col>
      <v-col cols="2" class="text-center">
        <me-cs-action-range v-if="item.range" :range="item.range" />
      </v-col>
      <v-col :cols="showCastingTime ? 1 : 2">
        <me-cs-action-hit v-if="item.attack" :hit="item.attack" />
        <me-cs-action-dc v-if="item.dc" :dc="item.dc" />
      </v-col>
      <v-col cols="3" md="2">
        <v-card flat color="transparent">
          <me-cs-action-damage v-for="(damage, index) in item.damage" :key="`damage-${index}`" :damage="damage" />
        </v-card>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3">
        <me-cs-action-notes :notes="item.notes" />
      </v-col>
    </v-row>
    <v-row v-if="item.shortDesc" no-gutters>
      <v-col>
        <small>
          <me-html :content="interpolatedShortDesc" classes="text-caption" />
        </small>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col v-if="item.resource">
        <me-cs-action-resource :id="item.resource.id" :resource="item.resource" />
        <me-cs-action-resource v-if="item.resource.resource" :id="item.resource.resource.id" :resource="item.resource.resource" />
      </v-col>
    </v-row>
    <me-standard-dialog v-if="component || itemHtml" :shown="moreInfo" :title="item.name" @close="moreInfo = false">
      <component :is="component" v-if="component" :item="item.moreInfo.bind" />
      <me-html v-else :content="itemHtml" />
    </me-standard-dialog>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCsActionCard',
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
  data () {
    return {
      moreInfo: false
    }
  },
  computed: {
    ...mapGetters({ abilityBreakdown: 'abilities/abilityBreakdown', profBonus: 'profBonus' }),
    mobile () {
      return this.$vuetify.breakpoint.smAndDown
    },
    statsRight () {
      return this.item.shortDesc && !this.item.attack
    },
    component () {
      return this.item.moreInfo?.component
    },
    itemHtml () {
      if (this.item.moreInfo?.model) {
        return this.$store.getters.getItem(this.item.moreInfo.model, this.item.moreInfo.id).html
      }
      return this.item.moreInfo?.bind || false
    },
    interpolatedShortDesc () {
      return this.item.shortDesc ? this.interpolatedText(this.item.shortDesc) : false
    },
    dcObj () {
      if (!this.item.dc) {
        return false
      }
      const dcDefaults = {
        base: 8,
        proficient: true,
        mod: false,
        save: false,
        textBonus: false
      }
      return { ...dcDefaults, ...this.item.dc }
    },
    dcMod () {
      if (this.dcObj) {
        return this.abilityBreakdown[this.dcObj.mod].mod
      }
      return 0
    },
    dc () {
      return this.dcMod + this.dcObj.base + (this.dcObj.proficient ? this.profBonus : 0)
    },
    range () {
      return this.item.range?.short ? `<me-distance length="${this.item.range.short}" />` : ''
    }
  },
  methods: {
    interpolatedText (text) {
      const interpolations = ['dc', 'range']
      const test = new RegExp(`{{ ?(${interpolations.join('|')}) ?}}`)
      if (!test.test(text)) {
        return text
      }
      let interpolated = text
      for (const itp of interpolations) {
        const regex = new RegExp(`{{ ?${itp} ?}}`, 'ig')
        interpolated = interpolated.replace(regex, this[itp])
      }
      return interpolated
    }
  }
}
</script>
