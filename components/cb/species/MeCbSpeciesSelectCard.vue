<template>
  <v-card outlined flat>
    <div class="d-flex justify-space-between">
      <div style="width: 100px">
        <v-img :src="item.bodyImg" contain />
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
      <v-btn v-if="item.id !== 'custom'" text plain :to="`/species/${item.id}`" target="_blank">
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
        @click="select(item.id)"
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
              <v-btn x-small :disabled="currentValue === option.selection" @click="select(option.selection)">
                {{ currentValue === option.selection ? 'Selected' : 'Select' }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'MeCbSpeciesSelectCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    currentValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showOptions: false
    }
  },
  computed: {
    species () {
      return this.$store.getters.getData('species')
    },
    isCurrent () {
      return this.item.id === this.currentValue
    },
    itemVariants () {
      return this.species.filter(i => i.type === 'variant' && i.species === this.item.id)
    },
    itemSubspecies () {
      return this.item.subspecies ? this.species.filter(i => i.type === 'subspecies' && i.species === this.item.id) : []
    },
    hasVariantsOrSubspecies () {
      return this.itemVariants.length > 0 || this.itemSubspecies.length > 0
    },
    optionsList () {
      const options = []
      // deal w/ subspecies
      if (this.itemSubspecies.length) {
        for (const sub of this.itemSubspecies) {
          options.push({
            subtitle: sub.name,
            title: this.item.name,
            selection: sub.id
          })
        }
      } else {
        options.push({
          subtitle: '',
          title: this.item.name,
          selection: this.item.id
        })
      }
      // deal w/ variant
      for (const variant of this.itemVariants) {
        if (variant.subspecies) {
          const variantSubspecies = this.species.filter(i => i.type === 'subspecies' && i.species === variant.id)
          for (const subvar of variantSubspecies) {
            options.push({
              subtitle: subvar.name,
              title: variant.name,
              selection: subvar.id
            })
          }
        } else {
          const ident = variant.name.toLowerCase().includes(this.item.name.toLowerCase())
          const subtitle = ident ? 'Variant' : `Variant: ${this.item.name}`
          const title = ident ? this.item.name : variant.name
          options.push({
            subtitle,
            title,
            selection: variant.id
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
      const subText = this.itemSubspecies.length > 0
        ? this.itemSubspecies.length > 1
          ? `${this.itemSubspecies.length} species options`
          : '1 subspecies'
        : null
      return varText && subText ? `${subText}, ${varText}` : `${varText || ''}${subText || ''}`
    }
  },
  methods: {
    select (id) {
      this.$emit('selectSpecies', id)
    }
  }
}
</script>
