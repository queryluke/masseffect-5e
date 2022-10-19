<template>
  <v-card-actions>
    <v-btn color="primary" :loading="saving" @click="$emit('save')">
      Save
    </v-btn>
    <v-spacer />
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          :color="statusColor"
          outlined
          dark
          v-bind="attrs"
          v-on="on"
        >
          Status: {{ publicationStatus }}
          <v-icon right>
            mdi-menu-down
          </v-icon>
        </v-btn>
      </template>
      <v-list />
    </v-menu>
    <v-btn icon color="primary" @click="showHelp = true">
      <v-icon>
        mdi-help-circle
      </v-icon>
    </v-btn>
    <me-standard-dialog :shown="showHelp" @close="showHelp = false">
      <template #title>
        Publication Status
      </template>
      <p>
        The homebrew system has 3 types of publication statuses: <strong>Private</strong>, <strong>Development</strong>, and <strong>Published</strong>.
      </p>
      <div class="text-subtitle-1 error--text">
        Private
      </div>
      <p>
        A homebrew item in the <span class="error--text">private</span> status can only be seen and used by you. However, if you
        use a private homebrew item on a character in the online character sheet, anyone who views that character will
        be able to see elements of the homebrew item.
      </p>
      <div class="text-subtitle-1 info--text">
        Development
      </div>
      <p>
        A homebrew item in the <span class="info--text">Development</span> status can be seen and used by anyone with
        an account, but it cannot be up or down voted. The purpose of this status is to get community feedback on your
        creation, but still be able to make edits based on playtesting or critiques. People who add homebrew that is in
        <span class="info--text">Development</span> will receive a warning that the content could change without warning.
      </p>
      <div class="text-subtitle-1 success--text">
        Published
      </div>
      <p>
        A homebrew item in the <span class="success--text">Published</span> status can be seen and used by anyone with
        an account as well as up and down voted. <strong>Most importantly</strong>, you will <strong>NOT</strong> be
        able to make further edits to the item. Instead, you will need to make a copy of the item and give it a new name.
        Votes and usage statistics will not transfer from one version to the next.
      </p>
      <p>
        This is to prevent instances of people deleting or changing content which can disrupt others' games.
        In the future, we will work on a more streamlined process to request wording changes (but not mechanic changes) for
        published content (i.e. for typos or clarifications) and/or for the removal on homebrew. For now, if you would
        like a typo or clarification fixed for one of your published items, please submit a
        <a href="https://forms.gle/JtGQqS9KxVFQGtAq7">bug report</a>. But note, it could take up to 1 week to process your request.
      </p>
    </me-standard-dialog>
  </v-card-actions>
</template>

<script>
export default {
  name: 'MeHomebrewEditorActions',
  props: {
    publicationStatus: {
      type: String,
      default: 'private'
    },
    saving: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showHelp: false
    }
  },
  computed: {
    statusColor () {
      return {
        private: 'error',
        campaign: 'warning',
        develop: 'info',
        public: 'success'
      }[this.publicationStatus]
    }
  }
}
</script>
