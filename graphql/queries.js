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
      contactMethod
      contactValue
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
        contactMethod
        contactValue
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
      title
      titleId
      data
      model
      usageCount
      voteCount
      createdAt
      development
      published
      private
      official
      profile {
        id
        username
        profileImg
        imperial
        darkMode
        maxCharacters
        contactMethod
        contactValue
        createdOn
        updatedOn
        owner
      }
      updatedAt
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
        title
        titleId
        data
        model
        usageCount
        voteCount
        createdAt
        development
        published
        private
        official
        profile {
          id
          username
          profileImg
          imperial
          darkMode
          maxCharacters
          contactMethod
          contactValue
          createdOn
          updatedOn
          owner
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHomebrewUse = /* GraphQL */ `
  query GetHomebrewUse($id: ID!) {
    getHomebrewUse(id: $id) {
      id
      owner
      homebrewId
      homebrew {
        id
        owner
        title
        titleId
        data
        model
        usageCount
        voteCount
        createdAt
        development
        published
        private
        official
        profile {
          id
          username
          profileImg
          imperial
          darkMode
          maxCharacters
          contactMethod
          contactValue
          createdOn
          updatedOn
          owner
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listHomebrewUses = /* GraphQL */ `
  query ListHomebrewUses(
    $filter: ModelHomebrewUseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomebrewUses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        homebrewId
        homebrew {
          id
          owner
          title
          titleId
          data
          model
          usageCount
          voteCount
          createdAt
          development
          published
          private
          official
          profile {
            id
            username
            profileImg
            imperial
            darkMode
            maxCharacters
            contactMethod
            contactValue
            createdOn
            updatedOn
            owner
          }
          updatedAt
        }
        createdAt
        updatedAt
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
        title
        titleId
        data
        model
        usageCount
        voteCount
        createdAt
        development
        published
        private
        official
        profile {
          id
          username
          profileImg
          imperial
          darkMode
          maxCharacters
          contactMethod
          contactValue
          createdOn
          updatedOn
          owner
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const homebrewByModel = /* GraphQL */ `
  query HomebrewByModel(
    $model: String!
    $private: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewByModel(
      model: $model
      private: $private
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        title
        titleId
        data
        model
        usageCount
        voteCount
        createdAt
        development
        published
        private
        official
        profile {
          id
          username
          profileImg
          imperial
          darkMode
          maxCharacters
          contactMethod
          contactValue
          createdOn
          updatedOn
          owner
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const officialHomebrew = /* GraphQL */ `
  query OfficialHomebrew(
    $official: Int!
    $model: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    officialHomebrew(
      official: $official
      model: $model
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        title
        titleId
        data
        model
        usageCount
        voteCount
        createdAt
        development
        published
        private
        official
        profile {
          id
          username
          profileImg
          imperial
          darkMode
          maxCharacters
          contactMethod
          contactValue
          createdOn
          updatedOn
          owner
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const homebrewUseByUser = /* GraphQL */ `
  query HomebrewUseByUser(
    $owner: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewUseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewUseByUser(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        homebrewId
        homebrew {
          id
          owner
          title
          titleId
          data
          model
          usageCount
          voteCount
          createdAt
          development
          published
          private
          official
          profile {
            id
            username
            profileImg
            imperial
            darkMode
            maxCharacters
            contactMethod
            contactValue
            createdOn
            updatedOn
            owner
          }
          updatedAt
        }
        createdAt
        updatedAt
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
export const getHomebrewVote = /* GraphQL */ `
  query GetHomebrewVote($id: ID!) {
    getHomebrewVote(id: $id) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
export const listHomebrewVotes = /* GraphQL */ `
  query ListHomebrewVotes(
    $filter: ModelHomebrewVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomebrewVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        homebrewId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const homebrewVoteByUserByHomebrew = /* GraphQL */ `
  query HomebrewVoteByUserByHomebrew(
    $owner: ID!
    $homebrewId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewVoteByUserByHomebrew(
      owner: $owner
      homebrewId: $homebrewId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        homebrewId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
