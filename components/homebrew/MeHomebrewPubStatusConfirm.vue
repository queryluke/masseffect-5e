<template>
  <div>
    <div v-if="changeTo === 'development'">
      <div class="text-subtitle-1">
        Are you sure you want to change this homebrew's status to <span class="info--text">Development</span>?
      </div>
      <div class="mt-3">
        <div>
          Doing so will result in the following:
        </div>
        <ol>
          <li>Your item will appear in the community homebrew list.</li>
          <li>Community members will be able to add your homebrew to their collection and use it on their characters.</li>
          <li>You will NOT be able to change this item back to the private status.</li>
          <li>You can only delete the item if it is not being used by any other accounts.</li>
        </ol>
      </div>
    </div>
    <div v-if="changeTo === 'published'">
      <div class="text-subtitle-1">
        Are you sure you want to change this homebrew's status to <span class="success--text">Published</span>?
      </div>
      <div>
        <p>
          Doing so will result in the following:
        </p>
        <ol>
          <li>Your item will appear in the community homebrew list.</li>
          <li>Community members will be able to add your homebrew to their collection and use it on their characters.</li>
          <li>Community members will be able to up-vote your creation.</li>
          <li>You will NOT be able to make any edits to this item. Instead, you will need to make a copy of it.</li>
          <li>You will NOT be able to change this item back to the private or development status.</li>
          <li>You can only delete the item if it is not being used by any other accounts.</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewPubStatusConfirm',
  props: {
    changeTo: {
      type: String,
      default: ''
    }
  }
}
</script>
