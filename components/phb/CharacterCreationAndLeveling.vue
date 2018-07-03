<template lang="pug">
  flat-card(alert-box)
    span(slot="title") Character creation and leveling
    template(slot="body")
      p.
        Once you've got a sense of the base 5th Edition rules and the ME5e rule changes, you're ready to dive
        into the character creation options. ME5e doesn't change anything about the basic process of character creation and leveling,
        only the specific options available to you, so you can
        #[a(href="http://dnd.wizards.com/products/tabletop/players-basic-rules#howtoplayparent_911" target="_blank") follow the steps in the SRD]
        to create your character. Finally, you can keep track of your character information with our #[nuxt-link(to="/assets") custom character sheet].
      p.mb-0.
        For quick reference:
      ol.pl-3
        li Choose a #[nuxt-link(to="/phb/races") race]
        li Choose a #[nuxt-link(to="/phb/classes") class]
        li Choose a #[nuxt-link(to="/phb/backgrounds") background]
        li Roll for ability scores
        li Choose your starting equipment
        li Choose any feats provided by your class
        li Choose any skill proficiencies afforded to you by your race, class, or background
        li Use the class progression tables to level-up your character
      p.mt-3.
        As explained in the 5th Edition SRD, character creation starts with choosing
        a race and a class. We've done our best to translate the iconic classes of #[em Mass Effect] into versions compatible with 5e rules.
        5th edition veterans will likely notice that some class features are re-skinned or ported versions of their 5th edition
        counterparts. In general, we try to keep the rules as similar as possible with 5th edition to avoid any balancing issues.
    span(slot="alertTitle") Class limitations on races
    template(slot="alertBody")
      p.
        Another minor change is that not every race can be any class. The simple reason is that not all races have intrinsic biotic abilities,
        thus, it doesn't make much sense for them to become adepts or vanguards. However, this is a general guideline and can certainly be disregarded
        at your Galaxy Master's discretion. If you want to play a Quarian Vanguard, and your GM gives you the OK, then, by all means, you should!
      div.ma-3.text-xs-center
        v-btn(to="/assets" nuxt).primary Character Sheet
</template>

<script>
  import FlatCard from '~/components/cards/FlatCard.vue'

  export default {
    components: { FlatCard }
  }
</script>
