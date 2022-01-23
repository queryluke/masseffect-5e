<template>
  <div v-if="hasValues">
    <div class="d-flex align-center">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <div v-bind="attrs" class="d-flex justify-center align-center" style="height: 18px" v-on="on">
            <v-icon v-if="item.subIcon" :color="item.subIconColor" style="z-index: 1; position: absolute" size="18">
              {{ item.subIcon }}
            </v-icon>
            <v-icon :color="item.iconColor" :title="item.title" size="18">
              {{ item.icon }}
            </v-icon>
          </div>
        </template>
        <span>{{ item.title }}</span>
      </v-tooltip>
      <div class="text-caption d-flex pl-1 flex-wrap">
        <span v-for="(text, index) of item.text" :key="`text-${index}`" class="pl-1">
          <v-tooltip v-if="text.note" bottom>
            <template #activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                {{ text.text }}{{ item.text.length > index + 1 ? ',' : '' }}
              </div>
            </template>
            <span>{{ text.note }}</span>
          </v-tooltip>
          <span v-else>
            {{ text.text }}{{ item.text.length > index + 1 ? ',' : '' }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasValues () {
      return this.item.text.length > 0 || this.item.special.length > 0
    }
  }
}
</script>
