export const MetaHead = {
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: this.$store.getters.metaTitle,
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$store.getters.metaDescription
        },
        ...i18nHead.meta
      ],
      link: [
        ...i18nHead.link
      ]
    }
  }
}
