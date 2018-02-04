<template lang="pug">
  rule-card(id="armorProficiency")
    span(slot="header") Armor proficiency is based on RACE not class.
    template(slot="text")
      p.
        Since the races come in a variety of shapes and sizes, it makes sense that armor manufacturers would only create sets and
        pieces they could sell. Based on a race's customs and military it may not have needed any heavy armor (or any light
        armor...I'm looking at you Krogans). In this way, race also plays a bit more of a role in you character's combat role and abilities.
        But this doesn't mean a Drell Soldier can't strap on some heavy armor. It means you'll
        have to take Feats to get yourself proficient in heavy armor. Or you can modify your light armor to have more AC.
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'ArmorProficiency',
    components: { RuleCard },
  };
</script>
