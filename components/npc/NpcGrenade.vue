<template>
  <div>
    <p>
      <strong>
        <em class="mr-1">
          {{ item.name }} ({{ profBonus }}/day).
        </em>
      </strong>
      <me-html :content="item.html" />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          name: '',
          html: ''
        }
      }
    },
    profBonus: {
      type: Number,
      default: 2
    }
  }
}
</script>
