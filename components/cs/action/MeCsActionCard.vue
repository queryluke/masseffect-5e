<template>
  <!-- TODO: add action type for spells, maybe show-action-type? -->
  <v-card outlined class="pa-1 px-md-3" @click="moreInfoDialog = !moreInfoDialog">
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

      <template #castingTime>
        <me-cs-action-stat>
          {{ item.castingTimes.join('|') }}
        </me-cs-action-stat>
      </template>

      <template v-if="range" #range>
        <me-cs-action-stat>
          <template v-if="layout !== 'attack'" #title>
            Range
          </template>
          <span v-if="!range.long">
            <span v-if="range.short === 0">
              Self
            </span>
            <span v-else-if="range.short === 1">
              Touch
            </span>
            <me-distance v-else :length="range.short" abbr />
          </span>
          <span v-else>
            <span>
              <me-distance :length="range.short" num-only />
            </span>
            <span class="text-caption font-weight-light">
              (<me-distance :length="range.long" num-only />)
            </span>
          </span>
          <template v-if="range.aoe || range.note" #subtitle>
            <div v-if="range.aoe">
              (<span>
                <me-distance :length="range.aoe.size" abbr />
                <v-avatar :size="9" tile style="margin-left: 1px">
                  <v-img :src="require(`~/assets/images/aoe/${range.aoe.filename}.svg`)" :alt="$t(`aoe_types.${range.aoe.type}`)" />
                </v-avatar>
              </span>)
            </div>
            <div v-else>
              {{ range.note }}
            </div>
          </template>
        </me-cs-action-stat>
      </template>

      <template v-if="hit" #hit>
        <me-cs-action-stat>
          {{ modText(hit.bonus) }}
        </me-cs-action-stat>
      </template>

      <template v-if="dc" #dc>
        <me-cs-action-stat>
          <template v-if="layout !== 'attack' && dc.save" #title>
            <span class="text-uppercase">
              {{ dc.save || '' }}
            </span>
          </template>
          {{ dc.target }}
          <template #subtitle>
            <div v-if="dc.note && layout !== 'attack'">
              {{ dc.note }}
            </div>
            <span v-else class="text-uppercase">
              {{ dc.save || '' }}
            </span>
          </template>
        </me-cs-action-stat>
      </template>

      <template v-if="damages" #damage>
        <me-cs-action-stat v-for="(damage, index) in damages" :key="`damage-${index}`">
          <span :class="`${damage.healing ? damage.color : ''}`">
            {{ damage.text }}
          </span>
          <template #subtitle>
            <span :class="`${damage.healing ? damage.color : ''}`">
              {{ damage.type }}
            </span>
          </template>
        </me-cs-action-stat>
      </template>

      <template #notes>
        <me-cs-action-notes :notes="item.notes" />
      </template>

      <template v-if="item.shortDesc" #shortDesc>
        <small>
          <me-html :content="interpolatedShortDesc" classes="text-caption" />
        </small>
      </template>

      <template #resource>
        <me-cs-action-resource v-if="item.resource" :id="item.resource.id" :resource="item.resource" />
        <me-cs-action-resource v-if="item.resource && item.resource.resource" :id="item.resource.resource.id" :resource="item.resource.resource" />
      </template>
    </component>
    <me-standard-dialog v-if="hasMoreInfoDialog" :shown="moreInfoDialog" :title="item.name" @close="moreInfoDialog = false">
      <component :is="item.moreInfo.component" v-if="item.moreInfo.component" :item="item.moreInfo.bind" />
      <me-html v-else :content="itemHtml" />
    </me-standard-dialog>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
import { CsColors } from '~/mixins/character/csColors'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCsActionCard',
  mixins: [ScoreText, CsColors],
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
      moreInfoDialog: false
    }
  },
  computed: {
    ...mapGetters({
      abilityBreakdown: 'abilities/abilityBreakdown',
      profBonus: 'profBonus',
      mcBonus: 'mechanics/mcBonus',
      mechanics: 'mechanics/mechanics'
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
    hasMoreInfoDialog () {
      return (this.item.moreInfo?.component && this.item.moreInfo?.bind) || this.item.moreInfo?.model
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
    dc () {
      if (!this.item.dc) {
        return false
      }
      const dcDefaults = {
        base: 8,
        proficient: true,
        mod: false,
        save: false
      }
      const dc = { ...dcDefaults, ...this.item.dc }
      const mod = dc.mod ? this.abilityBreakdown[dc.mod].mod : 0
      dc.target = mod + dc.base + (dc.proficient ? this.profBonus : 0)
      return dc
    },
    hit () {
      if (!this.item.attack) {
        return false
      }
      const hitDefaults = {
        mod: false,
        proficient: false,
        bonus: false
      }
      const hit = { ...hitDefaults, ...this.item.attack }
      const bonus = hit.bonus ? this.mcBonus(hit.bonus) : 0
      const mod = hit.mod ? this.abilityBreakdown[hit.mod].mod : 0
      hit.bonus = bonus + mod + (hit.proficient ? this.profBonus : 0)
      return hit
    },
    range () {
      if (!this.item.range) {
        return false
      }
      const rangeDefaults = {
        short: 0,
        long: null,
        note: false,
        aoe: false
      }
      const range = { ...rangeDefaults, ...this.item.range }
      if (range.aoe) {
        range.aoe.filename = this.$vuetify.theme.dark ? `${range.aoe.type}-white` : range.aoe.type
      }
      return range
    },
    damages () {
      if (!this.item.damage?.length) {
        return false
      }
      const damageDefault = {
        dieCount: 0,
        dieType: false,
        type: false,
        mod: false,
        bonus: false,
        healing: false
      }
      return this.item.damage.map((i) => {
        const damage = { ...damageDefault, ...i }
        let bonus = damage.bonus ? this.mcBonus(damage.bonus) : 0
        const mod = damage.mod ? this.abilityBreakdown[damage.mod].mod : 0
        bonus += mod
        let text = `${damage.dieCount}`
        if (damage.dieType) {
          text += `d${damage.dieType}`
        }
        if (bonus !== 0) {
          text += `${bonus > 0 ? ' +' : ' -'} ${bonus}`
        }
        damage.bonus = bonus
        damage.text = text
        const healingTypes = ['shields', 'hp', 'temp']
        if (healingTypes.includes(damage.type)) {
          damage.healing = true
          damage.color = this.csTextColor(damage.type)
          damage.type = damage.type === 'temp' ? 'temp hp' : damage.type === 'shields' ? 'shield points' : 'hit points'
        }
        return damage
      })
    },
    interpolations () {
      return {
        dc: this.dc.target,
        range: this.range?.short ? `<me-distance length="${this.range.short}" />` : '',
        profBonus: this.profBonus,
        strMod: this.abilityBreakdown.str.mod,
        dexMod: this.abilityBreakdown.dex.mod,
        conMod: this.abilityBreakdown.con.mod,
        wisMod: this.abilityBreakdown.wis.mod,
        intMod: this.abilityBreakdown.int.mod,
        chaMod: this.abilityBreakdown.cha.mod,
        avatarsDie: this.mechanics.find(i => i.type === 'improved-avatars-inspiration') ? 'd8' : 'd4'
      }
    }
  },
  methods: {
    interpolatedText (text) {
      // might be better to do this with attrGetters
      const interpolations = ['dc', 'range', 'profBonus', 'strMod', 'conMod', 'wisMod', 'intMod', 'chaMod', 'avatarsDie']
      const test = new RegExp(`{{ ?(${interpolations.join('|')}) ?}}`)
      if (!test.test(text)) {
        return text
      }
      let interpolated = text
      for (const itp of interpolations) {
        const regex = new RegExp(`{{ ?${itp} ?}}`, 'ig')
        interpolated = interpolated.replace(regex, `<strong>${this.interpolations[itp]}</strong>`)
      }
      return interpolated
    }
  }
}
</script>
