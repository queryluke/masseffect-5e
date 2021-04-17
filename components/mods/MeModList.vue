<template>
  <me-expansion-list
    :items="items"
    model="mods"
  >
    <template #[`header.expanded`]="{ item }">
      <me-mod-title :item="item" />
    </template>
    <template #[`header.name`]="{ item }">
      <div class="font-weight-bold" :class="textColor(item.rarity)">
        {{ item.name }}
      </div>
      <small>
        {{ $t(`mod_types.${item.type}`) }}
      </small>
    </template>
    <template #[`header.placement`]="{ item }">
      {{ $t(`mod_placements.${item.placement}`) }}
    </template>
    <template #[`header.notes`]="{ item }">
      {{ tagsText(item.tags) }}
    </template>
    <template #[`header.availability`]="{ item }">
      <me-mod-availability :item="item" />
    </template>
    <template #[`header.cost`]="{ item }">
      {{ item.cost | groupDigits(',') }}
    </template>
    <template #body="{ item }">
      <me-mod-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>

export default {
  name: 'MeModList',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    textColor (rarity) {
      return this.$store.getters['config/rarityTextColor'](rarity)
    },
    tagsText (tags) {
      return this.$t(`lists.comma_list[${tags.length}]`, tags.map(i => this.$t(`tags.${i}`)))
    }
  }
}
</script>
