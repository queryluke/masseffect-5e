<template>
  <div>
    <v-select
      v-model="selectionId"
      :items="selectionItems"
      item-text="name"
      item-value="name"
      return-object
      label="Fighting Style"
      outlined
    />
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      items: [
        {
          name: 'Ambidextrous',
          description: 'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.'
        },
        {
          name: 'Assault',
          description: 'When you make a Burst Fire attack, the DC of the saving throw is 17.'
        },
        {
          name: 'Brawler',
          description: 'Add your proficiency bonus to your melee attack damage rolls.'
        },
        {
          name: 'Carnage',
          description: 'When you roll a 1 or 2 on a damage die for an attack you make with a shotgun, you can reroll the die and must use the new roll.'
        },
        {
          name: 'Close-Quarters Shooter',
          description: 'When making a ranged attack while you are within <me-distance length="5" /> of a hostile ' +
            'creature, you do not have disadvantage on the attack roll. Your ranged attacks ignore half-cover against targets within <me-distance length="30" /> of you.'
        },
        {
          name: 'Defense',
          description: '+1 AC.'
        },
        {
          name: 'The Free Hand',
          description: 'When holding no more than one light, non-two-handed weapon, you gain a +2 bonus to hit with ranged power attacks.'
        },
        {
          name: 'Protection',
          description: 'When a creature you can see attacks a target other than you that is within <me-distance length="5" /> ' +
            'of you, you can use your reaction and expend one barrier tick to impose disadvantage on the attack roll. If the attack ' +
            'hits, the damage is reduced by your barrier tick roll.'
        },
        {
          name: 'Sniper',
          description: 'If no hostile creature is within <me-distance length="30" /> of you, gain +2 to damage rolls on attacks ' +
            'made with a sniper rifle.'
        }
      ]
    }
  },
  computed: {
    selectionItems () {
      return this.items.map((i) => {
        return { ...i, id: this.id }
      })
    },
    selectionIndex () {
      return this.character.fightingStyles ? this.character.fightingStyles.findIndex(i => i.id === this.id) : -1
    },
    selectionId: {
      get () {
        return this.selectionIndex > -1 ? this.character.fightingStyles[this.selectionIndex] : null
      },
      set (value) {
        const currentStyles = [...this.character.fightingStyles]
        if (this.selectionIndex > -1) {
          currentStyles.splice(this.selectionIndex, 1, value)
        } else {
          currentStyles.push(value)
        }
        this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'fightingStyles', value: currentStyles })
      }
    }
  },
  created () {
    if (!this.character.fightingStyles) {
      this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'fightingStyles', value: [] })
    }
  }
}
</script>
