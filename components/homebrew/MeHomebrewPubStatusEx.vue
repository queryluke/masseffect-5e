<template>
  <div>
    <p>
      The homebrew system has 3 types of publication statuses: <strong>Private</strong>, <strong>Development</strong>, and <strong>Published</strong>.
    </p>
    <div class="text-subtitle-1 error--text">
      Private
    </div>
    <p>
      A homebrew item in the <span class="error--text">private</span> status can only be discovered by you. However, if you
      use a private homebrew item on a online character sheet and share that sheet, anyone who views that character will
      be able to see it. Additionally, if you share the homebrew with others, they can add it to their collection and use
      it as well.
    </p>
    <div class="text-subtitle-1 info--text">
      Development
    </div>
    <p>
      A homebrew item in the <span class="info--text">Development</span> status can be <em>seen and used</em> by anyone with
      an account, but it cannot be voted upon. The purpose of this status is to get community feedback on your
      creation, but still be able to make edits based on playtesting or critiques. People who add homebrew that is in
      <span class="info--text">Development</span> will receive a warning that the content could change without warning.
    </p>
    <div class="text-subtitle-1 success--text">
      Published
    </div>
    <p>
      A homebrew item in the <span class="success--text">Published</span> status can be seen and used by anyone with
      an account as well as up-voting (a.k.a. "liking"). <strong>Most importantly</strong>, you will <strong>NOT</strong> be
      able to make further edits to the item. Instead, you will need to make a copy of the item and give it a new name.
      Votes and usage statistics will not transfer from one version to the next.
    </p>
    <p>
      This is to prevent instances of people deleting or changing content which can disrupt others' games.
      In the future, we will work on a more streamlined process to request wording changes (but not mechanic changes) for
      published content (i.e. for typos or clarifications) and/or for the removal on homebrew. For now, if you would
      like a typo or clarification fixed for one of your published items, please submit a
      <a href="https://forms.gle/JtGQqS9KxVFQGtAq7">bug report</a>. But note, it could take up to 2 weeks to process your request.
    </p>
    <v-simple-table>
      <thead>
        <tr>
          <td colspan="3">
            Publication Status Chart
          </td>
        </tr>
        <tr>
          <td>
            Status
          </td>
          <td>
            Edited
          </td>
          <td>
            Viewed
          </td>
          <td>
            Deleted
          </td>
          <td>
            Used
          </td>
          <td>
            Voted
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="error--text">
            Private
          </td>
          <td>
            <v-icon color="success">
              mdi-check
            </v-icon>
          </td>
          <td>
            <v-icon color="error">
              mdi-close
            </v-icon>*
          </td>
          <td>
            <v-icon color="success">
              mdi-check
            </v-icon>
          </td>
          <td>
            <v-icon color="error">
              mdi-close
            </v-icon>**
          </td>
          <td>
            <v-icon color="error">
              mdi-close
            </v-icon>
          </td>
        </tr>
        <tr>
          <td class="info--text">
            Development
          </td>
          <td>
            <v-icon color="success">
              mdi-check
            </v-icon>
          </td>
          <td>
            <v-icon color="success">
              mdi-check
            </v-icon>
          </td>
          <td>
            <v-icon color="error">
              mdi-close
            </v-icon>***
          </td>
          <td>
            <v-icon color="success">
              mdi-check
            </v-icon>
          </td>
          <td>
            <v-icon color="error">
              mdi-close
            </v-icon>
          </td>
        </tr>
        <tr>
          <td class="success--text">
            Published
          </td>
          <td>
            <v-icon color="error">
              mdi-close
            </v-icon>
          </td>
          <td>
            <v-icon color="success">
              mdi-check
            </v-icon>
          </td>
          <td>
            <v-icon color="error">
              mdi-close
            </v-icon>***
          </td>
          <td>
            <v-icon color="success">
              mdi-check
            </v-icon>
          </td>
          <td>
            <v-icon color="success">
              mdi-check
            </v-icon>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <div class="text-caption">
      * - visible on shared character sheets or if you shared it with others
    </div>
    <div class="text-caption">
      ** - usable by you and anyone you've shared it with
    </div>
    <div class="text-caption">
      *** - You can delete the item if it is not being used by any other accounts. We will release a new feature at a later date which allows deleting Development and Published content even if they are in use.
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewPubStatusEx'
}
</script>
