<template lang="pug">
  v-footer(height="auto" dark id="mainFooter")
    v-card(flat tile style="background-color: #000000" width="100%").text-xs-center
      v-card-text
        p.title Contact Us: #[a(mailto="info@n7.world") info@n7.world]
        p.body-1.ma-0 #[strong Disclaimer]
        p.caption.ma-0.
          This Homebrew supplement is not sanctioned by or affiliated with #[a(href="https://www.ea.com" target="_blank") Electronic Arts Inc],
          #[a(href="http://www.bioware.com/en/" target="_blank") BioWare],
          #[a(href="http://company.wizards.com/" target="_blank") Wizards of the Coast], or any other rights-holding company or entity.
        p.caption.ma-0.
          This conversion of the #[a(href="http://dnd.wizards.com/" target="_blank") Dungeon's and Dragons 5th Ed] is licensed under
          #[a(href="https://github.com/queryluke/masseffect-5e/blob/master/LICENSE.txt" target="_blank") GNU General Public License v3.0]
        p.caption.ma-0.mb-2.
          Except where otherwise noted, images on this site are from the #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank") Mass Effect Wikia]
          and are licensed under a #[a(href="http://creativecommons.org/licenses/by/4.0/" target="_blank") Creative Commons Attribution 4.0 International license].
        div This homebrew is licensed under GPL-3.0
        div © Mass Effect 5e {{ new Date().getFullYear() }}
</template>

<style>
  #mainFooter a {
    color: #4FC3F7;
  }
</style>