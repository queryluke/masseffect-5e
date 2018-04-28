<template lang="pug">
  rule-card
    span(slot="header") Spells
    template(slot="text")
      p.
        We stretch the denotation of "Spell" in Mass Effect 5e to include tech and combat abilities that are powered by technological
        devices (such as an Omni-Tool).
      p.mb-0.
        However, spells are divided into 3 distinct categories:
      dl
        dt Biotic Powers
        dd These function exactly like spells in 5th edition. You have spell slots and regain all of your spell slots after a long rest.
        dt Tech Powers
        dd.
          Tech powers are fueled by Tech Points, a resource available to Engineers, Infiltrators, and Sentinels that
          reflects your Omni-tool's power capacity. When you spend a tech point, it is unavailable until you finish a short rest,
          at the end of which you recharge 1d4 tech points. Some armor mods and class feature increase this recharge rate.
          At the end of a long rest, you recharge all your tech points. Tech powers are unique in that most have a variable tech point cost.
          You can choose to spend a lot or only a few tech points when casting a power, much like you can cast spells using higher
          level spell slots. However, there is a limit on how many tech points you can spent to fuel a tech power. This limit is indicated in the Max TP column of
          your class progression table.
        dt Combat Powers
        dd.
          Combat powers have no casting cost, as they are generally instantiated by some sort of gadget or device.
          Instead of a casting cost, combat powers recharge on a short or long rest. If a combat power calls for a
          Spell Save, the DC will be indicated in the combat power's description.
      p.mt-4.
        Finally, you do not need to prepare spells. Instead, your class learns or advances spells as they level up.
        Once a spell is learned, it is always at your character's disposal.
</template>

<script>
  import RuleCard from '~/components/shared/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
