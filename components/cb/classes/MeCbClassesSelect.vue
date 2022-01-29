<template>
  <div>
    <div v-if="selectedKlasses.length === 0 || addingClass">
      <me-tpg s="h3" class="text-center">
        Choose a Class
      </me-tpg>
      <div v-if="selectedKlasses.length > 0" class="d-flex justify-center mb-2">
        <v-btn color="error" small @click="addingClass = false">
          Cancel
        </v-btn>
      </div>
      <me-cb-classes-add-new @added-class="addingClass = false" />
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <template v-for="(item, index) in selectedKlasses">
            <div :key="`subheader${index}`" class="d-flex justify-center">
              <v-subheader v-if="index < 2">
                {{ index === 0 ? 'Starting Class' : 'Multiclasses' }}
              </v-subheader>
            </div>
            <me-cb-class-card :key="`klassCard${index}`" :klass-index="index" />
          </template>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn
            v-if="selectedKlasses.length < klassesList.length && level !== 20"
            color="primary"
            @click="addingClass = true"
          >
            Add New Class
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character/klasses')
export default {
  name: 'MeCbClassesSelect',
  data () {
    return {
      addingClass: false
    }
  },
  computed: {
    ...mapGetters(['selectedKlasses', 'klassesList', 'level'])
  }
}
</script>
