<template lang="jade">
  div
    h2 Weapons
    p.
      Guns! A major difference in ME5e is the shift from melee combat from ranged combat. You can still make a pretty
      bad ass melee build, but most people will be shooting rather than slapping.
    rule-card
      span(slot="header") New Combat Action: Reloading
      template(slot="text")
        p.
          As detailed below, standard weapons use Thermal Clips and have Heat. If the weapon runs out of heat, you must reload it
          before you can fire it again. Reloading a weapon is a combat action.
    rule-card
      span(slot="header") Holstering & Drawing Weapons
      template(slot="text")
        p.
          As long as you have a weapon equipped (somewhere on your person), you can holster the weapon you're currently
          weilding and draw an equipped weapon as a bonus action. This is true for all weapon types.
    rule-card
      span(slot="header") Weapon Stats
      template(slot="text")
        p.
          Some of these stats only apply to certain weapons.
        p.headline.mt-2 Weight
        p.
          Subtract this from your Carry Capacity. Carrying Capacity is point based, not pound based. Your capacity is equal to
          Strength score. You can can carry up to 5 additional points of weapons at the expense of a 2m reduction in movement
          per point. If you are carrying the maximum 5 points over, all of your Dexterity checks are made at a disadvantage.
          You cannot carry more than 5 more points over your capacity.
        p.headline.mt-2 Range
        p.
          If a target is beyond the weapon's range, the attack roll is made at a disadvantage. Ranges are an approximation and
          can be 2m (beyond hip fire), 10m (close range), 20m (average range), 60m (long range).
          For the gun nuts out there, I get the fact that an assault rifle has a range of 300m, but unless you're a goddamn black belt
          in GunFu, you ain't gonna hit a moving target at 300m. Range, in this context, is a measure of weapon performance,
          kick, handling, scope, etc.
        p.headline.mt-2 Rate of Fire (Rof) & Damage
        p.
          On a successful ranged attack, the RoF of the weapon indicates number of die you roll. The Damage indicates the die type.
        p.headline.mt-2 Heat
        p.
          Basically, the number of number of times you can fire before you need to reload. If the weapon has a heat of
          1 and you fire it, you must reload the thermal clip before firing it again. Reloading takes an action.
        p.
          For Heavy Weapons, Heat is substituted for Charges. You can use the heavy weapon a number of times equal to it's
          charges. Then you must find some sort of supply depot and spend 2,000 credits to regain your charges.
          GMs, you can populate loot cahces with Heavy Weapon charges as well.
        p.headline.mt-2 Ammo
        p.
          In Mass Effect, all weapons use interchangeable Thermal Clips as "ammo". In addition, there are also specialized
          Thermal Clips that deal different types of damage (see Consumables). Your Thermal Clip capacity is 10.
          It's up to the GM if they want standard thermal clips to count against this total. If you're fighting enemies
          that also have guns, it's assumed they would have extra thermal clips as well; thus, there would be a steady
          supply from looting. But if you on a barren planet fighting a Thresher Maw, finding thermal clips might be difficult.
        p.headline.mt-2 Rare Weapons
        p.
          Some weapons have a "Rare" qualifier. This just means they're hard to come across. You have to get them special ordered
          or know someone in the black market to get your hands on them. Or...loot them from soome n00b.
    rule-card
      span(slot="header") Standard Weapons
      template(slot="text")
        p.
          A.k.a. guns. There are 5 gun types: Assualt Rifles, Heavy Pistols, SMGs, Shotguns, and Sniper Rifles. Like D&D
          you only add your proficiency bonus to attack rolls if you are proficient with a weapon type, and you add your
          Dexterity modifier to ranged weapon attack and damage rolls.
        p.headlinge.mt-2 Standard Weapon Attributes
        table.table
          thead.text-xs-left
            tr
              th Attribute
              th Mechanic
          tbody
            tr
              td Hip Fire
              td You have advantage instead of disadvantage using this weapon in melee range.
            tr
              td Two-Handed
              td This weapon must be fired with two hands.
            tr
              td Charge
              td.
                You can use your attack action to charge the weapon. Each charge consumes 1 heat and increases the RoF
                by 1. If the number of charges equals the heat of the weapon, it overheats and cannot be fired until reloaded.
            tr
              td Arc
              td Deals lightning damage. On a hit, deals half damage to 1 additional creature within 2m of the hit target.
            tr
              td Unique
              td Cannot benefit from Special Thermal Clips
            tr
              td Silent
              td Makes no noise when fired.
    rule-card
      span(slot="header") Melee Weapons & Omni-tools
      template(slot="text")
        p.
          In addition to weilding a melee weapon, each class has an Omnni-Tool attack. This is considered a melee attack.
    rule-card
      span(slot="header") Heavy Weapons
      template(slot="text")
        p.headline.mt-2 Charges
        p.
          As stated above, Heavy Weapons use Charges instead of Thermal Clips. Run out of Charges and your weapon is nothing
          more than a hunk of metal. You need to find a supply depot and spend 2,000 credits to replenish all charges.
        p.headline.mt-2 Targeting
        p.
          Most Heavy Weapons also use the Targeting condition. Targeting mean painting the battlefield, or keeping a lock on a creature(s) for
          a single round of combat. Targeting is considered a free action, as long as you've already equipped the heavy weapon,
          i.e., you can choose to pick-up or equip a weapon as your action, then begin targeting as a free action before your turn ends.
          If you're already holding the weapon, you might use an ability as your action and then begin targeting.
          While targeting, you cannot be behind cover, you automatically fail Dexterity saving throws, and creatures that
          attack you have advantage. You can choose to end this state as a reaction to an attack (not to a damage roll).
          If you end the state, creatures will not have advantage while attacking, but your Dexterity saving throws will
          be made at a disadvantage. Prematurely ending the targeting prevents the weapon from firing at the start of your turn.
          If you loose your footing by being knocked prone, lifted, or losing conciousness Targeting ends.
</template>

<script>
  import RuleCard from './../components/RuleCard.vue'
  export default {
    name: 'WeaponRules',
    components: { RuleCard }
  };
</script>
