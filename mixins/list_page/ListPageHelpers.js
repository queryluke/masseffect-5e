import { ListPageHeaders } from '~/mixins/list_page/ListPageHeaders'
import { ListPageFilters } from '~/mixins/list_page/ListPageFilters'

export const ListPageHelpers = {
  mixins: [ListPageHeaders, ListPageFilters],
  methods: {
    textColor (rarity) {
      return this.$store.getters['config/rarityTextColor'](rarity)
    },
    tagsText (tags) {
      return this.$t(`lists.comma_list[${tags.length}]`, tags.map(i => this.$t(`tags.${i}`)))
    }
  }
}
