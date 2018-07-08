<template lang="pug">
  flat-card(alert-box id="web-app-tools")
    span(slot="title") Web app tools
    template(slot="body")
      p.mb-0.
        In addition to being your Player's Handbook, this website has some other helpful tools. We are constantly working to refine these tools and add new ones!
      dl
        dt #[nuxt-link(to="/for-gms/grunts/") NPC Generator]
        dd.
          If there aren't enough options in the bestiary, or you just want to spin up some random NPCs, the Grunt Generator can quickly
          create NPCs with Challenge Ratings (CR) from 1/8 to 12. All weapons, powers, and traits are randomly generated, but damage output and health are kept within
          your selected CR boundary. For GMs, this is also a great way to provide new weapons for your players, as they can loot the remains of the enemy.
        dt #[nuxt-link(to="/for-gms/loot-generator/") Loot Generator]
        dd.
          You can use the loot generator to quickly create randomly generated rewards. These results are similar to rolling for loot in the DMG, but with much less effort.
        dt #[nuxt-link(to="/phb/bookmarks") Bookmarks]
        dd.
          Weapons, grenades, spells, and monsters can all be bookmarked by clicking on the "Bookmark" button on the bottom of their info card.
          This will save the item so it's quick accessible in the #[nuxt-link(to="/phb/bookmarks") bookmarks page] for quick reference.
    span(slot="alertTitle") What is Challenge Rating?
    template(slot="alertBody")
      p.
        #[strong Challenge Rating] (or "CR" for short) is a measurement of how powerful a monster or NPC is. It is intended to help GM's control the difficulty
        of combat encounters (although new GMs will quickly learn this can be more art that science. For more information on Challenge Ratings, see the
        #[a(href="http://dnd.wizards.com/products/tabletop/dm-basic-rules#howtoplay_2096" target="_blank") Combat Encounter Difficulty].
        section of the SRD.
</template>

<script>
  import FlatCard from '~/components/cards/FlatCard.vue'

  export default {
    components: { FlatCard }
  }
</script>
