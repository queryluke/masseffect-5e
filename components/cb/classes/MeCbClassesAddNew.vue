<template>
  <v-card
    flat
    transparent
    max-width="500px"
    class="mx-auto"
  >
    <v-list>
      <template v-for="item in availableClasses">
        <v-list-item :key="item.id" two-line @click="add(item)">
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
            <v-btn icon color="primary" @click="add(item)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/klasses')
export default {
  name: 'MeCbClassesAddNew',
  computed: {
    ...mapGetters(['selectedKlassesIds', 'klassesList']),
    availableClasses () {
      // TODO: enforce multi-classing requirements when classes are redone
      return this.klassesList.filter(i => !this.selectedKlassesIds.includes(i.id))
    }
  },
  methods: {
    add (klass) {
      const asis = {}
      for (const asiLevel of klass.progression.abi) {
        asis[asiLevel] = null
      }
      const cbKlass = {
        // variables to write to the character object for the character sheet
        id: klass.id,
        hitPoints: [klass.hitDie],
        subclass: null,
        hpOverride: false,
        levels: 1,
        asi: asis
      }
      this.$store.dispatch('character/klasses/ADD_KLASS', cbKlass)
      this.$emit('added-class')
    }
  }
}
</script>
