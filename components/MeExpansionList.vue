<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="item in items"
      :key="item.id"
    >
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-slide-x-transition leave-absolute hide-on-leave>
            <span v-if="open" key="1">
              <slot name="header.expanded" :item="item">
                <p class="text-h6 text-md-h4 mb-0">
                  {{ item.name }}
                </p>
              </slot>
            </span>
            <v-row v-else no-gutters>
              <slot v-for="header in headers" :name="`header.${header.key}.col`">
                <v-col
                  :key="header.key"
                  :cols="cols(header)"
                  :sm="sm(header)"
                  :md="md(header)"
                  :lg="lg(header)"
                  :xl="xl(header)"
                  :class="header.classes"
                >
                  <slot :name="`header.${header.key}`" :item="item">
                    {{ item[header.key] }}
                  </slot>
                </v-col>
              </slot>
            </v-row>
          </v-slide-x-transition>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot name="body" :item="item">
          <div v-if="item.html" class="text-body-2">
            <me-html :content="item.html" />
          </div>
        </slot>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'MeExpansionList',
  props: {
    headers: {
      type: Array,
      default: () => {
        return []
      }
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    cols (header) {
      return header.cols || 12
    },
    sm (header) {
      return header.sm || this.cols(header)
    },
    md (header) {
      return header.md || this.sm(header)
    },
    lg (header) {
      return header.lg || this.md(header)
    },
    xl (header) {
      return header.xl || this.lg(header)
    }
  }
}
</script>
