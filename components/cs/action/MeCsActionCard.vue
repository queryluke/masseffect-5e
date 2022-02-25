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
          <me-cs-die-roller
          :input="'1d20'+rollText(hit.bonus)+''"
          :data="{
          ...hit,
          title: item.name + ' - To Hit'
          }">
              {{ modText(hit.bonus) }}
            </me-cs-die-roller>
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
            <span v-else-if="layout === 'attack'" class="text-uppercase">
              {{ dc.save || '' }}
            </span>
          </template>
        </me-cs-action-stat>
      </template>

      <template v-if="damages" #damage>
        <me-cs-action-stat v-for="(damage, index) in damages" :key="`damage-${index}`">
          <span :class="`${damage.healing ? damage.color : ''}`">
            <me-cs-die-roller :input="damage.text" :data="{...damage, title: item.name + ' - Damage'}">
              {{ damage.text }}
            </me-cs-die-roller>
          </span>
          <template #subtitle>
            <span :class="`${damage.healing ? damage.color : ''}`">
              {{ damage.type }}
            </span>
          </template>
        </me-cs-action-stat>
      </template>

      <template #notes>
        <me-cs-action-notes :notes="notes" />
      </template>

      <template v-if="item.shortDesc" #shortDesc>
        <me-cs-action-short-desc :short-desc="interpolatedShortDesc" />
      </template>

      <template #resource>
        <me-cs-action-resource v-if="item.resource" :id="item.resource.id" :resource="item.resource" />
        <me-cs-action-resource v-if="item.resource && item.resource.resource" :id="item.resource.resource.id" :resource="item.resource.resource" />
      </template>
    </component>
    <me-standard-dialog v-if="hasMoreInfoDialog" :shown="moreInfoDialog" :title="item.name" @close="moreInfoDialog = false">
      <component :is="item.moreInfo.component" v-if="item.moreInfo && item.moreInfo.component" :item="item.moreInfo.bind" />
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
    hasMoreInfoDialog () {
      return (this.item.moreInfo?.component && this.item.moreInfo?.bind) || this.item.moreInfo?.model || this.item.html
    },
    itemHtml () {
      if (this.item.moreInfo?.model) {
        return this.$store.getters.getItem(this.item.moreInfo.model, this.item.moreInfo.id).html
      }
      return this.item.moreInfo?.bind || this.item.html || false
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
      /* TODO: Add logic for multiple damage rolls */
      const dmgRoll = this.damages && this.damages[0]
      if (dmgRoll) {
        hit.actions = {
          rollDamage: {
            title: 'Roll Damage',
            action: this.rollDamage,
            params: [dmgRoll],
            type: 'btn'
          }
        }
      }
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
        let text = ''
        if (damage.dieCount) {
          text = `${damage.dieCount}`
          if (damage.dieType) {
            text += `d${damage.dieType}`
          }
          if (bonus !== 0) {
            text += this.damageText(bonus)
          }
        } else {
          text = bonus
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
    notes () {
      if (Array.isArray(this.item.notes) && this.item.notes.length) {
        return this.item.notes.map(i => this.interpolatedText(i))
      }
      return []
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
        avatarsDie: this.mechanics.find(i => i.type === 'improved-avatars-inspiration') ? 'd8' : 'd4',
        tentacleBlender: this.tentacleBlenderText,
        hp: this.hp.current,
        level: this.level
      }
    }
  },
  methods: {
    interpolatedText (text) {
      // might be better to do this with attrGetters or put it in the HTML?
      const interpolations = ['dc', 'range', 'profBonus', 'strMod', 'conMod', 'wisMod', 'intMod', 'chaMod', 'avatarsDie', 'tentacleBlender', 'hp', 'level']
      const regex = new RegExp(`{{ ?([0-9]{1,3}|[+ ]|${interpolations.join('|')})+ ?}}`, 'g')
      if (!regex.test(text)) {
        return text
      }
      const interpolated = text.replace(regex, (match) => {
        let replacement = match.replaceAll(/[{{}}]/g, '')
        replacement = replacement.trim()
        if (replacement.includes('+')) {
          replacement = replacement.split('+').map(i => i.trim())
          return replacement.reduce((acc, curr) => {
            const int = parseInt(curr, 10)
            if (isNaN(int)) {
              return acc + parseInt(this.interpolations[curr], 10) || 0
            } else {
              return acc + int
            }
          }, 0)
        }
        return this.interpolations[replacement]
      })
      return interpolated
    },
    rollDamage (dmgRoll) {
      console.log('rolling damage from to-hit...', { dmgRoll })
      this.$store.dispatch('character/ROLL',
        {
          title: this.item.name ? this.item.name + ' - Damage' : 'Damage Roll',
          type: 'dice-roll',
          roll: dmgRoll.text
        })
    }
  }
}
</script>
