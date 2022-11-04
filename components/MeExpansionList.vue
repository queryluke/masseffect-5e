<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(item, index) in items"
      :key="item.id"
    >
      <v-expansion-panel-header>
        <template #default="{ open }">
          <v-slide-x-transition leave-absolute hide-on-leave>
            <span v-if="open" key="1">
              <slot name="header.expanded" :item="item" :index="index">
                <me-item-title :title="item.name" />
              </slot>
              <span v-if="item.homebrew" class="text-caption">
                <em>by {{ item.homebrew.createdBy }}</em>
              </span>
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
                  <span v-if="header.key === 'name'" :index="index" :item="item">
                    <v-badge :value="!!item.homebrew" dot inline>
                      <slot name="header.name" :item="item" :index="index">
                        {{ item[header.key] }}
                      </slot>
                    </v-badge>
                    <div>
                      <slot name="header.name.subtitle" :item="item" />
                    </div>
                  </span>
                  <slot v-else :name="`header.${header.key}`" :item="item" :index="index">
                    {{ item[header.key] }}
                  </slot>
                </v-col>
              </slot>
            </v-row>
          </v-slide-x-transition>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot name="body" :item="item" :index="index">
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
              <me-permalink v-if="linkable" :item-id="item.id" :type="type" :homebrew="!!item.homebrew" :target="newWindow ? '_blank' : '_self' " />
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
    },
    newWindow: {
      type: Boolean,
      default: false
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
