<template>
  <me-expansion-list
    :headers="headers"
    :items="items"
    type="powers"
  >
    <template v-slot:header.expanded="{ item }">
      <me-item-title
        :title="item.name"
        avatar
        :avatar-src="`/images/powers/${item.type}.svg`"
      />
    </template>
    <template v-slot:header.level="{ item }">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-avatar size="30" class="my-n2">
            <v-img :src="`/images/powers/${item.type}.svg`" />
          </v-avatar>
        </v-col>
        <v-col clas="auto">
          <me-power-level :item="item" :class="$vuetify.breakpoint.smAndDown ? 'pl-2' : 'pl-9'" />
        </v-col>
      </v-row>
    </template>
    <template v-slot:header.name="{ item }">
      <strong>
        {{ item.name }}
      </strong>
    </template>
    <template v-slot:header.duration="{ item }">
      <me-power-duration :item="item" abbr />
    </template>
    <template v-slot:header.range="{ item }">
      <me-power-range :item="item" />
    </template>
    <template v-slot:header.attack="{ item }">
      <me-power-attack :item="item" abbr />
    </template>
    <template v-slot:header.effect="{ item }">
      <me-power-effect :item="item" abbr />
    </template>
    <template v-slot:body="{ item }">
      <me-power-info :item="item" />
    </template>
  </me-expansion-list>
</template>

<script>
export default {
  name: 'MePowerList',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    bookmarkable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    headers () {
      return this.$store.getters['config/powerHeaders']
    }
  }
}
</script>
