<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="item in items"
      :key="item.id"
    >
      <v-expansion-panel-header>
        <template #default="{ open }">
          <v-slide-x-transition leave-absolute hide-on-leave>
            <span v-if="open" key="1">
              <slot name="header.expanded" :item="item">
                <me-item-title :title="item.name" />
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
        <div v-if="showBar">
          <me-hr color="black" :size="1" />
          <v-row justify="space-between">
            <v-col>
              <me-bookmark v-if="bookmarkable" :type="type" :item="item" />
            </v-col>
            <v-col class="text-right">
              <me-permalink v-if="linkable" :item-id="item.id" :type="type" />
            </v-col>
          </v-row>
        </div>
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
    },
    type: {
      type: String,
      default: ''
    },
    bookmarkable: {
      type: Boolean,
      default: true
    },
    linkable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showBar () {
      return this.linkable || this.bookmarkable
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
