<template>
  <v-row>
    <v-col cols="8">
      <slot name="title" />
    </v-col>
    <v-col class="text-center">
      <slot />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MeCbAbilityLineItem'
}
</script>
