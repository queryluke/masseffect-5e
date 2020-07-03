<template lang="pug">
  div
    v-card.mt-3.hidden-print
      v-card-text
        // p.headline Background Information
        // p {{ race.snippet}}
        markdown-file(:id="race.id" itemType="races")
        v-btn(:href="`http://masseffect.wikia.com/wiki/${ race.id == 'unshackled_ai' ? 'Artificial_Intelligence' : race.name }`" target="_blank" color="primary").
          Read more #[v-icon keyboard_arrow_right]

    v-card.mt-3.hidden-print
      v-card-text
        p.headline Available Classes
        v-layout(row wrap justify-space-around).mt-3
          v-flex(v-for="me_class in race.availableClasses" v-bind:key="me_class").xs4.sm2.lg1.text-xs-center
            me-icon(:name="me_class" type="classes")
            p {{ me_class }}

    v-card.mt-3
      v-card-text
        p.hidden-screen {{ race.snippet }}
        p.subheading.hidden-screen Available Classes: #[small {{ race.availableClasses.join(', ') }}]
        p.headline {{ race.name }} Traits
        trait
          span(slot="header") Ability Score Increase
          template(slot="text")
            increases(:data="race.abilityScoreIncrease")
        trait
          span(slot="header") Age
          span(slot="text") {{ race.age }}
        trait
          span(slot="header") Alignment
          span(slot="text") {{ race.alignment }}
        trait
          span(slot="header") Size
          span(slot="text") {{ race.size }}
        trait
          span(slot="header") Speed
          span(slot="text") {{ race.speed }}
        racial-trait(v-for="trait in race.traits" v-bind:key="trait" v-bind:id="trait")
        trait
          span(slot="header") Optional Starting Credits
          span(slot="text") {{ race.startingCredits }}

    // Variants
    v-card(v-if="race.variants").mt-3
      v-card-text
        variant(v-for="variant in race.variants" v-bind:key="variant" v-bind:id="variant")
</template>

<script>
import MeIcon from '~/components/MeIcon.vue'
import Increases from '~/components/race/Increases.vue'
import Trait from '~/components/race/Trait.vue'
import RacialTrait from '~/components/race/RacialTrait.vue'
import Variant from '~/components/race/Variant.vue'

export default {
  components: { MeIcon, Increases, Trait, RacialTrait, Variant },
  props: {
    race: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
