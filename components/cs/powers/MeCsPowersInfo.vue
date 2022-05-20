<template>
  <v-card-text>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Casting Time:</span>
      <me-power-casting-time :mechanic="item" />
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Duration:</span>
      <me-power-duration :mechanic="item" />
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Range/AoE:</span>
      <me-power-range :mechanic="item" />
    </div>
    <div class="text-caption">
      <span class="font-weight-bold pr-1">Primes/Detonates:</span>
      <me-power-primes-detonates :mechanic="item" />
    </div>
    <div v-if="reaction">
      * - <me-html v-if="!loading" :content="reaction" inline classes="text-caption" />
    </div>
    <me-hr size="2" />
    <div class="mt-1">
      <me-html v-if="!loading" :content="html" :classes="'text-caption'" />
    </div>
    <div class="text-caption mt-1">
      <div class="font-weight-bold">
        Advancements
      </div>
      <div v-for="opt in advancements" :key="opt.id" class="mb-1 mx-n2">
        <v-card :outlined="opt.id === selectedAdvancement" flat>
          <div class="pa-2">
            <v-badge tile :value="opt.id === selectedAdvancement" content="Selected" offset-x="60" offset-y="2">
              <span class="font-weight-medium font-italic">> {{ opt.name }}.</span>
              <me-html :content="opt.text" inline :classes="'text-caption'" />
            </v-badge>
          </div>
        </v-card>
      </div>
    </div>
  </v-card-text>
</template>

<script>

export default {
  name: 'MeCsPowerSelectCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    html: {
      type: String,
      required: true
    },
    advancements: {
      type: Array,
      default: () => []
    },
    selectedAdvancement: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    reaction () {
      return this.item.castingTime.reaction || this.item.altCasting?.find(i => i.unit === 'reaction')?.reaction
    }
  },
  watch: {
    html () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 10)
    }
  }
}
</script>
