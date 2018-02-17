<template lang="pug">
  div
    h2.display-3 General
    p.
      Overall, this system attempts to keep things in line with D&D 5e rules as much as possible. Some system
      additions are pretty significant, like Shield Points. But most are minor, like the addition of a few more conditions.
      Honestly, sometimes the change might seem pointless, like the conversion from feet to meters...but I did it anyway.
    h3.display-2.mb-2 Rule Changes
    rule-card
      span(slot="header") Lifting and Carrying
      template(slot="text")
        p.
          Your Strength score determines the amount of weight you can bear. The following terms define what you can lift or carry.
          These weights have been adjusted from 5th Edition to work with kilograms (kg) instead of pounds (lbs).
        dl
          dt Carry Capacity
          dd.
            You can carry capacity is your Strength score multiplied by 5. If you are wearing armor, your carry capacity
            is your Strength score multiplied by 10 (due to the built-in servos and pneumatics). This score is not affected
            by weapons or armor (see below).
          dt Push, Drag, Lift
          dd.
            You can push, drag, or lift a weight in kgs up to twice your carrying capacity or 10 (20 w/ armor) times your Strength score.
            While pushing or dragging weight in excess of your carrying capacity, your speed drops to 2 meters.
          dt Size & Strength
          dd.
            Larger creatures can bear more weight, whereas Tiny creatures can carry less. For each size category above Medium,
            double the creature's carrying capacity and the amount it can push, drag, or lift. For a Tiny creature, halve these weights.
          dt Weapon Slots
          dd.
            You have 2 weapon slots and can equip a single weapon in either slot. Weapons equipped in a slot do not affect your Carry Capacity.
            Any additional weapons you pick up count against your Carry Capacity.
          dt Armor
          dd The armor matrix has a minimum Strength score for the combination of armor types.
        p.headline.mt-2 Variant: Encumbrance
        p.
          The lifting and carrying rules attempt to keep the simplicity of 5th edition, with the added restrictions of weapon capacity.
          Here is a variant if you are looking for more detailed rules for determining how a character is hindered by the weight of equipment.
          When you use this variant, ignore the minimum Strength column of the Armor table.
        p Your #[strong carry weight] is equal to your Stength score.
        p.
          Each weapon and armor piece has a weight. If your total weight from all weapons and armor is in excess of your
          carry weight, you are #[strong encumbered], which means your speed drops by 4m.
        p.
          If your total weight from all weapons and armor is in excess of Strength score + 10,
          you are instead heavily encumbered, which means your speed drops by 10m and you have disadvantage on ability
          checks, attack rolls, and saving throws that use Strength, Dexterity, or Constitution.
    rule-card
      span(slot="header") Distance
      template(slot="text")
        p.
          Mass Effect 5e uses meters instead of feet. Why? Because this is set in the future and it's sci-fi and using metric
          make more sense. The general rule of thumb is that 5ft = 2m. Or, if you're using a playmat, 2m = 1 space.
    rule-card
      span(slot="header") Creature Types
      template(slot="text")
        p.
          There aren't enough spells and powers to justify making bonuses like "double damage to beast". In addition, many of the 5th Edition
          creature types don't make sense in the sci-fi setting (celestials, undead, fey, elemental, etc.). Instead there are only
          three creatue types: Organic, Synthetic, and Synthorganic.
        p.
          Some abilities only effect organic or synthetic creatures (or deal increased damage to that type), as notated in the ability text.
          Synthorganic creatures are considered both synthetic and organic.
    rule-card
      span(slot="header") Damage Types
      template(slot="text")
        p.
          Since this is the future and there isn't really "magic", some damage types need to be reconceptualized. If the damage type is not listed, its concept is unchanged.
        v-list(two-line)
          template(v-for="dmg in damage_types")
            v-list-tile-content
              v-list-tile-title {{ dmg.type }}
              v-list-tile-sub-title {{ dmg.note }}
    h3.display-2.mb-2 Rule Additions
    rule-card
      span(slot="header") Shields
      template(slot="text")
        p.
          Shields are a regenerating health pool. Like your health, it increases with level. When you take damage, if you
          have any shield points, subtract the damage from your shield points first. If there is remaining damage or if
          you do not have any shield points left, then subtract the damage from your hit points. Some abilities "bypass"
          your shields. In these instances, you subtract damage from your hit points leaving your shield points unchanged.
        p.headline.mt-2 Shield Regeneration
        p.
          If you do not lose any shield points from the end of your turn until the start of your turn, roll 1d4 and gain that
          many shield points. Some armor modifications and abilities can allow this to happen every turn. Other mods and
          abilities can increase the die type of your shield regeneration. Your shield regeneration die type cannot be more
          than a d12. Note that taking damage to your hit points does not prevent your shields from recharging.
        p.headline.mt-2 Lightning Damage
        p.
          Shields are vulnerable to lightning damage. In the event that a shield gains resistance to lightning damage,
          it takes normal damage instead of double damage.
    rule-card
      span(slot="header") Barriers
      template(slot="text")
        p.
          Barrier is a cantrip available to Adepts and Vanguards. It generates Barrier Ticks which are both a casting
          resource and damage reduction mechanic. Barrier Ticks start at 0 and can be gained by casting Barrier or other abilities.
          You cannot have more Barrier Ticks than the amount indicated on your class progression table.
        p.headline.mt-2 Using Barrier Ticks
        p.
          When you take damage, if you have any Barrier Ticks remaining, remove a Barrier Tick and reduce that dmg by 1d8.
          Some class features allow you to choose whether or not you want to expend a Barrier Tick when you take damage.
    rule-card
      span(slot="header") Unprotected
      template(slot="text")
        p.
          Some abilities may refer to an "unprotected" creature. This is a creature which has no shield points or barrier
          ticks.
    rule-card
      span(slot="header") Paragon & Renegade
      template(slot="text")
        p.
          These are special proficiency bonuses that can be applied to certain skill checks. For example, you might try to
          get information out of another character. If you choose to intimidate the target with a threat, the GM would ask for an
          Intimidation check. You can ask, "Does my Renegade bonus apply?" In this case, it should. You might choose
          to Persuade the character for information, to which the Paragon bonus would apply. It's your responsibility
          to ask the GM about adding the P/R bonus, but the GM can proactively ask for a check with the P/R bonus added.
        p.
          Paragon and Renegade is earned as you play. It can be awarded by the GM based on actions you take during the campaign.
          It's a permanent bonus. You get a +1 bonus for every 10 Paragon and Renegade points. Your maximum score in either is 100.
        p.
          For GMs, you want to award about 5 points per level of paragon or renegade. I.e., a level 20 character should have
          about 100 points if they added their P/R scores together. As a rule of thumb, 1 point would be rewarded for a minor
          action, talking back to an officer for Renegade. Whereas 5 points is a major action, i.e., deciding to save or
          wipeout research that has potential destructiveness.
    rule-card
      span(slot="header") Sexy Level
      template(slot="text")
        p.
          #[abbr(title="What the frack") WTF] is sexy level? ... A joke. But please read this very
          #[a(href="http://www.polygon.com/2017/3/20/14980436/mass-effect-sexiest-character-aliens-ranked" target="_blank") scientific article]
          for more information.
</template>

<script>
  import RuleCard from './../components/RuleCard.vue'
  export default {
    name: 'General',
    components: { RuleCard },
    data() {
      return {
        damage_types: [
          { type: 'Force', note: 'One of the primary biotic damage types. Mass Effect fields that pummel, pierce, or apply pressure deal force damage.' },
          { type: 'Lightning', note: 'Shock damage. Any damage done by an electrical discharge or source. Deals double damage to shields.' },
          { type: 'Necrotic', note: 'The second biotic damage type. Necrotic damage uses dark energy or tiny Mass Effect fields targeted inside a creatre, crippling them from within' },
          { type: 'Psychic', note: 'A shock to the nervous system, rather than fear or mental damage. But the latter is possible.' },
          { type: 'Radiant', note: 'Radiation or damage on a nuclear level, rather than divine light.' },
          { type: 'Thunder', note: 'Shockwaves and explosions. Thunder damage is primarily caused by grenades.' },
        ]
      }
    }
  };
</script>
