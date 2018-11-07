<template lang="pug">
  div
    v-card.mt-3
      v-card-text
        p.headline Background Information
        p {{ race.snippet}}
        v-btn(:href="`http://masseffect.wikia.com/wiki/${ race.id == 'unshackled_ai' ? 'Artificial_Intelligence' : race.name }`" target="_blank" color="primary").
          Read more #[v-icon keyboard_arrow_right]

    v-card.mt-3
      v-card-text
        p.headline Available Classes
        v-layout(row wrap justify-space-around).mt-3
          v-flex(v-for="me_class in race.availableClasses" v-bind:key="me_class").xs4.sm2.lg1.text-xs-center
            me-icon(:name="me_class" type="classes")
            p {{ me_class }}

    v-card.mt-3
      v-card-text
        p.headline {{ race.name }} Traits
        v-container(fluid)
          div.hr
          v-layout(row wrap justify-space-around).ma-2
            v-flex.xs6.sm3.text-xs-center
              strong Speed
              br
              span {{ race.speed }}
            v-flex.xs6.sm3.text-xs-center
              strong Size
              br
              span {{ race.size }}
            v-flex.xs6.sm3.text-xs-center
              v-tooltip(bottom)
                span(slot="activator")
                  strong
                    a(href="http://www.polygon.com/2017/3/20/14980436/mass-effect-sexiest-character-aliens-ranked" target="_blank").black--text.
                      Sexy Level
                    v-icon(size="16").ml-1 help
                span What is sexy level? ... A joke. But please read this very scientific article linked here
              br
              span {{ race.sexyLevel }}
          div.hr
          trait
            span(slot="header") Alignment
            span(slot="text") {{ race.alignment }}
          trait
            span(slot="header") Ability Score Increase
            template(slot="text")
              increases(:data="race.abilityScoreIncrease")
          racial-trait(v-for="trait in race.traits" v-bind:key="trait" v-bind:id="trait")
          trait(v-if="race.startingFeats")
            span(slot="header") {{ race.startingFeats.count | pluralize('Feat') }}
            template(slot="text")
              span {{ race.startingFeats.count === 1 ? 'Choose one feat:' : 'Choose two feats:' }}
              span.comma-list
                span(v-for="(feat, index) in race.startingFeats.options" v-bind:key="feat")
                  feat(v-bind:id="feat").ml-1
                  span(v-if="index + 1 < race.startingFeats.options.length") ,
          trait
            span(slot="header") Optional Starting Credits
            span(slot="text") {{ race.startingCredits }}
</template>

<script>
  import MeIcon from '~/components/MeIcon.vue'
  import Increases from '~/components/race/Increases.vue'
  import Trait from '~/components/race/Trait.vue'
  import RacialTrait from '~/components/race/RacialTrait.vue'
  import Feat from '~/components/Feat.vue'

  export default {
    components: { MeIcon, Increases, Trait, RacialTrait, Feat },
    props: {
      race: {
        type: Object,
        default: () => { return {} }
      }
    }
  }
</script>
