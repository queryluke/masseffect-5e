<template>
  <div />
  <!--
  <v-container v-if="!$fetchState.pending">
    <me-page-title />
    <v-row>
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedClasses"
          :items="classes"
          label="Filter by class availability"
          multiple
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedTypes"
          :items="types"
          label="Filter by power type"
          multiple
        />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="selectedCardOption"
          :items="cardOptions"
          label="Card Options"
          hint="Double sided will print the advanced options on the back, allowing smaller cards"
          persistent-hint
        />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="selectedPrintOption"
          :items="printOptions"
          label="Print Options"
          hint="Auto if your printer can print double-sided. Manual if you need to reload the printer"
          persistent-hint
        />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-checkbox
          v-if="selectedCardOption === 'single'"
          v-model="back"
          label="Include standard back?"
        />
      </v-col>
    </v-row>
    <div id="power-preview">
      <div v-for="(c, i) in chunked" :key="i">
        <div class="power-page__print">
          <v-row>
            <div v-for="power in c" :key="power.id">
              <me-power-print-front :power="power" :card-option="selectedCardOption" :class="selectedCardOption" class="power-card__print" />
            </div>
            <div class="hr page-indicator" />
            <div v-if="selectedPrintOption === 'auto' && (selectedCardOption === 'double' || back)" class="power-page__print">
              <v-row>
                <div v-for="power in reversedChunks[i]" :key="power.id">
                  <me-power-print-back :power="power" :card-option="selectedCardOption" :class="selectedCardOption" class="power-card__print" />
                </div>
              </v-row>
            </div>
            <div v-if="selectedPrintOption === 'auto' && (selectedCardOption === 'double' || back)" class="hr page-indicator" />
          </v-row>
        </div>
      </div>
      <template v-if="selectedPrintOption === 'manual' && (selectedCardOption === 'double' || back)">
        <div
          v-for="(c, i) in reversedChunks"
          :key="`back-${i}`"
          class="power-card__print"
        >
          <v-row :justify-end="selectedPrintOption === 'manual'">
            <div v-for="power in c" :key="power.id">
              <me-power-print-back :power="power" :card-option="selectedCardOption" :class="selectedCardOption" class="power-card__print" />
            </div>
          </v-row>
          <div class="hr page-indicator" />
        </div>
      </template>
    </div>
  </v-container>
  -->
</template>

<script>
export default {
  /*
  async fetch () {
    this.$store.commit('pageTitle', 'Printable Power Cards')
    this.powers = await this.$store.dispatch('FETCH_DATA', 'powers')
  },
  data () {
    return {
      classes: ['Adept', 'Engineer', 'Infiltrator', 'Sentinel', 'Soldier', 'Vanguard'],
      selectedClasses: [],
      types: ['Biotic', 'Tech', 'Combat'],
      selectedTypes: [],
      cardOptions: [
        { text: 'Single Sided', value: 'single' },
        { text: 'Double Sided', value: 'double' }
      ],
      selectedCardOption: 'single',
      printOptions: [
        { text: 'Auto', value: 'auto' },
        { text: 'Manual', value: 'manual' }
      ],
      selectedPrintOption: 'auto',
      back: false,
      powers: []
    }
  },
  computed: {
    filtered () {
      let data = this.powers
      if (this.selectedClasses.length > 0) {
        data = data.filter((power) => {
          for (const c of this.selectedClasses.map(sc => sc.toLowerCase())) {
            if (power.availableClasses.includes(c)) {
              return power
            }
          }
        })
      }
      if (this.selectedTypes.length > 0) {
        data = data.filter(power => this.selectedTypes.map(t => t.toLowerCase()).includes(power.type))
      }
      return data
    },
    chunked () {
      const chunks = []
      const powers = this.filtered
      const numpowers = powers.length
      const chunkSize = this.selectedCardOption === 'single' ? 4 : 9
      for (let i = 0; i < numpowers; i += chunkSize) {
        const chunk = powers.slice(i, i + chunkSize)
        while (chunk.length < chunkSize) {
          chunk.push({ id: 'spacer' })
        }
        chunks.push(chunk)
      }
      return chunks
    },
    reversedChunks () {
      const chunks = this.chunked
      const rowSize = this.selectedCardOption === 'single' ? 2 : 3
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
      title: 'power Cards | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Printable power Cards for Mass Effect 5e' }
      ]
    }
  }
  */
}
</script>

<style lang="scss">

  @page {
    size: A4
  }

  #power-preview {
    width: 8.5in;
    margin: auto;
  }

  .power-page__print {
    margin: .25in;

    $biotic-color: #6467b9;
    $tech-color: #d98300;
    $combat-color: #d42620;

    .power-card__print {
      float:left;
      overflow:hidden;
      page-break-after: always;
      page-break-inside: avoid;
      padding: 0.1in;
      border-radius: 10px;

      &.single {
        font-size:10px;
        width:3.5in;
        height:5in;
        margin: .25in;

        .power-tags {
          height: 22px
        }
      }

      &.double {
        font-size: 6pt;
        width:2.5in;
        height:3.5in;
        margin: 0.08333in;

        .power-text {
          text-align: justify;
        }

        .power-tags {
          height: 15px;
        }
      }

      .v-card {
        border-radius: 5px;
      }

      .power-text p {
        margin-bottom: 3px;
      }

      .aoe-icon {
        width: 15px;
        height: 15px;
      }

      label {
        text-transform: uppercase;
      }

      .power-info {
        border: 5px solid black;
        border-right: none;
        border-left: none;
      }

      .power-tags {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 2px;
      }
    }

    .biotic-card {
      background-color: $biotic-color;

      .power-info {
        border-color: $biotic-color;
      }
      label {
        color: $biotic-color;
      }
    }

    .tech-card {
      background-color: $tech-color;

      .power-info {
        border-color: $tech-color;
      }
      label {
        color: $tech-color;
      }
    }

    .combat-card {
      background-color: $combat-color;

      .power-info {
        border-color: $combat-color;
      }
      label {
        color: $combat-color;
      }
    }

    .gen-card {
      background-color: black;
    }
  }

  @media print {
    .sc--page {
      margin: auto;
    }
    .container {
      padding: 0;
    }
    .power-page__print {
      width: 8.5in;
      height: 11in;
      margin: 0;
      padding: .25in;
      page-break-inside: avoid;
    }
    .v-content {
      padding: 0 !important;
    }
    .v-toolbar, .options, .page-indicator {
      display: none;
    }
    .application.theme--light {
      background-color: #fff;
    }
  }

</style>
