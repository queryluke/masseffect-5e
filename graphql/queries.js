/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBookmark = /* GraphQL */ `
  query GetBookmark($id: ID!) {
    getBookmark(id: $id) {
      id
      userId
      model
      modelId
      data
      createdOn
      updatedOn
    }
  }
`;
export const listBookmarks = /* GraphQL */ `
  query ListBookmarks(
    $filter: ModelBookmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookmarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        model
        modelId
        data
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      username
      profileImg
      imperial
      darkMode
      createdOn
      updatedOn
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        profileImg
        imperial
        darkMode
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const bookmarkByUser = /* GraphQL */ `
  query BookmarkByUser(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelBookmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookmarkByUser(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        model
        modelId
        data
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
