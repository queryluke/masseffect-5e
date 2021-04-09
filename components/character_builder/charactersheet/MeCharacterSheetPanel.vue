<script>
import MeCharacterSheetProficencies from './MeCharacterSheetProficencies.vue'
export default {
  components: {
    MeCharacterSheetProficencies
    /*
    CharacterSheetCombat,
    CharacterSheetCasting,
    CharacterSheetEquipment,
    CharacterSheetDescription,
    CharacterSheetProficiencies,
    CharacterSheetNotes */
  },
  data () {
    return {
      currentTab: 0,
      selectedTab: 0,
      tab: 0,
      sections: [
        {
          component: 'MeCharacterSheetProficencies',
          icon: 'mdi-dice-d20'
        },
        {
          component: 'CharacterSheetCombat',
          icon: 'mdi-sword-cross'
        },
        {
          component: 'CharacterSheetCasting',
          icon: 'mdi-lightning-bolt'
        },
        {
          component: 'CharacterSheetEquipment',
          icon: 'mdi-bag-personal'
        },
        {
          component: 'CharacterSheetProficiencies',
          icon: 'mdi-toolbox'
        },
        {
          component: 'CharacterSheetDescription',
          icon: 'mdi-account'
        },
        {
          component: 'CharacterSheetNotes',
          icon: 'mdi-clipboard'
        }
      ]
    }
  }
}
</script>

<template lang="pug">
  v-card.pa-3
    div.d-flex.pb-2
      div(
        v-for="({ icon }, index) in sections",
        :key="icon",
        :class="index === currentTab ? selectedTab : tab"
        @click="$emit('goToTab', index)"
      ).flex-grow-1
        v-btn(icon, class="tabButton")
          v-icon(:color="index === currentTab ? 'primary' : ''") {{ icon }}
    v-tabs(height="0", :value="currentTab")
      v-tab-item(v-for="index in sections.length", :key="index")
        component(
          :is="sections[index - 1].component",
          @goToStep="step => $emit('goToStep', step)"
          @updateCharacter="newCharacter => $emit('updateCharacter', newCharacter)",
          @deleteCharacterProperty="payload => $emit('deleteCharacterProperty', payload)",
          @replaceCharacterProperty="payload => $emit('replaceCharacterProperty', payload)"
        ).text-left
</template>

<style lang="scss">
  @import '~vuetify/src/styles/styles.sass';
  .tab:hover {
    background-color: rgba(#000, .04)
  }

  .selectedTab {
    border-bottom: 2px solid blue;

    &:hover {
      background-color: (blue, .12);
    }
  }

  .tabButton::before {
    color: transparent !important;
  }
</style>
