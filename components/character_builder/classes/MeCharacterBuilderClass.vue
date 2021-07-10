<template>
  <div>
    <div v-if="characterClasses.length === 0 || addingClass">
      <h2 class="text-center mb-3">
        Choose a Class
      </h2>
      <div v-if="characterClasses.length > 0" class="d-flex justify-center mb-2">
        <v-btn color="error" small @click="addingClass = false">
          Cancel
        </v-btn>
      </div>
      <me-character-builder-class-add-new @added-class="addingClass = false" />
    </div>
    <div v-else>
      <div class="d-flex align-center justify-center">
        <me-character-builder-level-tracker style="width: 100%;" />
      </div>
      <v-row>
        <v-col>
          <v-expansion-panels>
            <template v-for="(item, classIndex) in characterClasses">
              <v-subheader v-if="classIndex < 2" :key="`subheader${classIndex}`">
                {{ classIndex === 0 ? 'Starting Class' : 'Multiclasses' }}
              </v-subheader>
              <v-expansion-panel :key="`class${classIndex}`">
                <v-expansion-panel-header>
                  <me-character-builder-class-list-item :class-index="classIndex" />
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col>
                      <v-btn class="mr-2" :to="`/classes/${item.id}`" target="_blank">
                        View Class Details
                      </v-btn>
                    </v-col>
                    <v-col>
                      <me-character-builder-class-level :class-index="classIndex" />
                    </v-col>
                    <v-col v-if="$vuetify.breakpoint.xsOnly" class="text-right">
                      <me-character-builder-class-remove-btn :class-index="classIndex" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <me-character-builder-class-features :class-index="classIndex" />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </template>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn
            v-if="characterClasses.length < classes.length && level !== 20"
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
import { CharacterBuilderHelpers } from '~/mixins/character_builder'
export default {
  mixins: [CharacterBuilderHelpers],
  data () {
    return {
      addingClass: false,
      editingClass: false,
      addBtnColor: {
        back: 'primary',
        text: 'primary--text'
      },
      classHeaders: [
        { label: false, key: 'icon', cols: 2, md: 1, sortable: false, classes: 'd-none d-sm-flex' },
        { label: 'name_title', key: 'name', cols: 6, sm: 7, md: 8, sortable: false },
        { label: false, key: 'remove', cols: 6, sm: 3, sortable: false }
      ]
    }
  }
}
</script>
