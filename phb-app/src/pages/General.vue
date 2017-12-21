<template lang="pug">
  div
    h2 General
    p.
      Overall, this system attempts to keep things in line with D&D 5e rules as much as possible. Some system
      additions are pretty significant, like Shield Points. But most are minor, like the addition of a few more conditions.
      Honestly, sometimes the change might seem pointless, like the conversion from feet to meters...but I did it anyway.
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
          You cannot have more Barrier Tick than the amount indicated on your class progression table.
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
      span(slot="header") Damage Types
      template(slot="text")
        p.
          Since this is the future and there isn't really "magic", some damage types need to be reconceptualized.
        v-list(two-line)
          template(v-for="dmg in damage_types")
            v-list-tile-content
              v-list-tile-title {{ dmg.type }}
              v-list-tile-sub-title {{ dmg.note }}
    rule-card
      span(slot="header") Creature Types
      template(slot="text")
        p.
          Since AIs and Reapers exist in Mass Effect, there are 3 types of creatures: Organic, Synthetic, and Synthorganic.
          Some abilities only effect organic or synthetic creatures, as notated in the ability text. Synthorganic creatures
          are considered both synthetic and organic.
    rule-card
      span(slot="header") Distance
      template(slot="text")
        p.
          I use meters instead of feet. Why? Because this is set in the future and it's sci-fi and using metric just seems to
          make more sense. The general rule of thumb is that 5ft = 2m. Or, if you're using a playmat, 2m = 1 space.
    rule-card
      span(slot="header") Sexy Level
      template(slot="text")
        p.
          WTF is sexy level? ... A joke, but after reading this very
          #[a(href="http://www.polygon.com/2017/3/20/14980436/mass-effect-sexiest-character-aliens-ranked" target="_blank") scientific article],
          I decided to make it canon.
</template>

<script>
  import RuleCard from './../components/RuleCard.vue'
  export default {
    name: 'General',
    components: { RuleCard },
    data() {
      return {
        damage_types: [
          { type: 'Acid', note: 'Unchanged'},
          { type: 'Bludgeoning', note: 'Unchanged' },
          { type: 'Cold', note: 'Unchanged' },
          { type: 'Fire', note: 'Unchanged' },
          { type: 'Force', note: 'One of the primary biotic damage types. Mass Effect fields that pummel, pierce, or apply pressure deal force damage.' },
          { type: 'Lightning', note: 'Think shock damage. Any damage done by an electrical discharge or source. Deals double damage to shields.' },
          { type: 'Necrotic', note: 'The second biotic damage type. Necrotic damage uses dark energy or tiny Mass Effect fields targeted inside a creatre, crippling them from within' },
          { type: 'Piercing', note: 'Unchanged' },
          { type: 'Poison', note: 'Unchanged' },
          { type: 'Psychic', note: 'More likely a shock to the nervous system, rather than fear or mental damage. But the latter is possible.' },
          { type: 'Radiant', note: 'Think radiation or damage on a nuclear level, rather than divine light.' },
          { type: 'Slashing', note: 'Unchanged' },
          { type: 'Thunder', note: 'Shockwaves and explosions. Thunder damage is primarily caused by grenades.' },
        ]
      }
    }
  };
</script>
