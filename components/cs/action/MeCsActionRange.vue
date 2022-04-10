<template>
  <me-cs-action-stat>
    <template v-if="showTitle" #title>
      Range
    </template>
    <span v-if="!range.long">
      <span v-if="range.short === 0">
        Self
      </span>
      <span v-else-if="range.short === 1">
        Touch
      </span>
      <me-distance v-else :length="range.short" abbr />
    </span>
    <span v-else>
      <span>
        <me-distance :length="range.short" num-only />
      </span>
      <span class="text-caption font-weight-light">
        (<me-distance :length="range.long" num-only />)
      </span>
    </span>
    <template v-if="range.aoe || range.note" #subtitle>
      <div v-if="range.aoe">
        (<span>
          <me-distance :length="range.aoe.size" abbr />
          <v-avatar :size="9" tile style="margin-left: 1px">
            <v-img :src="require(`~/assets/images/aoe/${range.aoe.filename}.svg`)" :alt="$t(`aoe_types.${range.aoe.type}`)" />
          </v-avatar>
        </span>)
      </div>
      <div v-else>
        {{ range.note }}
      </div>
    </template>
  </me-cs-action-stat>
</template>
<script>
export default {
  name: 'MeCsActionRange',
  props: {
    range: {
      type: [Object, Boolean],
      default: false
    },
    layout: {
      type: String,
      default: 'attack'
    }
  },
  computed: {
    showTitle () {
      return !['attack', 'power'].includes(this.layout)
    }
  }
}
</script>
