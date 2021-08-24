<template>
  <div>
    <v-list>
      <template v-for="item in availableClasses">
        <v-list-item :key="item.id" two-line>
          <v-list-item-avatar v-if="$vuetify.breakpoint.smAndUp" tile>
            <v-img :src="require(`~/assets/images/classes/${item.id}.svg`)" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <a :href="`/classes/${item.id}`" target="_blank">
                View class details
              </a>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="primary" @click="addClassToCharacter(item)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  computed: {
    availableClasses () {
      // TODO: enforce multi-classing requirements when classes are redone
      // not worth it to do now because of asari confusion with mc requirements, i.e. asari use CHA but mc req for
      // biotic class is WIS
      return this.classes.filter(i => !this.characterClasses.map(j => j.id).includes(i.id))
    }
  },
  methods: {
    cleanSelectedClass (klass) {
      return {
        // variables to write to the character object for the character sheet
        id: klass.id,
        hitPoints: [klass.hitDie],
        subclass: null,
        hpOverride: false,
        levels: 1
      }
    },
    addClassToCharacter (klass) {
      const tempArr = this.characterClasses.slice()
      const newSelections = []
      for (const profKey in klass.profs) {
        if (klass.profs.has) {
          newSelections.push({
            source: `klass-${klass.id}-1-profs-${profKey}`,
            has: klass.profs[profKey].has,
            type: 'profs',
            subType: profKey
          })
        }
      }
      tempArr.push(this.cleanSelectedClass(klass))
      this.characterClasses = tempArr
      this.$emit('added-class')
    }
  }
}
</script>
