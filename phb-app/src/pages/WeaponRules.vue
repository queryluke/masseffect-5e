<template lang="pug">
  div
    h2 Weapons
    p.
      Guns! A major difference between ME5e and base 5e is the emphasis on ranged combat with firearms. You can still make a pretty
      bad ass melee build, but most people will be shooting instead of slapping.
    rule-card
      span(slot="header") New Combat Action: Reloading
      template(slot="text")
        p.
          As detailed below, standard weapons use Thermal Clips and have Heat. If the weapon runs out of Heat, you must reload it
          before you can fire it again. Reloading a weapon is a combat action.
    rule-card
      span(slot="header") Holstering & Drawing Weapons
      template(slot="text")
        p.
          As long as you have a weapon equipped (somewhere on your person), you can holster the weapon you're currently
          weilding and draw an equipped weapon as a bonus action. This is true for all weapon types.
    rule-card
      span(slot="header") Weapon Proficiencies
      template(slot="text")
        p.
          Just like in 5th Edition, you must be proficient with a weapon type to add your proficiency modifier to the attack roll.
          However, there are fewer weapon types (Assault Rifle, Heavy Pistol, SMG, Shotgun, Sniper Rifle, and Melee).
          Note that all melee weapons fall under one type, instead of being broken out by weapon.
    rule-card
      span(slot="header") Weapon Stats
      template(slot="text")
        p.
          Some of these stats only apply to certain weapons.
        p.headline.mt-2 Weight
        p.
          Subtract this from your Carry Capacity. Carrying Capacity is point based, not pound based. Your capacity is equal to
          your Strength score. You can can carry up to 5 additional points of weapons at the expense of a 2m reduction in movement
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
          On a successful ranged attack, the RoF of the weapon indicates number of dice you roll. The Damage indicates the die type.
          For example, the Acolyte pistol has a RoF of 1 and a Dmg of d8, so your damage roll on a successful hit would be 1d8. For the
          Cerberus Harrier, which has a RoF of 4 and a Dmg of 4, you would roll 4d4.
        p.headline.mt-2 Heat
        p.
          Basically, the number of number of times you can fire before you need to reload. If the weapon has a heat of
          1 and you fire it, you must reload the thermal clip before firing it again. Reloading takes an action.
        p.
          In general, standard thermal clips are so plentiful that you do not need to keep track of them. However, you can
          play with the #[router-link(to="/rules/consumables") Variant Thermal Clip] rule for an additional challenge.
        p.
          For Heavy Weapons, Heat is substituted for Charges. You can use the heavy weapon a number of times equal to its
          charges. See #[router-link(to="/rules/consumables") Consumables] for resupplying information.
        p.headline.mt-2 Rare Weapons
        p.
          Some weapons have a "Rare" qualifier. This just means they're hard to come across. You have to get them special ordered
          or know someone in the black market to get your hands on them. Or...loot them from some n00b.
    rule-card
      span(slot="header") Standard Weapons
      template(slot="text")
        p.
          A.k.a. guns. There are 5 gun types: Assault Rifles, Heavy Pistols, SMGs, Shotguns, and Sniper Rifles. Like D&D 5e,
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
              td Arc
              td Deals lightning damage. On a hit, deals half damage to 1 additional creature within 2m of the hit target.
            tr
              td Charge
              td.
                You can use your attack action to charge the weapon. Each charge consumes 1 heat and increases the RoF
                by 1. If the number of charges equals the heat of the weapon, it overheats and cannot be fired until reloaded.
            tr
              td Hip Fire
              td You have advantage instead of disadvantage when using this weapon in melee range.
            tr
              td Silent
              td Makes no noise when fired.
            tr
              td Semi-Automatic
              td.
                When you make a ranged attack with this weapon, you can use your bonus action to make a second ranged attack. You do not add your Dexterity
                modifier to the attack or damage roll. The second attack may be on the same or a different target.
            tr
              td Two-Handed
              td This weapon must be fired with two hands.
            tr
              td Unique
              td Cannot benefit from Special Thermal Clips
    rule-card
      span(slot="header") Melee Weapons & Omni-tools
      template(slot="text")
        p.
          Melee weapons have the same attributes as D&D 5e weapons, i.e. finesse, light, thrown, etc. But melee weapons do have a strength
          requirement. If your STR attribute is less than the requirement, all attacks made with the weapon are made with disadvantage.
          This requirement is denoted in parentheses in the "STR Req" column of the handbook.
        p.
          In addition to wielding a melee weapon, each class has an Omnni-Tool attack. This is considered a melee attack.
    rule-card
      span(slot="header") Heavy Weapons
      template(slot="text")
        p.headline.mt-2 Charges
        p.
          As stated above, Heavy Weapons use Charges instead of Thermal Clips. If you run out of Charges your weapon is nothing
          more than a hunk of metal.
        p.headline.mt-2 Targeting
        p.
          Most Heavy Weapons also use the Targeting condition. Targeting mean painting the battlefield, or keeping a lock on a creature(s) for
          a single round of combat. Targeting is considered a free action, as long as you've already equipped the heavy weapon,
          i.e., you can choose to pick-up or equip a weapon as your action, then begin targeting as a free action before your turn ends.
          If you're already holding the weapon, you might use an ability as your action and then begin targeting.
        p.
          #[strong Condition Details:] While targeting, your speed is reduced by half and you automatically fail Dexterity
          saving throws. Creatures that attack you have advantage.
        p.
          #[strong Targeting Failures:]
          If targeting ends before the start of your next turn, it fails and the weapon does not fire or use a weapon charge.
          It can be prematurely ended for the following reasons:
        ul
          li As a reaction: You can choose to end your Targeting condition as a reaction to an attack (not to a damage roll).
          li Taking cover: Taking full or three-quarter cover while targeting ends the condition.
          li Another condition: If you lose your footing by being knocked prone, becoming lifted, or incapacitated, targeting ends.
</template>

<script>
  import RuleCard from './../components/RuleCard.vue'
  export default {
    name: 'WeaponRules',
    components: { RuleCard }
  };
</script>
