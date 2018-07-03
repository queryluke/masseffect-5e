<template lang="pug">
  rule-card
    span(slot="header") Thermal Clips
    template(slot="text")
      blockquote.mb-3
        em.
          It was discovered that, in an age of kinetic barriers, most firefights were won by the side who could put the most
          rounds downrange the fastest. As such, detachable heat sinks, known as thermal clips, were adopted first by the geth,
          and shortly thereafter by organic arms manufacturers. Ammunition may never be a concern with modern arms, but the availability of thermal clips is;
          weapons without thermal clips have nowhere to disperse their heat and are incapable of firing.
          Luckily, thermal clips litter modern battlefields, and can be obtained from fallen enemies or found around the environment.
          #[cite -- #[a(href="http://masseffect.wikia.com/wiki/Thermal_clip#Mass_Effect_2" target="_blank") Mass Effect Wiki]]
      h3.title Using Thermal Clips
      p.
        When you reload your weapon, you expend a thermal clip.
      h3.title Armor Capacity: 10
      p.
        All armor comes standard with 10 thermal clip slots. Some armor and mods allow you to increase this amount.
      h3.title Resupplying: ~100 credits
      p.
        Thermal clips are easily looted from almost every enemy wielding a weapon. However, you can also resupply all of your
        thermal clips at a gun shop or military depot for about 100 credits.
      div.hr
      h3.title Variant: No Thermal Clips
      p.
        Because thermal clips are so easily attainable, GMs might find it more manageable to simply not
        keep track of thermal clips and assume players will always have a steady supply available to them.
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard }
  }
</script>
