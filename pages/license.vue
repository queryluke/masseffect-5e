<template>
  <v-container>
    <h2 class="text-h2">
      Disclaimers & Licenses
    </h2>
    <p>
      Mass Effect 5e is not sanctioned by or affiliated with <a href="https://www.ea.com" target="_blank">Electronic Arts Inc</a>,
      <a href="http://www.bioware.com/en/" target="_blank">BioWare</a>,
      <a href="http://company.wizards.com/" target="_blank">Wizards of the Coast</a>, or any other rights-holding company or entity.
    </p>
    <p>
      Except where otherwise noted, images on this site are from the <a href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank">Mass Effect Wikia</a>
      and are licensed under a <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 International license</a>.
    </p>
    <p>
      The Mass Effect 5e website is licensed under <a href="https://github.com/queryluke/masseffect-5e/blob/master/LICENSE.txt" target="_blank">GNU General Public License v3.0</a>.
      The Open Game Content contained within the Player's Manual is licensed under <a href="https://data.n7.world/OGL" target="_blank">the Open Game License version 1.0a</a>.
    </p>
  </v-container>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('SET_META', {
      title: this.$t('license_title'),
      description: 'Mass Effect 5e License'
    })
  }
}
</script>
