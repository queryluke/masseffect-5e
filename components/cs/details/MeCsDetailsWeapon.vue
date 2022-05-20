<template>
  <v-card flat tile>
    <v-card-text v-if="!loading">
      <div class="text-caption">
        <span class="font-weight-bold pr-1">Proficient:</span>
        {{ isProficient ? 'Yes' : 'No' }}
      </div>
      <div class="text-caption">
        <span class="font-weight-bold pr-1">Attack Type:</span>
        <span class="text-capitalize">
          {{ item.attackType }}
        </span>
      </div>
      <div class="text-caption">
        <span class="font-weight-bold pr-1">Range:</span>
        <span v-if="item.attackType === 'melee'">
          <me-distance :length="item.range.short" abbr />
        </span>
        <span v-else>
          <me-distance :length="item.range.short" num-only />/<me-distance :length="item.range.long" abbr />
        </span>
      </div>
      <div class="text-caption">
        <span class="font-weight-bold pr-1">Damage:</span>
        <span v-for="(damage, index) in item.damage" :key="`damage-${index}`" :class="{'grey--text': index > 0}" class="pr-1">
          <v-tooltip bottom open-delay="200">
            <template #activator="{ on, attrs }">
              {{ damageString(damage, index) }}
              <v-icon :size="12" v-bind="attrs" v-on="on">
                {{ damageIcon(damage) }}
              </v-icon>
            </template>
            <span>{{ damage.type }}</span>
          </v-tooltip>
        </span>
      </div>
      <div v-if="heat" class="text-caption">
        <span class="font-weight-bold pr-1">Heat:</span>
        <span class="text-capitalize">
          {{ heat }}
        </span>
      </div>
      <div class="text-caption">
        <span class="font-weight-bold pr-1">Weight:</span>
        <span class="text-capitalize">
          {{ item.data.weight || '-' }}
        </span>
      </div>
      <div class="text-caption">
        <span class="font-weight-bold pr-1">Cost:</span>
        <span class="text-capitalize">
          {{ (item.data.cost || '-') | groupDigits(',') }}
        </span>
      </div>
      <div class="text-caption">
        <span class="font-weight-bold pr-1">Properties:</span>
        <span v-if="props.length">
          <span v-for="(prop, index) in props" :key="index">
            <v-tooltip bottom open-delay="200" max-width="200">
              <template #activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  {{ prop.text }}
                </span>
                <span v-if="index + 1 < props.length" class="px-1">
                  |
                </span>
              </template>
              <me-html :content="prop.tooltip" />
            </v-tooltip>
          </span>
        </span>
        <span v-else>-</span>
      </div>
      <me-hr size="2" />
      <div class="mt-1">
        <me-html :content="html" :classes="'text-caption'" />
        <v-img v-if="item.data.image" :src="item.data.image" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ScoreText } from '~/mixins/character/scoreText'
const { mapGetters } = createNamespacedHelpers('character')

export default {
  name: 'MeCsDetailsWeapon',
  mixins: [ScoreText],
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({ profs: 'profs/profs', abilities: 'abilities/abilityBreakdown', bonusCalc: 'mechanics/mcBonus', weaponProps: 'equipment/weaponPropertiesList' }),
    item () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    isProficient () {
      return this.profs.weapon.includes(this.item.data.type)
    },
    heat () {
      if (!this.item.resource) {
        return false
      }
      return this.bonusCalc(this.item.resource.max)
    },
    props () {
      return this.weaponProps.filter(i => this.item.data.properties.includes(i.id)).map((i) => {
        return {
          tooltip: i.html,
          text: i.name
        }
      })
    },
    html () {
      if (this.item.data.moreInfo?.model) {
        return this.$store.getters.getItem(this.item.data.moreInfo.model, this.item.data.moreInfo.id)?.html
      }
      return this.item.data.html || ''
    }
  },
  watch: {
    item () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 10)
    }
  },
  methods: {
    damageBonus (damage) {
      let bonus = 0
      if (damage.mod && this.isProficient) {
        bonus = this.abilities[damage.mod].mod
      }
      if (damage.bonus) {
        bonus += this.bonusCalc(damage.bonus)
      }
      return bonus
    },
    damageString (damage, index) {
      let text = index > 0 ? '(' : ''
      text += damage.dieCount
      if (damage.dieType) {
        text += `d${damage.dieType}`
      }
      const bonus = this.damageBonus(damage)
      if (bonus !== 0) {
        text += this.damageText(bonus)
      }
      if (index > 0) {
        text += ')'
      }
      return text
    },
    damageIcon (damage) {
      return 'mdi-' + this.$store.state.config.damageTypeAttributes[damage.type]?.icon
    }
  }
}
</script>
