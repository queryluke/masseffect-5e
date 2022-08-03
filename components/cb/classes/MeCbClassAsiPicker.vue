<template>
  <me-cb-aspect-card :aspect="aspect" :root-path="`klass/${klass.id}`" :asm-override="asmOverride">
    <template #description>
      {{ $t('abi_feature.feat_text') }}
      <div class="mt-9">
        <v-select v-model="choice" label="Ability Scores or Feat" :items="items" dense />
      </div>
    </template>
  </me-cb-aspect-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/klasses')
export default {
  name: 'MeCbClassAsiPicker',
  props: {
    klassIndex: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      items: [
        { value: 'asi', text: 'Ability Score Increase' },
        { value: 'feat', text: 'Feat' }
      ]
    }
  },
  computed: {
    ...mapGetters(['klasses']),
    klass () {
      return this.klasses[this.klassIndex]
    },
    asmOverride () {
      return { has: !this.choice, value: false }
    },
    mechanic () {
      if (this.choice === 'asi') {
        return {
          type: 'asi-choice',
          options: true,
          selections: 2,
          total: 2,
          max: 2
        }
      } else if (this.choice === 'feat') {
        return {
          type: 'model-choice',
          options: true,
          model: 'feats'
        }
      } else {
        return []
      }
    },
    aspect () {
      // REMINDER: need to load this path into the mechanics
      // Because it's always virtual
      return {
        id: this.level,
        type: 'klass-asi',
        name: this.$t('ability_score_increase_title'),
        subtitle: `${this.$t(`ordinal_numbers[${this.level}]`)} Level`,
        mechanics: [
          this.mechanic
        ]
      }
    },
    choice: {
      get () {
        return this.klass.asi[this.level]
      },
      set (value) {
        this.$store.dispatch('character/selections/BULK_DELETE', `klass/${this.klass.id}/${this.level}/${this.choice}`)
        this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `classes.${this.klassIndex}.asi.${this.level}`, value })
        this.$store.dispatch('character/mechanics/INIT_MECHANICS')
      }
    }
  }
}
</script>
