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
      li #[strong Weapons:] {{ item.weaponProficiencies | listOfChoices(item.weaponProficiencyChoices) }}
      li #[strong Saving Throws:] {{ item.savingThrows.join(' & ') }}
      li #[strong Skills:] {{ item.skillProficiencies | listOfChoices(item.skillChoices) }}
    div(:class="primaryColor").hr
    p(v-if="item.id === 'soldier'").headline Combat Powers
    p(v-else).headline Spellcasting
    markdown-file(:id="item.id" itemType="class_spellcasting").mx-4
    div(:class="primaryColor").hr
    p.headline Starting Equipment
    ul.mb-4.ml-3
      li {{ item.startingRangedWeapons | listOfChoices(item.startingRangedWeaponChoices) }}
      li {{ item.startingMeleeWeapons | listOfChoices(item.startingMeleeWeaponChoices) }}
      li {{ item.startingArmor | listOfChoices }}
</template>

<script>
  export default {
    props: ['item', 'primaryColor']
  }
</script>

