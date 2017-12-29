<template lang="pug">
  v-card
    v-card-text
      p.red--text.text--darken-4.display-1.mb-0 {{ stats.name }}
      p #[em {{ stats.size }} {{ stats.type }}, {{ stats.alignment }}]
      div.hr
      ul.list-unstyled
        li #[strong Armor Class] {{ stats.ac }}
        li #[strong Hit Points] {{ renderPoints(stats.hp) }}
        li #[strong Shield Points] {{ renderPoints(stats.sp) }}
        li #[strong Speed] {{ stats.speed }}
      div.hr
      v-container.py-0
        v-layout
          v-flex(xs2 v-for="(score, ability) in stats.abilityScores" v-bind:key="ability").text-xs-center
            p.ma-0 #[strong {{ ability.toUpperCase() }}]
            p.ma-0 {{ score }} ({{ renderBonus(score) }})
      div.hr

</template>

<script>
  import {AbilityScoreBonus} from '../mixins/abilityScoreBonus';
  import {DieFromAverage} from '../mixins/dieFromAverage';

  export default {
    name: 'StatBlock',
    mixins: [
      AbilityScoreBonus,
      DieFromAverage
    ],
    methods: {
      renderBonus(score){
        const abilityScoreBonus = this.abilityScoreBonus(score);
        return abilityScoreBonus >= 0 ? `+${abilityScoreBonus}` : abilityScoreBonus;
      },
      renderPoints(pointObject){
        if (pointObject) {
          let mod = '';
          if (pointObject.mod > 0) {
            mod = ` + ${pointObject.mod}`;
          } else if (pointObject.mod < 0) {
            mod = ` - ${pointObject.mod * -1}`;
          }
          return `${pointObject.average} (${pointObject.numDice}d${this.dieFromAverage(pointObject.avgRoll)}${mod})`;
        } else {
          return '0';
        }
      }
    },
    props: ['stats'],
  };
</script>

