<template lang="pug">
  v-content
    section
      v-parallax(src="/images/parallax/milky_way.jpg" alt="The Milky Way")
        v-layout(column align-center justify-center).white--text
          me-header-logo
          h1.display-1.mt-5 About #[span.sr-only Mass Effect 5e]
    // Creators
    section
      v-layout(column wrap align-center).my-5
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.display-3.font-weight-light Creators
        v-flex(xs12)
          v-container(grid-list-xl)
            v-layout(row wrap)
              v-flex(xs12 md6 d-flex v-for="creator in creators" v-bind:key="creator.name")
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar(size="128")
                      img(:src="creator.image" v-bind:alt="creator.name")
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    v-flex.pb-0
                      div.headline {{ creator.name }}
                    v-flex.pt-1
                      div {{ creator.title }}
                  v-card-text.pt-0
                    p {{ creator.desc }}
    // Pro Contributors
    section
      v-layout(column wrap align-center).my-5
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.display-2.font-weight-light Pro Contributors
        v-flex(xs12)
          v-container(grid-list-xl)
            v-layout(row wrap justify-center)
              v-flex(xs12 sm6 md4 d-flex v-for="designer in designers" v-bind:key="designer.name")
                v-card.elevation-0.transparent
                  v-card-text.text-xs-center
                    v-avatar(size="92")
                      img(:src="designer.image" v-bind:alt="designer.name")
                  v-card-title(primary-title).layout.column.justify-center.text-xs-center.pb-0
                    v-flex.pb-0
                      div.headline {{ designer.name }}
                  v-card-text.pt-0
                    p {{ designer.desc }}
    // Contributors
    section
      v-layout(row wrap justify-center)
        v-flex(xs12 sm8).my-3
          div.text-xs-center
            h2.display-1.font-weight-light Contributors
            p.
              Thank you to everyone who has contributed to this system by sharing ideas, playtesting, creating assets,
              and much more!!!
        v-flex(xs12 sm8).mb-2
          v-list(three-line)
            template(v-for="item in contributors")
              v-list-tile(avatar v-bind:key="item.name")
                v-list-tile-avatar(size="48")
                  img(:src="item.image")
                v-list-tile-content
                  v-list-tile-title {{ item.name }}
                  v-list-tile-sub-title(v-html="item.desc")
              v-divider(inset)
        v-flex(xs12 sm8)
          v-card.elevation-0.transparent
            v-alert(type="info" v-bind:value="true" outline).
              If, we've missed anyone it was merely an oversight on our part and not intentional.
              Feel free to contact us and we'll be happy to give you a shout out. If you're on the list and want to be
              removed, have your name changed, or update your picture, contact us as well.
    section.mt-5.pt-5
      v-layout(row wrap justify-center).mt-5
        v-flex(xs12 sm8).my-2
          div.text-xs-center
            h2.headline Image Attributuions
            p.px-5.
              Finally, there are a host of Creative Commons images that I've used, so I'd like to attribute and thank
              these indirect contributors. Any images not listed were either created by Luke Aeschleman or come from the the
              #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank").blue--text.text--lighten-3  Mass Effect Wiki].
      v-container(grid-list-md)
        v-layout(row wrap)
          v-flex(v-for="att in attributions" v-bind:key="att.attribution" xs12 sm6 md4 lg3 d-flex)
            v-card(:href="att.source" v-bind:alt="att.title" target="_blank" hover)
              v-img(:src="att.path" height="200px" contain).blue-grey.lighten-5
              v-card-title(color="grey darken-3") {{ att.attribution }}
</template>

<script>
  import AboutCard from '~/components/cards/AboutCard.vue'
  import attributions from '~/static/data/attributions'

  export default {
    components: {AboutCard},
    data () {
      return {
        attributions,
        creators: [
          {
            name: 'Luke Aeschleman',
            image: 'https://avatars0.githubusercontent.com/u/12414786?s=460&v=4',
            title: 'Creator, Site Developer',
            desc: 'Luke is a web developer, librarian, and DM, who decided that he wanted to play Mass Effect while ' +
            'rolling dice. He fell in love with the Mass Effect Universe after playing Mass Effect 2. But he\'s since ' +
            'amassed a number of playthroughs for all the games. He\'s also spent WAY too much time playing ME3 Multiplayer. ' +
            'By day, Luke is a Digital Technologies Development Librarian at NC State University. By night, he wrangles ' +
            '3 dogs, DMs, codes, watches baseball, and practices Si Lum Kung-Fu.'
          },
          {
            name: 'Hugh Thompson',
            image: 'https://avatars0.githubusercontent.com/u/679172?s=460&v=4',
            title: 'Editor',
            desc: 'Hugh is a TRPG enthusiast, both as a GM and a player. But, more importantly, Hugh has as much love for Mass Effect ' +
            'as anyone. With a keen eye for detail, Hugh takes a lot of the random crap Luke comes up with, strips away the ' +
            'verbiage and creates actionable rules and changes. By day, Hugh is the Director of Technology Solutions and Web Development ' +
            'at Rock, Paper, Scissors. He\'s also a dad and a hard-style strength training enthusiast.'
          }
        ],
        designers: [
          {
            name: 'RJ Haggerty, a.k.a. SleightxHope',
            image: 'https://avatars3.githubusercontent.com/u/31451010?s=460&v=4',
            desc: 'Before RJ, this system was just a silly thing Hugh and Luke were doing in their spare time. But RJ\'s contributions' +
            ' really got the ball rolling. The current shape of the classes (subclasses, class features, and progression) are' +
            ' thanks to RJ, but he\'s also had a hand in weapon and armor mod, play testing, and creating omni-tool programs.'
          },
          {
            name: 'Benjamin McPherson',
            image: 'https://avatars3.githubusercontent.com/u/1324851?s=400&v=4',
            desc: 'Ben has been poring through the rule set and pointing out OP mechanics and faulty site bugs.' +
            ' He also took the lead for the Prothean & Angara races, a number of spells, and the Google Sheet character sheet.'
          },
          {
            name: 'Adam, a.k.a. TheMarmotKing',
            image: 'https://avatars3.githubusercontent.com/u/37369223?s=460&v=4',
            desc: 'Adam has provided a lot of invaluable feedback and started many conversations. Most notably, Adam' +
            ' has taken the lead on balancing and reviewing the spell list.'
          },
          {
            name: 'Dakota P.',
            image: '/images/misc/dakota_p.png',
            desc: 'Dakota is working through the backlog of needed monsters and creating unique stat blocks for Mass Effect 5e,' +
            ' including some fun stat blocks from other Sci-fi classics like the Kath Hound from BioWare\'s Knights of the Old Republic.'+
            ' Keep your eyes on the Bestiary for all of the unique creations.'
          },
          {
            name: 'RexThePig',
            image: 'https://avatars2.githubusercontent.com/u/33875334?s=88&v=4',
            desc: 'RTP has been a huge help in identifying gaps in the content, like creating a full list of all the possible' +
            'monsters. RTP created the sheet that can be used with Kobold Club\'s encounter builder, the random height and weight table' +
            'and provides through insight about all the version changes.'
          }
        ],
        contributors: [
          {
            name: 'Alex Needleman',
            image: '/images/spells/tech.svg',
            desc: 'Alex is a thorough and detail-oriented play tester who has pointed out many anomalies and problematic' +
            ' features. He\'s also been working on a set of VTT maps that we hope to feature on the site soon. He has also been heavily' +
            ' involved in the creation of weapon mods.'
          },
          {
            name: 'Noel Moriarty',
            image: 'https://avatars1.githubusercontent.com/u/38429874?s=88&v=4',
            desc: 'Nmmoriarty is a wizard at breaking down rules and theorycrafting. This calculated approach has been invaluable' +
            ' in making a balanced yet intriguing system.'
          },
          {
            name: 'Duneday',
            image: 'https://avatars1.githubusercontent.com/u/38437397?s=88&v=4',
            desc: 'Duneday has contributed a lot of class improvement ideas, especially with Sentinels and was a major part of the Race audit'
          },
          {
            name: 'damuttley',
            image: 'https://avatars1.githubusercontent.com/u/38440736?s=88&v=4',
            desc: 'Race improvements'
          },
          {
            name: 'SrShdw',
            image: 'https://avatars2.githubusercontent.com/u/38442553?s=88&v=4',
            desc: 'Race improvements'
          },
          {
            name: 'BLUEmusta',
            image: 'https://avatars3.githubusercontent.com/u/38446290?s=88&v=4',
            desc: 'Race & Vanguard improvements'
          },
          {
            name: 'tioeduardo27',
            image: 'https://avatars3.githubusercontent.com/u/5409752?s=88&v=4',
            desc: 'Paragon & Renegade concept'
          },
          {
            name: 'kstrtroi',
            image: 'https://avatars1.githubusercontent.com/u/39886442?s=88&v=4',
            desc: 'Incredible PDF design ideas'
          },
          {
            name: 'David T.',
            image: '/images/spells/combat.svg',
            desc: 'Design help'
          },
          {
            name: 'Andrew Ouellette',
            image: '/images/spells/biotic.svg',
            desc: 'Roll 20 Tokens'
          },
          {
            name: 'Avezebra',
            image: '/images/spells/tech.svg',
            desc: 'Hanar concept'
          },
          {
            name: 'Fillable Character Sheet PDFs',
            image: '/images/spells/biotic.svg',
            desc: 'TheNamelessOne, Thessian Shadow, Szirach'
          },
          {
            name: 'Roll 20 Character Sheets',
            image: '/images/spells/combat.svg',
            desc: 'EnricoDandolo1, John G.'
          },
          {
            name: 'GameMasterPo',
            image: 'https://avatars0.githubusercontent.com/u/44739269?s=88&v=4',
            desc: 'Alternate Google Sheets character sheet'
          },
          {
            name: 'Stephen W.',
            image: '/images/spells/tech.svg',
            desc: 'Indoctrination ideas'
          },
          {
            name: '/u/thestray',
            image: '/images/spells/biotic.svg',
            desc: 'Indoctrination ideas'
          },
          {
            name: 'Other Shout outs!',
            image: 'https://vignette.wikia.nocookie.net/masseffect/images/3/32/ME1_Paragon.png/revision/latest?cb=20120309175829',
            desc: 'Mel Bee, Joey C., Connor C., MonocledMutineer, kstrtroi, HadesJester, Lodus, BenutzernameIstBereitsVergeben ' +
            ' Dor, J. Tickner, fkzd, Gabe, and any one who has contacted us with ideas or words of motivation!'
          }
        ]
      }
    },
    head () {
      return {
        title: 'About | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Learn more about the Mass Effect 5e creators and contributors.' }
        ]
      }
    },
    layout: 'dark'
  }
</script>
