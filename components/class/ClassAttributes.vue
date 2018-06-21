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
    div(v-if="item.spellcasting")
      p.headline Spellcasting
      div(v-if="spellcasters.includes(item.id)")
        p.subheading Cantrips
        p.
          At 1st level, you know a number of cantrips equal to the amount listed in the cantrips column of your class's
          progression table. At higher levels, when the number of cantrips increases on your progression table, you can
          choose to learn a new cantrip or advance a cantrip you already know.
      p.subheading Learning and advancing spells
      p.
        Your class progression table indicates when you can learn new spells. Once you have learned a spell
        you do not need to "prepare" it, instead the spell is always at your disposal.
      p.
        Instead of learning a new spell, you may instead choose to advance a spell you've already learned. In this case,
        you would select one of the advancement options listed on the spell card. You cannot advance a spell twice and you cannot
        learn and advance a spell at the same time.
      p.subheading Casting Spells
      p(v-if="spellcasters.includes(item.id)").
        The {{ item.name }} progression table shows how many spell slots you have to cast your biotic spells of 1st level and highter. To cast one of these spells,
        you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.
      div(v-if="techcasters.includes(item.id)")
        p.
          The {{ item.name }} progression table shows how many tech points you have to cast your tech spells. To cast one of these spells,
          you must expend a number of tech points as listed on the spell. However, most tech spells have a variable cost. In these cases, you must spend
          at least 1 tech point but you cannot spend more than the number listed in your progression table's "Max TP" column.
        p.
          You regain 1d4 tech points at the end of a short rest and all of your tech points at the end of a long rest.
      p.subheading Spellcasting Ability
      p {{ item.spellcasting }}
      div(:class="primaryColor").hr
    p.headline Starting Equipment
    ul.pl-3
      li {{ item.startingRangedWeapons | listOfChoices(item.startingRangedWeaponChoices) }}
      li {{ item.startingMeleeWeapons | listOfChoices(item.startingMeleeWeaponChoices) }}
      li {{ item.startingArmor | listOfChoices }}
</template>

<script>
  import MeElement from '~/components/shared/MeElement.vue'

  export default {
    components: {MeElement},
    data () {
      return {
        spellcasters: ['adept', 'vanguard', 'sentinel'],
        techcasters: ['engineer', 'infiltrator', 'sentinel']
      }
    },
    props: ['item', 'primaryColor']
  }
</script>

