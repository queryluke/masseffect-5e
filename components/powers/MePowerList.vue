<template>
  <me-expansion-list
    :items="items"
    :headers="headers"
    :type="model"
  >
    <template #[`header.expanded`]="{ item }">
      <me-item-title
        :title="item.name"
        avatar
        :avatar-src="require(`~/assets/images/powers/${item.type}.svg`)"
      />
    </template>
    <template #[`header.level`]="{ item }">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-avatar size="30" class="my-n2">
            <v-img :src="require(`~/assets/images/powers/${item.type}.svg`)" />
          </v-avatar>
        </v-col>
        <v-col clas="auto">
          <me-power-level :level="item.level" :class="$vuetify.breakpoint.smAndDown ? 'pl-2' : 'pl-9'" />
        </v-col>
      </v-row>
    </template>
    <template #[`header.name`]="{ item }">
      <strong>
        {{ item.name }}
      </strong>
    </template>
    <template #[`header.duration`]="{ item }">
      <me-power-duration :mechanic="item.mechanics[0]" abbr />
    </template>
    <template #[`header.range`]="{ item }">
      <me-power-range :mechanic="item.mechanics[0]" />
    </template>
    <template #[`header.attack`]="{ item }">
      <me-power-attack :mechanic="item.mechanics[0]" abbr />
    </template>
    <template #[`header.effect`]="{ item }">
      <me-power-effect :tags="item.tags" abbr />
    </template>
    <template #body="{ item }">
      <me-power-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
import { ListPageHelpers } from '~/mixins/list_page/ListPageHelpers'

export default {
  name: 'MePowerList',
  mixins: [ListPageHelpers],
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      model: 'powers'
    }
  }
}
</script>
