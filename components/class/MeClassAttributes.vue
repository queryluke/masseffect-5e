<template>
  <div>
    <p class="text-h6 mb-0">
      Hit Points
    </p>
    <me-stat-list>
      <me-stat-list-item label="Hit dice">
        1d{{ item.hitDice }} per level
      </me-stat-list-item>
      <me-stat-list-item label="Hit Points at 1st level">
        {{ item.hitDice }} + Constitution modifier
      </me-stat-list-item>
      <me-stat-list-item label="Hit Points at higher levels">
        1d{{ item.hitDice }} (or {{ item.minHitDiceRoll }}) + Constitution modifier
      </me-stat-list-item>
    </me-stat-list>
    <me-hr
      :color="hrColor"
    />
    <p class="text-h6 mb-0">
      Proficiencies
    </p>
    <me-stat-list>
      <me-stat-list-item
        v-for="prof in profs"
        :key="prof.key"
        :label="prof.label"
      >
        {{ item.profs[prof.key].text }}
      </me-stat-list-item>
    </me-stat-list>
    <me-hr
      :color="hrColor"
    />
    <p class="text-h6 mb-0">
      Starting Equipment
    </p>
    <p class="text-body-2">
      You start with the following equipment, in addition to the equipment granted by your background:
    </p>
    <ul class="text-body-2">
      <li
        v-for="(eq, index) in item.startingEquipment"
        :key="`eq${index}`"
      >
        {{ eq.text }}
      </li>
    </ul>
    <me-hr
      :color="hrColor"
    />
    <me-class-feature-list :class-id="item.id" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      profs: [
        {
          label: 'Armor',
          key: 'armor'
        },
        {
          label: 'Tools',
          key: 'tool'
        },
        {
          label: 'Weapons',
          key: 'weapon'
        },
        {
          label: 'Saving throws',
          key: 'savingThrow'
        },
        {
          label: 'Skills',
          key: 'skill'
        }
      ]
    }
  },
  computed: {
    item () {
      return this.$store.getters.getItem('classes', this.id)
    },
    hrColor () {
      return this.$store.getters['config/classThemeHrColor'](this.id)
    }
  }
}
</script>
