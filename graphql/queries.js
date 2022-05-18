/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBookmark = /* GraphQL */ `
  query GetBookmark($id: ID!) {
    getBookmark(id: $id) {
      id
      owner
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
        owner
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
      maxCharacters
      createdOn
      updatedOn
      owner
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
        maxCharacters
        createdOn
        updatedOn
        owner
      }
      nextToken
    }
  }
`;
export const bookmarkByUser = /* GraphQL */ `
  query BookmarkByUser(
    $owner: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBookmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookmarkByUser(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
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
export const getCharacter = /* GraphQL */ `
  query GetCharacter($id: ID!) {
    getCharacter(id: $id) {
      id
      owner
      data
      createdOn
      updatedOn
    }
  }
`;
export const listCharacters = /* GraphQL */ `
  query ListCharacters(
    $filter: ModelCharacterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCharacters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        data
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const characterByUser = /* GraphQL */ `
  query CharacterByUser(
    $owner: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCharacterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    characterByUser(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        data
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
