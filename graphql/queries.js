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
      publicationStatus
      createdAt
      sortHackUsage
      sortHackVotes
      sortHackTitle
      sortHackCreatedAt
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
        publicationStatus
        createdAt
        sortHackUsage
        sortHackVotes
        sortHackTitle
        sortHackCreatedAt
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
        publicationStatus
        createdAt
        sortHackUsage
        sortHackVotes
        sortHackTitle
        sortHackCreatedAt
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
export const homebrewByTitleId = /* GraphQL */ `
  query HomebrewByTitleId(
    $titleId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewByTitleId(
      titleId: $titleId
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
        publicationStatus
        createdAt
        sortHackUsage
        sortHackVotes
        sortHackTitle
        sortHackCreatedAt
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
export const homebrewByModelByStatus = /* GraphQL */ `
  query HomebrewByModelByStatus(
    $model: String!
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewByModelByStatus(
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
        publicationStatus
        createdAt
        sortHackUsage
        sortHackVotes
        sortHackTitle
        sortHackCreatedAt
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
export const homebrewSortedByUsage = /* GraphQL */ `
  query HomebrewSortedByUsage(
    $sortHackUsage: Int!
    $usageCount: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewSortedByUsage(
      sortHackUsage: $sortHackUsage
      usageCount: $usageCount
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
        publicationStatus
        createdAt
        sortHackUsage
        sortHackVotes
        sortHackTitle
        sortHackCreatedAt
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
export const homebrewSortedByVotes = /* GraphQL */ `
  query HomebrewSortedByVotes(
    $sortHackVotes: Int!
    $voteCount: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewSortedByVotes(
      sortHackVotes: $sortHackVotes
      voteCount: $voteCount
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
        publicationStatus
        createdAt
        sortHackUsage
        sortHackVotes
        sortHackTitle
        sortHackCreatedAt
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
export const homebrewSortedByTitle = /* GraphQL */ `
  query HomebrewSortedByTitle(
    $sortHackTitle: Int!
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewSortedByTitle(
      sortHackTitle: $sortHackTitle
      title: $title
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
        publicationStatus
        createdAt
        sortHackUsage
        sortHackVotes
        sortHackTitle
        sortHackCreatedAt
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
export const homebrewSortedByCreatedAt = /* GraphQL */ `
  query HomebrewSortedByCreatedAt(
    $sortHackCreatedAt: Int!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHomebrewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homebrewSortedByCreatedAt(
      sortHackCreatedAt: $sortHackCreatedAt
      createdAt: $createdAt
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
        publicationStatus
        createdAt
        sortHackUsage
        sortHackVotes
        sortHackTitle
        sortHackCreatedAt
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
        publicationStatus
        createdAt
        sortHackUsage
        sortHackVotes
        sortHackTitle
        sortHackCreatedAt
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
          publicationStatus
          createdAt
          sortHackUsage
          sortHackVotes
          sortHackTitle
          sortHackCreatedAt
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
          publicationStatus
          createdAt
          sortHackUsage
          sortHackVotes
          sortHackTitle
          sortHackCreatedAt
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
