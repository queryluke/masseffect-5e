<template>
  <me-expansion-list
    :headers="headers"
    :items="items"
  >
    <template v-slot:header.expanded="{ item }">
      <v-row align-content="start" justify="start">
        <v-col cols="auto">
          <v-avatar :size="$vuetify.breakpoint.smAndDown ? 35 : 45">
            <v-img :src="`/images/powers/${item.type}.svg`" />
          </v-avatar>
        </v-col>
        <v-col cols="auto">
          <p class="text-h6 text-md-h4 mb-0">
            {{ item.name }}
          </p>
        </v-col>
      </v-row>
    </template>
    <template v-slot:header.level="{ item }">
      <v-avatar size="30">
        <v-img :src="`/images/powers/${item.type}.svg`" />
      </v-avatar>
      <me-power-level :item="item" />
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
      <me-bookmark v-if="bookmarkable" type="power" :item="item" />
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
  data () {
    return {
      padding: 'pt-2'
    }
  },
  computed: {
    headers () {
      return this.$store.getters['config/powerHeaders']
    }
  }
}
</script>
