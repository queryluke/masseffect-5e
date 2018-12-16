<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Encounter Builder (sort of...)
    p.
      Though we're eventually planning to create our own encounter creation system. In the meantime, we encourage everyone
      to use the great tool created by #[a(href="http://kobold.club/fight/#/encounter-builder" target="_blank") Kobold CLub]. Use the
      following instructions to import the Mass Effect 5e Bestiary into the site's catalog of monsters.
    v-layout(row wrap)
      v-flex(xs12 sm6 lg7)
        ol.subheading
          li Head over to #[a(href="http://kobold.club/fight/#/encounter-builder" target="_blank") Kobold Club].
          li In the filters section (upper-left), click on the "Manage Content" button.
          li In the dialog box that appears, enter the following
            ul
              li #[strong Name]: Mass Effect 5e
              li #[strong URL or ID]: https://docs.google.com/spreadsheets/d/1-5tAUUiXXMp5K1dRDIgxtgNIH16XLDbrRv65D70U2wg
          li Click the blue "Add" button
        p.subheading.mt-3.
          Now, all of the Mass Effect bestiary mosters are available in Kobold Club's encounter building tool.
      v-flex(xs12 sm6 lg5)
        v-alert(:value="true" type="info").
          Thanks to RexThePig for creating the #[a(href="https://docs.google.com/spreadsheets/d/1-5tAUUiXXMp5K1dRDIgxtgNIH16XLDbrRv65D70U2wg/" target="_blank" class="white--text") Mass Effect 5e Bestiary spreadsheet]!
</template>

<script>
  export default {
    head () {
      return {
        title: 'Encounter Builder - For GMs | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Import the Mass Effect 5e Bestiary into Kobold Club' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
