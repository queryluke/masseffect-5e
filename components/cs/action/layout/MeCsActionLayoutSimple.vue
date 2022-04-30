<template>
  <div>
    <div class="d-flex align-center">
      <slot name="icon" />
      <v-card flat color="transparent">
        <div class="mb-n1 text-body-1">
          <small class="text-truncate font-weight-bold">
            <slot name="name" />
          </small>
        </div>
      </v-card>
    </div>
    <div>
      <slot name="shortDesc" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeCsActionLayoutSimple'
}
</script>
