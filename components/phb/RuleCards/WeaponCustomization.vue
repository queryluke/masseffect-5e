<template lang="pug">
  rule-card(id="weaponCustomization")
    span(slot="header") Weapon Customization
    template(slot="text")
      p.
        Like Armor Customization, Weapon Customization is a new feature and provides a lot of the options that would be handled by Magical Items in traditional 5e.
      p.title Weapon type limitations
      p.
        The following weapon types cannot be customized.
      ul.list
        li #[strong Heavy Weapons] are integrated systems in-and-of themselves, so they cannot be changed in any way.
        li.
          #[strong Unique] weapons are similar to heavy weapons, in that they have unique properties that cannot be changed.
          However, you GM can make an exception based on the specific mod and weapon.
        li.
          #[strong Melee] weapons break the mold because all weapon mods are based on guns, and don't apply. However, melee weapon attacks can be bolstered by
          utilizing armor mods instead.
      p.title Customizing a Weapon
      p.
        Each customizable weapon has 4 mod slots: Magazine, Body, Core, and Barrel. The weapon is only allowed one mod per slot.
        For example, the M-8 Avenger cannot have the Ultralight Materials AND the Precision Scope, because both of those mods
        utilize the #[strong Body] slot. But, weapons mods can be replaced. In this example, the player could choose to replace
        Ultralight Materials for the Precision Scope.
      p.
        Additionally, some mods can only be added to a specific weapon type. For example, the #[strong Stunner] mod is only available for
        placement on Heavy Pistols and SMGs.
      p
        v-btn(to="/phb/weapon-mods") Mod List
      div.hr
      p.title Mod Persistence
      p.
        Our intention with the weapon mod system is to add ways for players to create improved versions of their weapons, unlike in 5th Edition where players
        would need to loot or purchase an entirely new weapon, i.e., it's a way of getting +1 versions of a weapon you already own. Therefore,
        we do not believe mods should be persistent. A player who has already purchased a Thermal Scope cannot move that Thermal Scope from one weapon
        to another.
      p.
        However, this limitation can be enforced or amended as your GM sees fit. In a game where credits are light, a GM could allow players to
        swap mods between weapons. This would be similar to Mass Effect 3's version of the weapon mod system. Another possibility is requiring a minimal cost
        (either time or credits) to swap mods between weapons.
      p.title Looted weapons
      p.
        Mods could also be pre-applied to weapons that players loot from enemies. Similar to the above, our intention is that the pre-applied mods would not be available for
        transfer to another weapon. But, this decision is entirely at the behest of the Galaxy Master.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
