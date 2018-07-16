<template>
  <div>
    <span v-if="spell.concentration">
      <span v-if="!verbose">
        <v-avatar color="black" size="18" alt="concentration">
          <span class="white--text">C</span>
        </v-avatar>
      </span>
      <span v-else>Concentration, up to</span> {{ spell.duration }}
    </span>
    <span v-else>
      {{ spell.duration }}
    </span>
  </div>
</template>

<script>
  export default {
    props: ['spell', 'verbose']
  }
</script>