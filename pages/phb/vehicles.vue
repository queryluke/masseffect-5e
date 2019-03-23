<template lang="pug">
  v-container
    h2.display-1.hidden-sm-and-down Vehicles
    div.text-md-right
      v-btn(to="/phb/rules/vehicles" nuxt outline color="secondary") Vehicle Rules
      v-btn(href="https://goo.gl/forms/C5mi48VXnHw8wrYx1" target="_blank" outline color="secondary") Submit Your Idea
    vehicle-list

</template>

<script>
  import VehicleList from '~/components/vehicle/VehicleList.vue'

  export default {
    components: {VehicleList},
    head () {
      return {
        title: 'Vehicles | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'A list of unique vehicles to use in your Mass Effect 5e game.' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
