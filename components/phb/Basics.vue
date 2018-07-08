<template lang="pug">
  flat-card(alert-box id="basics")
    span(slot="title") Learning the basics
    template(slot="body")
      p.
        This handbook uses the current Dungeons & Dragons 5th Edition System Reference Document (SRD) as its core rule set.
        If you have never played D&D 5e, we recommend that you familiarize yourself with the basic rules of that system.
        Wizards of the Coast has a fantastic #[a(href="http://dnd.wizards.com/articles/features/basicrules" target="_blank") basic rules]
        section where you can download the PDF or read online for free. It also has a basic rules section for Dungeon Masters.
        Additionally, there are plenty of other free, online resources which you can find by searching for "5th edition SRD".
    span(slot="alertTitle") Brand New Material
    template(slot="alertBody")
      p.
        The #[strong classes], #[strong races], and #[strong spells] are completely new in Mass Effect 5e. If you are reading
        the SRD in order to learn how to play #[em Mass Effect 5e] you can skip those section of the SRD and skip to the sections
        of the same name in this Player's Handbook.
</template>

<script>
  import FlatCard from '~/components/cards/FlatCard.vue'

  export default {
    components: { FlatCard }
  }
</script>
