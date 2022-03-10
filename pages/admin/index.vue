<template>
  <v-container>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item v-for="model in models" :key="model" :to="`admin/${model}`">
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">
                {{ model }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      models: ['weapons']
    }
  }
}
</script>
