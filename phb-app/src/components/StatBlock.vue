<template lang="pug">
  v-card
    v-card-text.pb-0
      p.red--text.text--darken-4.headline.small-caps.mb-0 #[strong {{ stats.name }}]
      p #[em {{ stats.size }} {{ stats.type }}, {{ stats.alignment }}]
    v-card-text(style="position:relative;").pt-0
      slot(name="actions")
      div.hr
      ul.list-unstyled
        li #[strong Armor Class] {{ stats.ac }}
        li #[strong Hit Points] {{ renderPoints(stats.hp) }}
        li #[strong Shield Points] {{ shields(stats.sp) }}
        li(v-if="stats.barrier") #[strong Barrier] {{ stats.barrier }} {{ stats.barrier | pluralize('tick') }}
        li #[strong Speed] {{ stats.speed }}
      div.hr
      v-container.py-0
        v-layout
          v-flex(xs2 v-for="(score, ability) in stats.abilityScores" v-bind:key="ability").text-xs-center
            p.ma-0 #[strong {{ ability.toUpperCase() }}]
            p.ma-0 {{ score }} ({{ score | abilityBonus }})
      div.hr
      ul.list-unstyled
        li(v-if="hasFeature('savingThrows')") #[strong Saving Throws] {{ stats | npcSavingThrows }}
        li(v-if="skills") #[strong Skills] {{ skills }}
        li(v-if="hasFeature('damageVulnerabilities')") #[strong Damage Vulnerabilities] {{ stats.damageVulnerabilities.join(', ') }}
        li(v-if="hasFeature('damageResistances')") #[strong Damage Resistances] {{ stats.damageResistances.join(', ') }}
        li(v-if="hasFeature('damageImmunities')") #[strong Damage Immunities] {{ stats.damageImmunities.join(', ') }}
        li(v-if="hasFeature('conditionImmunities')") #[strong Condition Immunities] {{ stats.conditionImmunities.join(', ') }}
        li(v-if="hasFeature('senses')") #[strong Senses] {{ stats.senses.join(', ') }}
        li #[strong Challenge] {{ stats.cr }} ({{ stats.xp }} XP)
      div.hr
      p(v-for="feature in stats.features" v-bind:key="feature.id")
        npc-common-feature(:feature="feature" v-bind:npc="stats")
      div(v-if="stats.spellcasting").mb-3
        p.mb-1.
          #[strong #[em Biotics].] The {{ stats.name }} is {{ stats.spellcasting.level | article }} {{ stats.spellcasting.level | ordinal }}-level
          biotic. Its biotic ability is Wisdon (spell save DC {{ stats.spellcasting.dc }}, +{{ stats.spellcasting.hit }} to hit with spell attacks).
          The {{ stats.name }} has the following biotic spells:
        div(v-for="(spellLevel, spellLevelIndex) in stats.spellcasting.spells" v-bind:key="spellLevelIndex")
          p(v-if="spellLevel.level === 'cantrip'").my-0 Cantrips (at will): #[em {{ spellLevel.spells.map(spell => spell.name).join(', ') }}]
          p(v-else).my-0 {{ spellLevel.level | ordinal }} level ({{ spellLevel.slots }} {{ spellLevel.slots | pluralize('slot') }})
            span(v-if="spellLevel.spells.length > 0") : #[em {{ spellLevel.spells.map(spell => spell.name).join(', ') }}]
      div(v-if="stats.techcasting").mb-3
        p.mb-1.
          #[strong #[em Tech Powers ({{ stats.techcasting.perDay }}/Day)].] The {{ stats.name }} can cast {{ stats.techcasting.perDay }}
          tech {{ stats.techcasting.perDay | pluralize('power') }} from the following list per day. When it casts a tech power that requires X tech points, it casts the power with
          {{ stats.techcasting.tpSpent }} tech {{ stats.techcasting.tpSpent | pluralize('point') }}. Its tech ability is Intelligence (spell save DC {{ stats.techcasting.dc }},
          +{{ stats.techcasting.hit }} to hit with tech attacks).
        p.my-0 Known tech powers: #[em {{ stats.techcasting.spells.map(spell => spell.name).join(', ') }}]
      p(v-if="hasFeature('actions')").title.underline-heading.small-caps Actions
      div(v-for="(action, index) in stats.actions" v-bind:key="index")
        div(v-if="action.type === 'attack'")
          npc-attack(:feature="action" v-bind:npc="stats")
        p(v-else-if="action.type === 'common'")
          npc-common-feature(:feature="action" v-bind:npc="stats")
      div(v-if="hasFeature('reactions')")
        p.title.underline-heading.small-caps Reactions
        p(v-for="reaction in stats.reactions" v-bind:key="reaction.id")
          npc-common-feature(:feature="reaction" v-bind:npc="stats")
</template>

<script>
  import {AbilityScoreBonus} from '../mixins/abilityScoreBonus';
  import {DieFromAverage} from '../mixins/dieFromAverage';
  import NpcCommonFeature from './NpcFeatures/NpcCommonFeature.vue';
  import NpcAttack from './NpcFeatures/NpcAttack.vue';

  export default {
    components: {
      NpcAttack,
      NpcCommonFeature
    },
    name: 'StatBlock',
    mixins: [
      AbilityScoreBonus,
      DieFromAverage,
    ],
    methods: {
      renderPoints(pointObject){
        if (pointObject) {
          let mod = '';
          if (pointObject.mod > 0) {
            mod = ` + ${pointObject.mod}`;
          } else if (pointObject.mod < 0) {
            mod = ` - ${pointObject.mod * -1}`;
          }
          return `${pointObject.average} (${pointObject.numDice}d${pointObject.die}${mod})`;
        } else {
          return '0';
        }
      },
      shields(shieldObject) {
        if (shieldObject.average) {
          return this.renderPoints(shieldObject);
        } else if (shieldObject.shields) {
          return `${shieldObject.shields} (${shieldObject.regen} regen)`;
        }
        return '0';
      },
      hasFeature(feature) {
        return this.stats[feature] && this.stats[feature].length > 0;
      }
    },
    computed: {
      skills() {
        if (this.stats.skills && this.stats.skills.length){
          return this.stats.skills.map(skill => {
            return `${skill.name} +${skill.bonus}`;
          }).join(', ');
        }
        return false;
      }
    },
    props: ['stats'],
  };
</script>

