<template lang="pug">
  v-card.elevation-0.transparent
    v-card-text
      slot(name="description")
      v-list
        v-subheader Mass Effect Playthroughs
        v-list-tile(avatar v-for="(pt, id) of person.games" v-bind:key="id")
          v-list-tile-content
            v-layout(row)
              v-flex
                img(:src="meLogos[id].image" alt="meLogos[id].alt" height="40px")
              v-flex
                v-avatar(size="40" tile v-for="c in pt" v-bind:key="c")
                  img(:src="`/images/classes/${c}.png`" alt="`${c} symbol`")
        v-divider
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      meLogos: {
        me1: {
          image: 'https://vignette.wikia.nocookie.net/masseffect/images/8/86/MELogo.png/revision/latest?cb=20110304183233',
          alt: 'Mass Effect Logo'
        },
        me2: {
          image: 'https://vignette.wikia.nocookie.net/masseffect/images/0/01/ME2Logo.png/revision/latest/scale-to-width-down/639?cb=20090319203459',
          alt: 'Mass Effect 2 Logo'
        },
        me3: {
          image: 'https://vignette.wikia.nocookie.net/masseffect/images/e/e5/ME3Logo.png/revision/latest/scale-to-width-down/639?cb=20110425122702',
          alt: 'Mass Effect 3 Logo'
        }
      }
    }
  }
}
</script>
