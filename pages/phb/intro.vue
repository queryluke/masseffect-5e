<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12).my-5.text-xs-center
      img(src="/images/me5e_logo_notm.png" height="90px")
    v-flex(xs12).text-xs-center
      h1.display-3 Player's Handbook Introduction
    v-flex(xs12)
      v-card.elevation-0.transparent
        v-card-text
          h2.headline Learning the basics
          p.
            This handbook bolts on and augments the current Dungeons & Dragons 5th Edition System Reference Document (SRD).
            If you have never played 5th Edition, we recommend that you familizarize yourself with the 5th edition rules.
            Wizards of the Coast has a fantastic #[a(href="http://dnd.wizards.com/articles/features/basicrules" target="_blank") basic rules]
            section from which you can download the free PDF or read online. It also has a basic rules section for Dungeon Masters.
            Additionally, there are plenty of other free, online resources which you can find by googleing "5th edition SRD".
          p.subheading #[v-icon info] Parts you can skip
          p.
            Classes, races, and spells are completely new in our game, so there isn't much to learn from those sections. You can skim them to get a better
            sense of how they work, but none of the information is applicable.
      v-card.elevation-0.transparent
        v-card-text
          h2.headline Changes and Additions
          p.
            Once you feel pretty good about the 5th Edition ruleset, you'll want to look at our rule changes:
</template>

<script>
  export default {
    head () {
      return {
        title: 'Mass Effect 5e | Player\'s Handbook',
        meta: [
          { hid: 'description', name: 'description', content: 'Information about how to play Mass Effect 5e and use the player\'s handbook' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
