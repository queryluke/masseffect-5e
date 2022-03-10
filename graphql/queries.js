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
export const getHomebrew = /* GraphQL */ `
  query GetHomebrew($id: ID!) {
    getHomebrew(id: $id) {
      id
      owner
      data
      type
      version
      certified
      language
      createdOn
      updatedOn
    }
  }
`;
export const listHomebrews = /* GraphQL */ `
  query ListHomebrews(
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomebrews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        data
        type
        version
        certified
        language
        createdOn
        updatedOn
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
export const homebrewByUser = /* GraphQL */ `
  query HomebrewByUser(
    $owner: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewByUser(
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
        type
        version
        certified
        language
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const listHomebrewsByVersionAndType = /* GraphQL */ `
  query ListHomebrewsByVersionAndType(
    $type: String!
    $version: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomebrewsByVersionAndType(
      type: $type
      version: $version
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        data
        type
        version
        certified
        language
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
export const getModel = /* GraphQL */ `
  query GetModel($id: ID!) {
    getModel(id: $id) {
      id
      data
      type
      version
      language
      createdOn
      updatedOn
    }
  }
`;
export const listModels = /* GraphQL */ `
  query ListModels(
    $filter: ModelModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        data
        type
        version
        language
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const listModelsByVersionAndType = /* GraphQL */ `
  query ListModelsByVersionAndType(
    $type: String!
    $version: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModelsByVersionAndType(
      type: $type
      version: $version
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        data
        type
        version
        language
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
