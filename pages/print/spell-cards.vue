<template lang="pug">
  v-content
    v-container(grid-list-md)
      v-layout(row wrap justify-space-around).options
        v-flex(xs12)
          h1.display-1.text-xs-center Spell Cards
        v-flex(xs12 sm6 d-flex)
          v-select(:items="classes" box label="Filter by class availability" multiple v-model="selectedClasses")
        v-flex(xs12 sm6 d-flex)
          v-select(:items="types" box label="Filter by spell type" multiple v-model="selectedTypes")
        v-flex(xs12 sm6 md3 d-flex)
          v-select(:items="cardOptions" box label="Card Options" hint="Double sided will print the advanced options on the back, allowing smaller cards" persistent-hint v-model="selectedCardOption")
        v-flex(xs12 sm6 md3 d-flex)
          v-select(:items="printOptions" box label="Print Options" hint="Auto if your printer can print double-sided. Manual if you need to reload the printer" persistent-hint v-model="selectedPrintOption")
        v-flex(xs12 sm6 md3 d-flex)
          v-checkbox(v-model="back" label="Include Standard back?" v-if="selectedCardOption === 'single'")
    div#spell-preview
      div(v-for="(c, i) in chunked" v-bind:key="i").spell-page__print
        v-layout(row wrap)
          div(v-for="spell in c" v-bind:key="spell.id")
            front-side(v-bind:spell="spell" v-bind:cardOption="selectedCardOption" v-bind:class="selectedCardOption").spell-card__print
        div.hr.page-indicator
        div(v-if="selectedPrintOption === 'auto' && (selectedCardOption === 'double' || back)")
          v-layout(row wrap)
            div(v-for="spell in reversedChunks[i]" v-bind:key="spell.id")
              back-side(v-bind:spell="spell" v-bind:cardOption="selectedCardOption" v-bind:class="selectedCardOption").spell-card__print
          div.hr.page-indicator
      div(v-for="(c, i) in reversedChunks" v-bind:key="`back-${i}`" v-if="selectedPrintOption === 'manual' && (selectedCardOption === 'double' || back)").spell-page__print
        v-layout(row wrap)
          div(v-for="spell in c" v-bind:key="spell.id")
            back-side(v-bind:spell="spell" v-bind:cardOption="selectedCardOption" v-bind:class="selectedCardOption").spell-card__print
        div.hr.page-indicator

</template>

<script>
  import FrontSide from '~/components/spell_cards/FrontSide.vue'
  import BackSide from '~/components/spell_cards/BackSide.vue'
  import spells from '~/static/data/spells.json'

  export default {
    name: 'PrintSpellCards',
    components: {
      FrontSide,
      BackSide
    },
    data () {
      return {
        classes: ['Adept', 'Engineer', 'Infiltrator', 'Sentinel', 'Soldier', 'Vanguard'],
        selectedClasses: [],
        types: ['Biotic', 'Tech', 'Combat'],
        selectedTypes: [],
        cardOptions: [
          {text: 'Single Sided', value: 'single'},
          {text: 'Double Sided', value: 'double'}
        ],
        selectedCardOption: 'single',
        printOptions: [
          {text: 'Auto', value: 'auto'},
          {text: 'Manual', value: 'manual'},
        ],
        selectedPrintOption: 'auto',
        back: false,
        spells
      }
    },
    computed: {
      filtered () {
        let data = this.spells
        if (this.selectedClasses.length > 0) {
          data = data.filter(spell => {
            for (const c of this.selectedClasses.map(sc => sc.toLowerCase())) {
              if (spell.availableClasses.includes(c)) {
                return spell
              }
            }
          })
        }
        if (this.selectedTypes.length > 0) {
          data = data.filter(spell => this.selectedTypes.map(t => t.toLowerCase()).includes(spell.type))
        }
        return data
      },
      chunked () {
        let chunks = []
        const spells = this.filtered
        const numSpells = spells.length
        const chunkSize = this.selectedCardOption === 'single' ? 4 : 9;
        for (let i = 0; i < numSpells; i += chunkSize) {
          chunks.push(spells.slice(i, i + chunkSize));
        }
        return chunks
      },
      reversedChunks () {
        const chunks = this.chunked
        const rowSize = this.selectedCardOption === 'single' ? 2 : 3;
        return chunks.map((chunk) => {
          const reversedChunk = []
          for (let i = 0; i < chunk.length; i += rowSize) {
            const miniChunk = chunk.slice(i, i + rowSize)
            reversedChunk.push(...miniChunk.reverse())
          }
          return reversedChunk
        })
      }
    },
    head () {
      return {
        title: `Spell Cards | Mass Effect 5e`,
        meta: [
          { hid: 'description', name: 'description', content: 'Printable Spell Cards for Mass Effect 5e' }
        ]
      }
    }
  }
</script>

<style lang="scss">

  @page {
    size: A4
  }

  #spell-preview {
    width: 8.5in;
    margin: auto;
  }

  .spell-page__print {
    margin: .25in;


    $biotic-color: #6467b9;
    $tech-color: #d98300;
    $combat-color: #d42620;

    .spell-card__print {
      float:left;
      overflow:hidden;
      page-break-after: always;
      page-break-inside: avoid;
      padding: 0.1in;

      &.single {
        font-size:10px;
        width:3.5in;
        height:5in;
        margin: .25in
      }

      &.double {
        font-size:10px;
        width:2.5in;
        height:3.5in;
        margin: 0.08333in;
      }

      .spell-text p {
        margin-bottom: 3px;
      }

      .aoe-icon {
        width: 15px;
        height: 15px;
      }

      label {
        text-transform: uppercase;
      }

      table {
        width: 100%;
        font-size: 10px;
        border-top: solid 0.05in black;
        border-bottom: solid 0.05in black;

        td {
          width: 50%;
        }
      }
    }

    .biotic-card {
      background-color: $biotic-color;

      table {
        border-color: $biotic-color;
      }
      label {
        color: $biotic-color;
      }
    }

    .tech-card {
      background-color: $tech-color;

      table {
        border-color: $tech-color;
      }
      label {
        color: $tech-color;
      }
    }

    .combat-card {
      background-color: $combat-color;

      table {
        border-color: $combat-color;
      }
      label {
        color: $combat-color;
      }
    }
  }

  @media print {
    .sc--page {
      margin: auto;
    }
    .application.theme--light {
      background-color: #fff;
    }
  }

</style>

