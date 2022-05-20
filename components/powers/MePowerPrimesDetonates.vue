<template>
  <span>
    <span v-if="primes" :class="pdCss(primes)">
      {{ $t('primes_text', {type: primes}) }}
    </span>
    <span v-if="primes && detonates" class="mx-1">
      |
    </span>
    <span v-if="detonates" :class="pdCss('detonates')">
      {{ $t('detonates_title') }}
    </span>
    <span v-if="!detonates && !primes">
      -
    </span>
  </span>
</template>

<script>
export default {
  name: 'MePowerCastingTime',
  props: {
    mechanic: {
      type: Object,
      default: () => {
        return {
          primes: false,
          detonates: false
        }
      }
    }
  },
  computed: {
    primes () {
      return this.mechanic.primes
    },
    detonates () {
      return this.mechanic.detonates
    },
    primeTypeText () {
      return this.$store.getters['config/primeTypeText']
    }
  },
  methods: {
    pdCss (string) {
      const mode = this.$vuetify.theme.dark ? 'dark' : 'light'
      return this.primeTypeText[mode][string]
    }
  }
}
</script>
