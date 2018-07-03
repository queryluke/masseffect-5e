<template lang="pug">
  rule-card
    span(slot="header") Omni-gel
    template(slot="text")
      p.
        Omni-gel is a technological material that can be obtained by breaking down unwanted items, such as weapons, armor,
        and upgrades. Doing so will usually give an amount of omni-gel found in the table below. It is designed for use
        with omni-tools to do electronics and decryption work, make general repairs, and even craft new upgrades.
      p.
        Omni-gel is composed of common, reusable industrial plastics, ceramics, and light alloys kept in a semi-molten state.
        Each "charge" of omni-gel is stored in a canister and is worth 1,000 credits.
      table.table.alt-table
        thead
          tr.text-xs-left
            th Item
            th Resulting Omni-gel
        tbody
          tr
            td Armor and Weapon upgrades, grenades
            td 1 omni-gel
          tr
            td Heavy Pistols, SMGs, Head armor, Leg armor, Arm armor
            td 2 omni-gel
          tr
            td Assault Rifles, Shotguns, Sniper Rifles, Chest Armor
            td 3 omni-gel
          tr
            td Heavy Weapon
            td 4 omni-gel
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
