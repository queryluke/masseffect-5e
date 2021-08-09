<template>
  <v-row no-gutters>
    <v-col cols="3">
      <v-avatar tile size="65">
        <v-img :src="characterImage" contain />
      </v-avatar>
    </v-col>
    <v-col cols="9">
      <v-row align="center">
        <v-col cols="10">
          <div class="text-truncate text-h6">
            <small>
              {{ characterName }}
            </small>
          </div>
        </v-col>
        <v-col cols="2">
          <v-menu offset-y left>
            <template #activator="{ on, attrs }">
              <v-icon
                size="20"
                v-bind="attrs"
                v-on="on"
              >
                mdi-cog
              </v-icon>
            </template>
            <v-list dense>
              <v-list-item :to="`/characters/builder?id=${cid}`" nuxt>
                <v-list-item-icon>
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-list-item to="/character-builder" nuxt>
                <v-list-item-icon>
                  <v-icon>
                    mdi-home
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>Character List</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <div class="text-caption text-truncate blue-grey--text text--lighten-3 mt-n5">
        <small>
          {{ identString }}
        </small>
      </div>
      <div class="text-caption mt-n1">
        {{ $t('level_nth', {nth: $t(`ordinal_numbers[${level}]`)}) }}
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
