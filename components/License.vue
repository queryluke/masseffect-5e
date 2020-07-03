<template lang="pug">
  div
    p.display-1 Disclaimer
    p.
      Mass Effect 5e is not sanctioned by or affiliated with #[a(href="https://www.ea.com" target="_blank") Electronic Arts Inc],
      #[a(href="http://www.bioware.com/en/" target="_blank") BioWare],
      #[a(href="http://company.wizards.com/" target="_blank") Wizards of the Coast], or any other rights-holding company or entity.
    p.
      Except where otherwise noted, images on this site are from the #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank") Mass Effect Wikia]
      and are licensed under a #[a(href="http://creativecommons.org/licenses/by/4.0/" target="_blank") Creative Commons Attribution 4.0 International license].
    p.
      The Mass Effect 5e website is licensed under #[a(href="https://github.com/queryluke/masseffect-5e/blob/master/LICENSE.txt" target="_blank") GNU General Public License v3.0].
      The Open Game Content contained within the Player's Manual is licensed under the Open Game License version 1.0a below.
    markdown-content(:component="license.vue")
</template>

<script>
export default {
  computed: {
    license () {
      return ''
    }
  }
}
</script>
