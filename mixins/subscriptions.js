import { API, graphqlOperation } from 'aws-amplify'
import * as subs from '~/graphql/subscriptions'
// TODO: subscriptions seem to have broken, not fixing since it seems a bit unecessary for bookmarks. Will sort out
// later

export const subscriptions = {
  data () {
    return {
      bookmarkCreateSub: null,
      bookmarkDeleteSub: null
    }
  },
  beforeDestroy () {
    this.unsubscribeAll()
  },
  methods: {
    subscribe (subscriptions) {
      if (!this.$store.getters['auth/isAuthenticated']) {
        return
      }
      for (const sub of subscriptions) {
        const method = `${sub}SubInit`
        if (this[method]) {
          this[method]()
        }
      }
    },
    unsubscribeAll () {
      const subs = ['bookmarkCreateSub', 'bookmarkDeleteSub']
      for (const key of subs) {
        if (this[key]) {
          try {
            this[key].unsubscribe()
          } catch (e) {
            console.warn(e)
          }
          this[key] = null
        }
      }
    },
    bookmarksSubInit () {
      if (this.bookmarkCreateSub === null) {
        this.bookmarkCreateSub = API.graphql(graphqlOperation(subs.onCreateBookmarkByUserId, { userId: this.$store.getters['auth/username'] })).subscribe({
          next: (data) => {
            this.$store.commit('user/ADD_BOOKMARK', data.value?.data?.onCreateBookmarkByUserId)
          },
          error: (error) => {
            console.warn(error)
          }
        })
      }
      if (this.bookmarkDeleteSub === null) {
        this.bookmarkDeleteSub = API.graphql(graphqlOperation(subs.onDeleteBookmarkByUserId, { userId: this.$store.getters['auth/username'] })).subscribe({
          next: (data) => {
            this.$store.commit('user/REMOVE_BOOKMARK', data.value?.data?.onDeleteBookmarkByUserId)
          },
          error: (error) => {
            console.warn(error)
          }
        })
      }
    }
  }
}
