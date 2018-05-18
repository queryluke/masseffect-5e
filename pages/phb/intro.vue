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
                    This handbook uses the current Dungeons & Dragons 5th Edition System Reference Document (SRD) as its core rule set.
                    If you have never played D&D 5e, we recommend that you familiarize yourself with the basic rules of that system.
                    Wizards of the Coast has a fantastic #[a(href="http://dnd.wizards.com/articles/features/basicrules" target="_blank") basic rules]
                    section where you can download the PDF or read online for free. It also has a basic rules section for Dungeon Masters.
                    Additionally, there are plenty of other free, online resources which you can find by searching for "5th edition SRD".
                v-flex(xs12 md4)
                  v-card.blue.lighten-5
                    v-card-text
                      p.subheading #[v-icon info] #[em Brand New Material]
                      p.
                        The #[strong classes], #[strong races], and #[strong spells] are completely new in Mass Effect 5e. If you are reading
                        the SRD in order to learn how to play #[em Mass Effect 5e] you can skip those section of the SRD and skip to the sections
                        of the same name in this Player's Handbook.
        v-card.elevation-0.transparent
          v-card-text
            v-container(fluid grid-list-md).pa-0
              v-layout(row wrap)
                v-flex(xs12 md8)
                  h2.headline Changes and Additions
                  p.
                    Once you have a general understanding of the 5th Edition rules, you'll want to look at our rule changes:
                  dl
                    dt #[nuxt-link(to="/phb/rules/general") General]
                    dd.
                      This section gives you an overview of the general rule changes. You might consider this the "miscellaneous" category.
                    dt #[nuxt-link(to="/phb/rules/combat") Combat]
                    dd.
                      This section gives you an overview of the changes in combat, which are mostly additions.
                      It contains information about #[strong Shields], #[strong Primers and Detonators], and #[strong Barriers].
                    dt #[nuxt-link(to="/phb/rules/spellcasting") Spellcasting]
                    dd.
                      A major feature of D&D are the spells. Since there isn't 'magic' in Mass Effect, our spell list is converted into
                      #[strong biotics], #[strong tech powers], and #[strong combat devices]. The spellcasting rules will explain how these three types of
                      'spells' are utilized in the system.
                    dt #[nuxt-link(to="/phb/rules/weapons") Weapons]
                    dd.
                      A huge addition is the massive increase in ranged weapons, specifically firearms. The addition of the Mass Effect arsenal
                      required some adjustments to combat and how attacks with ranged weapons are made. There are still melee weapons available,
                      and some subclasses excel at melee combat. However, in the world of Mass Effect, ranged weapons are the default choice for combatants.
                    dt #[nuxt-link(to="/phb/rules/armor") Armor]
                    dd.
                      The other major addition is the expansion of how armor works. Instead of a full suit of armor, ME5e allows players to don armor of
                      different types on different parts of the body, resulting in an array of Armor Class (AC) possibilities. The other change is that armor can be
                      modified to increase its stats and grant additional features.
                    dt #[nuxt-link(to="/phb/rules/expenses") Expenses]
                    dd.
                      In this section we'll outline currency, buying and selling items, and provide some guidelines for setting the cost of items and lifestyle expenses.
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
                        In other instances, the rule may be completely ignored. For example, the Paragon & Renegade system adds rules for utilizing
                        paragon and renegade points. While this adds a nice touch of flavor from the original #[em Mass Effect] trilogy, it is not required
                        for this system to work, and it can safely be left out of your campaign if desired.
        v-card.elevation-0.transparent
          v-card-text
            v-container(fluid grid-list-md).pa-0
              v-layout(row wrap)
                v-flex(xs12 md8)
                  h2.headline Character Creation & Leveling
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
                    li Choose a background (coming soon...)
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
                v-flex(xs12 md4)
                  v-card.blue.lighten-5
                    v-card-text
                      p.subheading #[v-icon info] #[em Class limitations on races]
                      p.
                        Another minor change is that not every race can be any class. The simple reason is that not all races have intrinsic biotic abilities,
                        thus, it doesn't make much sense for them to become adepts or vanguards. However, this is a general guideline and can certainly be disregarded
                        at your Galaxy Master's discretion. If you want to play a Quarian Vanguard, and your GM gives you the OK, then, by all means, you should!
                  div.ma-3.text-xs-center
                    v-btn(to="/assets" nuxt).primary Character Sheet
        v-card.elevation-0.transparent
          v-card-text
            h2.headline Starting your campaign
            p.
              Once you've assembled a group of players and characters are made, it's time to start your campaign. Other than following the rule changes,
              there isn't anything special about running a Mass Effect 5e campaign. In later versions, we hope to introduce additional Variant rules
              for space travel and ship-to-ship combat, but this isn't required to get started.
            p.
              For information about the Mass Effect universe, we recommend consulting the
              #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank") Mass Effect Wiki].
        v-card.elevation-0.transparent
          v-card-text
            v-container(fluid grid-list-md).pa-0
                v-layout(row wrap)
                    v-flex(xs12 md8)
                        h2.headline Web App Tools
                        p.mb-0.
                          In addition to being your Player's Handbook, this website has some other helpful tools. We are constantly working to refine these tools and add new ones!
                        dl
                          dt #[nuxt-link(to="/for-gms/grunts/") NPC Generator]
                          dd.
                            If there aren't enough options in the bestiary, or you just want to spin up some random NPCs, the Grunt Generator can quickly
                            create NPCs with Challenge Ratings (CR) from 1/8 to 12. All weapons, powers, and traits are randomly generated, but damage output and health are kept within
                            your selected CR boundary. For GMs, this is also a great way to provide new weapons for your players, as they can loot the remains of the enemy.
                          dt #[nuxt-link(to="/phb/bookmarks") Bookmarks]
                          dd.
                            Weapons, grenades, spells, and monsters can all be bookmarked by clicking on the "Bookmark" button on the bottom of their info card.
                            This will save the item so it's quick accessible in the #[nuxt-link(to="/phb/bookmarks") bookmarks page] for quick reference.
                    v-flex(xs12 md4)
                        v-card.blue.lighten-5
                            v-card-text
                                p.subheading #[v-icon info] #[em What is Challenge Rating?]
                                p.
                                    #[strong Challenge Rating] (or "CR" for short) is a measurement of how powerful a monster or NPC is. It is intended to help GM's control the difficulty
                                    of combat encounters (although new GMs will quickly learn this can be more art that science. For more information on Challenge Ratings, see the
                                    #[a(href="http://dnd.wizards.com/products/tabletop/dm-basic-rules#howtoplay_2096" target="_blank") Combat Encounter Difficulty].
                                    section of the SRD.
        v-card.elevation-0.transparent
          v-card-text
            h2.headline Questions and Feedback
            p.
              We always welcome constructive criticism. It's the only way this system will evolve and get better. To contribute,
              provide feedback, or ask questions, you can either use the #[a(href="https://goo.gl/forms/3wZj8QhlsLv3XOJw1" target="_blank") feedback from]
              or email us directly at #[a(href="mailto:info@n7.world" target="_blank") info@n7.world].
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