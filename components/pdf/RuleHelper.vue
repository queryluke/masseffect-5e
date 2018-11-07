<template lang="pug">
  section
    h3.display-2.mb-4 {{ displayTitle }}
    div(v-for="(rule, index) in rules" v-bind:key="index" v-if="!exclude.includes(rule)")
      component(v-bind:is="rule").pt-5
</template>

<script>
  import {
    AbilityNomenclature,
    AdvancementOptions,
    ArmorCustomization,
    Basics,
    ChangesAndAdditions,
    Conditions,
    CostOfThings,
    Cover,
    CreatureTypes,
    DamageTypes,
    Grenades,
    HeavyWeaponCharges,
    MeleeWeapons,
    OmniGel,
    PrimersAndDetonators,
    QuestionsAndFeedback,
    RapidReload,
    Reloading,
    SexyLevel,
    Shields,
    StartingYourCampaign,
    ThermalClips,
    ToolsKits,
    WebAppTools
  } from '../phb'

  export default {
    components: {
      AbilityNomenclature,
      AdvancementOptions,
      ArmorCustomization,
      Basics,
      ChangesAndAdditions,
      Conditions,
      CostOfThings,
      Cover,
      CreatureTypes,
      DamageTypes,
      Grenades,
      HeavyWeaponCharges,
      MeleeWeapons,
      OmniGel,
      PrimersAndDetonators,
      QuestionsAndFeedback,
      RapidReload,
      Reloading,
      SexyLevel,
      Shields,
      StartingYourCampaign,
      ThermalClips,
      ToolsKits,
      WebAppTools
    },
    computed: {
      displayTitle () {
        let title = this.title.split('-')
        if (title[1]) {
          return title[1].trim()
        }
        return title[0]
      }
    },
    data () {
      return {
        exclude: ['conditions']
      }
    },
    props: ['rules', 'title']
  }
</script>

<style>
  .v-card {
    border-radius: 0;
    box-shadow: none;
  }

  .v-card__title {
    padding: 0;
    background-color: transparent !important;
    border: none !important;
    color: #000 !important;
    border-bottom: 1px solid #777 !important;
    margin-bottom: 5px !important;
  }

  .v-card__text {
    padding: 0 !important;
  }

  .v-card__actions {
    display: none;
  }

  @media print {
    .pt-5 {
      padding-top: 0 !important;
    }
  }
</style>
