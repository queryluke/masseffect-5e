<template>
  <div>
    <div class="d-flex justify-space-between">
      <div>
        {{ label }}
      </div>
      <v-btn icon color="primary" @click="showHelp = true">
        <v-icon>
          mdi-help-circle
        </v-icon>
      </v-btn>
    </div>
    <div>
      <client-only>
        <vue-editor v-model="html" :editor-toolbar="customToolbar" @blur="$emit('blur')" />
      </client-only>
    </div>
    <me-standard-dialog :shown="showHelp" @close="showHelp = false">
      <!-- DISTANCE -->
      <me-homebrew-input-legend>
        Distance
      </me-homebrew-input-legend>
      <p>
        Use the following tool to generate the code for distances
      </p>
      <v-row no-gutters>
        <v-col cols="12">
          <v-row align="baseline">
            <v-col cols="12" sm="3">
              <v-text-field v-model="distanceValue" type="number" :label="distanceLabel" />
            </v-col>
            <v-col cols="12" sm="3">
              <v-btn-toggle v-model="distanceSize" color="primary" borderless>
                <v-btn v-for="ds in distanceSizes" :key="ds.key" x-small :value="ds.key">
                  {{ ds.text }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="6" sm="2">
              <v-checkbox v-model="distanceAbbr" label="Abbr?" />
            </v-col>
            <v-col cols="6" sm="2">
              <v-checkbox v-model="distanceAdj" label="Adjective?" />
            </v-col>
            <v-col cols="6" sm="2">
              <v-checkbox v-model="distanceNumOnly" label="# Only?" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-caption">
            Code <small>(click to copy)</small>
          </div>
          <div>
            <v-tooltip
              v-model="distanceCopied"
              top
              :open-on-hover="false"
            >
              <template #activator="{ on, attrs }">
                <code style="cursor: pointer" v-bind="attrs" @click="copyDistance" v-on="on">
                  {{ distanceCode }}
                </code>
              </template>
              <span>Copied</span>
            </v-tooltip>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-caption">
            Result
          </div>
          <div>
            <me-distance
              :length="distance"
              :abbr="distanceAbbr"
              :num-only="distanceNumOnly"
              :adj="distanceAdj"
              :tiny="distanceSize === 'tiny'"
              :large="distanceSize === 'large'"
            />
          </div>
        </v-col>
      </v-row>
      <!-- CONDITIONS -->
      <me-homebrew-input-legend>
        Conditions
      </me-homebrew-input-legend>
      <p>Use the following tool to generate the code for condition tooltips</p>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select v-model="conditionHelper" :items="conditionOptions">
            <template #selection="{ item: selectedCondition }">
              <span class="text-capitalize">
                {{ selectedCondition.startsWith('primed') ? `${selectedCondition.split('-').join(': ')}` : selectedCondition }}
              </span>
            </template>
            <template #item="{ item: conditionOption }">
              <span class="text-capitalize">
                {{ conditionOption.startsWith('primed') ? `${conditionOption.split('-').join(': ')}` : conditionOption }}
              </span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-caption">
            Code <small>(click to copy)</small>
          </div>
          <div>
            <v-tooltip
              v-model="conditionCopied"
              top
              :open-on-hover="false"
            >
              <template #activator="{ on, attrs }">
                <code style="cursor: pointer" v-bind="attrs" @click="copyCondition" v-on="on">
                  {{ conditionCode }}
                </code>
              </template>
              <span>Copied</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </me-standard-dialog>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { Metrics } from '~/mixins/metrics'

export default {
  name: 'MeHomebrewInputDescription',
  mixins: [Metrics],
  props: {
    content: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Description'
    }
  },
  data () {
    return {
      showHelp: false,
      distanceHelper: 10,
      distanceCopied: false,
      distanceSize: 'base',
      distanceAbbr: false,
      distanceAdj: false,
      distanceNumOnly: false,
      conditionHelper: 'blinded',
      conditionCopied: false,
      conditionOptions: [
        'blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'frozen', 'grappled', 'incapacitated', 'indoctrinated',
        'invisible', 'lifted', 'paralyzed', 'poisoned', 'primed-cold', 'primed-fire', 'primed-force', 'primed-lightning', 'primed-necrotic',
        'prone', 'restrained', 'stunned', 'targeting', 'unconscious'
      ],
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ],
      cachedHtml: ''
    }
  },
  computed: {
    html: {
      get () {
        return this.meTagsToHtmlCode(this.content)
      },
      set (value) {
        this.cachedHtml = this.htmlCodeToMeTags(value)
        this.debouncedUpdate()
      }
    },
    distanceCode () {
      const adjustments = [
        (this.distanceAdj ? 'adj' : null),
        (this.distanceAbbr ? 'abbr' : null),
        (this.distanceNumOnly ? 'num-only' : null),
        (this.distanceSize !== 'base' ? this.distanceSize : null)
      ].filter(i => i)
      const adjustmentsText = adjustments.length ? ` ${adjustments.join(' ')}` : ''
      return `<me-distance length="${this.distance}" ${adjustmentsText} />`
    },
    distanceValue: {
      get () {
        return this.distanceHelper
      },
      set (value) {
        const parsed = parseInt(value)
        if (isNaN(parsed)) {
          return
        }
        this.distanceHelper = parsed
      }
    },
    distance () {
      if (this.imperial) {
        return this.distanceHelper
      } else {
        const convertObject = this.metrics.find(i => i.plural === this.distanceLabel.toLowerCase())
        if (convertObject) {
          return convertObject.conversion(this.distanceHelper)
        }
      }
      return 10
    },
    distanceLabel () {
      return this[`${this.distanceSize}DistanceLabel`]
    },
    tinyDistanceLabel () {
      return this.imperial ? 'Inches' : 'Centimeters'
    },
    baseDistanceLabel () {
      return this.imperial ? 'Feet' : 'Meters'
    },
    largeDistanceLabel () {
      return this.imperial ? 'Miles' : 'Kilometers'
    },
    distanceSizes () {
      return this.imperial
        ? [{ key: 'tiny', text: 'in' }, { key: 'base', text: 'ft' }, { key: 'large', text: 'mi' }]
        : [{ key: 'tiny', text: 'cm' }, { key: 'base', text: 'm' }, { key: 'large', text: 'km' }]
    },
    conditionCode () {
      const [id, sub] = this.conditionHelper.split('-')
      return `<me-condition id="${id}"${sub ? ` sub="${sub}"` : ''} />`
    }
  },
  created () {
    this.debouncedUpdate = debounce(() => {
      this.update()
    }, 500)
  },
  methods: {
    copyDistance () {
      navigator.clipboard.writeText(this.distanceCode)
      this.$nextTick(() => {
        setTimeout(() => {
          this.distanceCopied = false
        }, 750)
      })
    },
    copyCondition () {
      navigator.clipboard.writeText(this.conditionCode)
      this.$nextTick(() => {
        setTimeout(() => {
          this.conditionCopied = false
        }, 750)
      })
    },
    update () {
      this.$emit('update', this.cachedHtml)
    },
    meTagsToHtmlCode (text) {
      if (!text) {
        return text
      }
      const regexp = /<(me-(?:condition|distance).*?) \/>/g
      return text.replaceAll(regexp, '&lt;$1&nbsp;/&gt;')
    },
    htmlCodeToMeTags (text) {
      if (!text) {
        return text
      }
      const regexp = /&lt;(me-(?:condition|distance).*?)(?:&nbsp;| )\/&gt;/g
      return text.replaceAll(regexp, '<$1 />')
    }
  }
}
</script>
