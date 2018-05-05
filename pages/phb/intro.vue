<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12).my-5.text-xs-center
        img(src="/images/me5e_logo_notm.png" id="phbLogo")
      v-flex(xs12).text-xs-center
        h1.display-3 Player's Handbook Introduction
        h2.title v{{ version }}
        v-btn(to="/changelog" nuxt).primary Changelog
      v-flex(xs12)
        v-card.elevation-0.transparent
          v-card-text
            v-container(fluid grid-list-md).pa-0
              v-layout(row wrap)
                v-flex(xs12 md8)
                  h2.headline Learning the basics
                  p.
                    This handbook bolts on to and augments the current Dungeons & Dragons 5th Edition System Reference Document (SRD).
                    If you have never played 5th Edition, we recommend that you familiarize yourself with the 5th edition rules.
                    Wizards of the Coast has a fantastic #[a(href="http://dnd.wizards.com/articles/features/basicrules" target="_blank") basic rules]
                    section from which you can download the free PDF or read online. It also has a basic rules section for Dungeon Masters.
                    Additionally, there are plenty of other free, online resources which you can find by googling "5th edition SRD".
                v-flex(xs12 md4)
                  v-card.blue.lighten-5
                    v-card-text
                      p.subheading #[v-icon info] #[em SRD parts you can skip]
                      p.
                        Classes, races, and spells are completely new in Mass Effect 5e, so there isn't much to learn from those sections. If you wish, you can skim them to get a better
                        sense of how they work.
        v-card.elevation-0.transparent
          v-card-text
            v-container(fluid grid-list-md).pa-0
              v-layout(row wrap)
                v-flex(xs12 md8)
                  h2.headline Changes and Additions
                  p.
                    Once you feel pretty good about the 5th Edition ruleset, you'll want to look at our rule changes:
                  dl
                    dt #[nuxt-link(to="/phb/rules/general") General]
                    dd.
                      This section gives you an overview of the general rule changes. You might also consider this the miscellaneous category.
                    dt #[nuxt-link(to="/phb/rules/combat") Combat]
                    dd.
                      This section gives you an overview of the changes in combat, which are mostly additions.
                      It information about Shields, Primers and Detonators, and Barriers.
                    dt #[nuxt-link(to="/phb/rules/spellcasting") Spellcasting]
                    dd.
                      A major feature of D&D are the spells. Since there isn't 'magic' in Mass Effect, our spell list is limited to
                      biotics, tech powers, and some combat gadgets. The spellcasting rules will explain how these three types of
                      'spells' are utilized in the system.
                    dt #[nuxt-link(to="/phb/rules/weapons") Weapons]
                    dd.
                      A huge addition is the massive increase in ranged weapons, a.k.a., guns. The addition of the Mass Effect arsenal
                      required some minor adjustments to combat and how attacks with ranged weapons are made. There are still melee weapons available,
                      and certain subclasses excel at melee combat. But ranged weapons are the default, rather than melee.
                    dt #[nuxt-link(to="/phb/rules/armor") Armor]
                    dd.
                      The other huge addition is the expansion of how armor works. Instead of a full suit of armor, ME5e allows players to don armor of
                      different types on different parts of the body, resulting in an array of armor class possibilities. The other change is that armor can be
                      modded to increase its stats and grant minor features.
                    dt #[nuxt-link(to="/phb/rules/skills") Skills]
                    dd.
                      We've replaced some 5th Edition skills with sci-fi flavored versions.
                    dt #[nuxt-link(to="/phb/rules/conditions") Conditions]
                    dd.
                      We've added a few conditions to accommodate certain spells and weapon types.
                v-flex(xs12 md4)
                  v-card.blue.lighten-5
                    v-card-text
                      p.subheading #[v-icon info] #[em Variant Rules]
                      p.
                        Occasionally, you'll see a rule preceded by the word "Variant". This means the rule is optional. In some cases,
                        it may replace an existing rule. For example, the Variant: Encumbrance rule replaces the standard Lifting & Carrying rules.
                      p.
                        In other instances, the rule may be completely ignored. For example, the Paragon & Renegade rule adds rules for utilizing
                        paragon and renegade points. While this is nice flavor and harkens the Mass Effect game, it is not required for this system
                        and, thus, can be completely ignored.
        v-card.elevation-0.transparent
          v-card-text
            v-container(fluid grid-list-md).pa-0
              v-layout(row wrap)
                v-flex(xs12 md8)
                  h2.headline Character Creation & Leveling
                  p.
                    Once you've got a sense of the base 5th Edition rules and the ME5e rule changes, you're ready to dive
                    into the character creation options. ME5e doesn't change anything about the creation and leveling process, only the options
                    available to you. So you can follow the SRD's examples. Finally, you can keep track of your character information with our
                    #[nuxt-link(to="/assets") custom character sheet].
                  p.mb-0.
                    For quick reference:
                  ol.pl-3
                    li Choose a race
                    li Choose a class
                    li Choose a background (coming soon...)
                    li Roll for base stats
                    li Choose your starting equipment
                    li Choose any feats provided by your class
                    li Choose any skill proficiencies afforded to you by your race, class, or background
                    li Use the class progression tables to level up your character
                  p.mt-3.
                    As explained in the 5th Edition SRD, character creation starts with choosing
                    a race and a class. We've done our best to translate the iconic classes into D&D versions.
                    5th edition veterans will like notice that some class features are re-skinned or ported versions of their 5th edition
                    counterparts. In general, we try to keep the rules as inline as possible with 5th edition to avoid any balancing issues.
                v-flex(xs12 md4)
                  v-card.blue.lighten-5
                    v-card-text
                      p.subheading #[v-icon info] #[em Class limitations on races]
                      p.
                        Another minor change is that not every race can be any class. The simple reason is that not all races have nascent biotic abilities,
                        thus, it doesn't make much sense for them to become adepts or vanguards. However, this is a general rule and can certainly be overridden
                        at your Galaxy Master's discretion. If you want to play a Quarian Vanguard and the GM gives you the ok, then, by all means, you should!
                  div.ma-3.text-xs-center
                    v-btn(to="/assets" nuxt).primary Character Sheet
        v-card.elevation-0.transparent
          v-card-text
            h2.headline Starting your campaign
            p.
              Once you've got a group together and characters are made, it's time to start your campaign. Other than following the rule changes,
              there isn't anything special about running a Mass Effect 5e campaign. In later versions, we hope to introduce a Variant add-on
              for space travel and combat (via ships), but this isn't required to get started.
            p.
              For information about the Mass Effect universe, I lean heavily on the
              #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank") Mass Effect Wiki].
        v-card.elevation-0.transparent
          v-card-text
            h2.headline Web App Tools
            p.mb-0.
              In addition to being your Player's Handbook, this website also has some helpful tools. We hope to add more tools in the near future!
            dl
              dt #[nuxt-link(to="/for-gms/grunts/") NPC Generator]
              dd.
                If there aren't enough options in the bestiary, or you just want to spin up some random NPCs, the Grunt Generator can quickly
                create NPCs from CR 1/8 to CR 12. All weapons, powers, and traits are randomly generated, but damage output and health are kept within
                the selected CR boundary. For GMs, this is also a great way to provide new weapons for your players, as they can loot the remains of the enemy.
              dt Bookmarks
              dd.
                Weapons, grenades, spells, and monsters can all be bookmarked by clicking on the "Bookmark" button on the bottom of their info card.
                This will save the item so it's quick accessible in the #[nuxt-link(to="/phb/bookmarks") bookmarks page] for quick reference.
        v-card.elevation-0.transparent
          v-card-text
            h2.headline Questions and Feedback
            p.
              We always welcome constructive criticism. It's the only way this system will evolve and get better. To contribute,
              provide feedback, or ask question, you can either use the #[a(href="https://goo.gl/forms/3wZj8QhlsLv3XOJw1" target="_blank") feedback from]
              or email us directly at #[a(mailto="info@n7.world") info@n7.world]
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['getVersion']),
      version () {
        return this.getVersion
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Player\'s Handbook',
        meta: [
          { hid: 'description', name: 'description', content: 'Want to play D&D in the Mass Effect Universe? Learn how to get started.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>

<style lang="scss">
  #phbLogo {
    width: 100%;
    height: auto;
  }

  @media screen and (min-width: 960px) {
    #phbLogo {
      width: auto;
      height: 90px;
    }
  }
</style>