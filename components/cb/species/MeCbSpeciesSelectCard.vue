<template>
  <v-card outlined flat>
    <div class="d-flex justify-space-between">
      <div style="width: 100px">
        <v-img :src="item.bodyImg" />
      </div>
      <v-card-text>
        <me-tpg s="h4">
          {{ item.name }}
        </me-tpg>
        <p>{{ item.snippet }}</p>
        <div class="text-overline">
          {{ speciesBreakdown }}
        </div>
      </v-card-text>
    </div>
    <v-card-actions>
      <v-btn text plain :to="`/species/${item.id}`" target="_blank">
        More Details
      </v-btn>
      <v-spacer />
      <v-btn v-if="hasVariantsOrSubspecies" text plain color="primary" @click="showOptions = !showOptions">
        Options
        <v-icon>
          {{ showOptions ? 'mdi-menu-up' : 'mdi-menu-down' }}
        </v-icon>
      </v-btn>
      <v-btn
        v-else
        text
        plain
        color="primary"
        :disabled="isCurrent"
        @click="select({ speciesId: item.id })"
      >
        {{ isCurrent ? 'Selected' : 'Select' }}
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showOptions">
        <v-divider />
        <v-list dense two-line>
          <v-list-item v-for="(option, index) in optionsList" :key="`option-${index}`">
            <v-list-item-content>
              <v-list-item-title class="text-overline">
                {{ option.subtitle }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ option.title }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn x-small :disabled="isCurrentSelection(option.selection)" @click="select(option.selection)">
                {{ isCurrentSelection(option.selection) ? 'Selected' : 'Select' }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  name: 'MeCbSpeciesSelectCard',
  mixins: [CharacterBuilderHelpers],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showOptions: false
    }
  },
  computed: {
    isCurrent () {
      return this.item.id === this.speciesId
    },
    itemVariants () {
      return this.species.filter(i => i.type === 'variant' && i.species === this.item.id)
    },
    itemSubspecies () {
      return this.subspecies.find(i => i.species === this.item.id)
    },
    itemSubspeciesOptions () {
      if (!this.itemSubspecies) {
        return false
      }
      return this.subspeciesOptions.filter(i => i.subspecies === this.itemSubspecies.id)
    },
    hasVariantsOrSubspecies () {
      return this.itemVariants.length > 0 || this.itemSubspeciesOptions.length > 0
    },
    optionsList () {
      const options = []
      // deal w/ subspecies
      if (this.itemSubspeciesOptions) {
        for (const sub of this.itemSubspeciesOptions) {
          options.push({
            subtitle: sub.name,
            title: this.item.name,
            selection: { speciesId: this.item.id, subspeciesId: sub.id }
          })
        }
      }
      // deal w/ variant
      for (const variant of this.itemVariants) {
        const variantSubspecies = this.subspecies.find(i => i.species === variant.id)
        if (variantSubspecies) {
          const variantSubspeciesOptions = this.subspeciesOptions.filter(i => i.subspecies === variantSubspecies.id)
          if (variantSubspeciesOptions.length > 0) {
            for (const subvar of variantSubspeciesOptions) {
              options.push({
                subtitle: subvar.name,
                title: variant.name,
                selection: {
                  speciesId: variant.id,
                  subspeciesId: subvar.id
                }
              })
            }
          }
        } else {
          const ident = variant.name.toLowerCase().includes(this.item.name.toLowerCase())
          const subtitle = ident ? 'Variant' : `Variant: ${this.item.name}`
          const title = ident ? this.item.name : variant.name
          options.push({
            subtitle,
            title,
            selection: { speciesId: variant.id }
          })
        }
      }
      return options
    },
    speciesBreakdown () {
      const varText = this.itemVariants.length > 0
        ? this.itemVariants.length > 1
          ? `${this.itemVariants.length} variants`
          : '1 variant'
        : null
      const subText = this.itemSubspeciesOptions.length > 0
        ? this.itemSubspeciesOptions.length > 1
          ? `${this.itemSubspeciesOptions.length} species options`
          : '1 subspecies'
        : null
      return varText && subText ? `${subText}, ${varText}` : `${varText || ''}${subText || ''}`
    }
  },
  methods: {
    select ({ speciesId = null, subspeciesId = null }) {
      this.$emit('selectSpecies', { speciesId, subspeciesId })
    },
    isCurrentSelection ({ speciesId, subspeciesId }) {
      return this.speciesId === speciesId && this.subspeciesId === subspeciesId
    }
  }
}
</script>
