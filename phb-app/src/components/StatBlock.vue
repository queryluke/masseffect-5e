<template lang="pug">
  v-card
    v-card-text
      p.red--text.text--darken-4.headline.small-caps.mb-0 #[strong {{ stats.name }}]
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
      ul.list-unstyled
        li(v-if="savingThrows") #[strong Saving Throws] {{ savingThrows }}
        li(v-if="skills") #[strong Skills] {{ skills }}
        li(v-if="hasDamageResistances") #[strong Damage Resistances] {{ stats.damageResistances.join(', ') }}
        li(v-if="hasConditionImmunities") #[strong Condition Immunities] {{ stats.conditionImmunities.join(', ') }}
      div.hr
      p(v-for="(feature, index) in stats.features" v-bind:key="index") #[strong #[em {{ feature.name }}].] {{ feature.description }}
      div
        p.title.underline-heading.small-caps Actions
      div(v-if="hasReactions")
        p.title.underline-heading.small-caps Reactions
        p(v-for="(reaction, index) in stats.reactions" v-bind:key="index") #[strong #[em {{ reaction.name }}].] {{ reaction.description }}

</template>

<script>
  import {AbilityScoreBonus} from '../mixins/abilityScoreBonus';
  import {DieFromAverage} from '../mixins/dieFromAverage';

  export default {
    name: 'StatBlock',
    data() {
      return {
        abilityMap: {
          str: 'Strength',
          dex: 'Dexterity',
          con: 'Constitution',
          int: 'Intelligence',
          wis: 'Wisdom',
          cha: 'Charisma',
        }
      };
    },
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
      },
    },
    computed: {
      hasDamageResistances() {
        return this.stats.damageResistances && this.stats.damageResistances.length > 0;
      },
      hasConditionImmunities() {
        return this.stats.conditionImmunities && this.stats.conditionImmunities.length > 0;
      },
      hasReactions() {
        return this.stats.reactions && this.stats.reactions.length > 0;
      },
      savingThrows() {
        if (this.stats.savingThrows && this.stats.savingThrows.length > 0) {
          return this.stats.savingThrows.map(st => {
            return `+${st.bonus} ${st.name}`;
          }).join(', ');
        }
        return false;
      },
      skills() {
        if (this.stats.skills && this.stats.skills.length){
          return this.stats.skills.map(skill => {
            return `+${skill.bonus} ${skill.name}`;
          }).join(', ');
        }
        return false;
      },
    },
    props: ['stats'],
  };
</script>

