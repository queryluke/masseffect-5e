<template lang="pug">
  rule-card(id="multiclassing-prereqs")
    span(slot="header") Prerequisites
    template(slot="text")
      p.
        To qualify for a new class, you must meet the ability score prerequisites for both your current class and your
        new one, as shown in the Multiclassing Prerequisites table. For example, a vanguard who decides to multiclass into
        the infiltrator class must have both Dexterity and Intelligence scores of 13 or higher. Without the full training
        that a beginning character receives, you must be a quick study in your new class, having a natural aptitude that
        is reflected by higher-than-average ability scores.
      p.subheading Multiclassing Prerequisites
      v-data-table(v-bind:headers="prereqs.headers" v-bind:items="prereqs.items" hide-actions)
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.prereq }}
</template>

<script>
  import RuleCard from '~/components/cards/RuleCard.vue'

  export default {
    components: { RuleCard },
    data () {
      return {
        prereqs: {
          headers: [
            { text: 'Class', value: 'name', sortable: false, align: 'left' },
            { text: 'Ability Score Minimum', value: 'prereq', sortable: false, align: 'left' }
          ],
          items: [
            {
              name: 'Adept',
              prereq: 'Wisdom 13'
            },
            {
              name: 'Engineer',
              prereq: 'Intelligence 13'
            },
            {
              name: 'Infiltrator',
              prereq: 'Dexterity 13 and Intelligence 13'
            },
            {
              name: 'Sentinel',
              prereq: 'Intelligence 13 or Wisdom 13'
            },
            {
              name: 'Soldier',
              prereq: 'Strength 13 or Dexterity 13'
            },
            {
              name: 'Vanguard',
              prereq: 'Strength 13 and Wisdom 13'
            }
          ]
        }
      }
    }
  }
</script>
