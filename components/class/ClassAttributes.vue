<template lang="pug">
  div
    p.headline Hit points
    ul.list-unstyled
      li #[strong Hit dice:] 1d{{ item.hitDie }} per level
      li #[strong Hit Points at 1st level:] {{ item.hitDie }} + Constitution modifier
      li #[strong Hit Points at higher levels:] 1d{{ item.hitDie }} (or {{ item.minHitDieRoll }}) + Constitution modifier
    div(:class="primaryColor").hr
    p.headline Proficiencies
    ul.list-unstyled
      li #[strong Armor:] {{ item.armorProficiencies.join(', ') }}
      li #[strong Tools:] &nbsp;
        span(v-if="item.toolProficiencies") Choose one from {{ item.toolProficiencies | listOfChoices(1) }}
        span(v-else) None
      li #[strong Weapons:] {{ item.weaponProficiencies | listOfChoices(item.weaponProficiencyChoices) }}
      li #[strong Saving Throws:] {{ item.savingThrows.join(' & ') }}
      li #[strong Skills:] {{ item.skillProficiencies | listOfChoices(item.skillChoices) }}
    div(:class="primaryColor").hr
    p.headline Starting Equipment
    ul.mb-4.ml-3
      li {{ item.startingRangedWeapons | listOfChoices(item.startingRangedWeaponChoices) }}
      li {{ item.startingMeleeWeapons | listOfChoices(item.startingMeleeWeaponChoices) }}
      li {{ item.startingArmor | listOfChoices }}
    div(:class="primaryColor").hr
    p.headline Features
    div.mx-4
      p(v-if="item.id === 'soldier'").title Combat Powers
      p(v-else).title Spellcasting
      markdown-file(:id="item.id" itemType="class_spellcasting")
      div(:class="primaryColor").hr
      div(v-for="level in item.progression" v-bind:key="level.level")
        div(v-for="featureId in level.features" v-bind:key="featureId")
          class-feature(v-bind:id="featureId" v-bind:featureLevel="level")
        div(:class="primaryColor" v-if="level.level != 20 && level.features.length > 0").hr

</template>

<script>
import ClassFeature from '~/components/class/ClassFeature.vue'

export default {
  components: { ClassFeature },
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    primaryColor: {
      type: String,
      default: ''
    }
  }
}
</script>
