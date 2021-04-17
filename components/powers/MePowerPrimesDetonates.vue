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
    primes: {
      type: [String, Boolean],
      default: false
    },
    detonates: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
