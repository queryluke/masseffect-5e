/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBookmarkByUserId = /* GraphQL */ `
  subscription OnCreateBookmarkByUserId($userId: ID!) {
    onCreateBookmarkByUserId(userId: $userId) {
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
export const onDeleteBookmarkByUserId = /* GraphQL */ `
  subscription OnDeleteBookmarkByUserId($userId: ID!) {
    onDeleteBookmarkByUserId(userId: $userId) {
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
export const onCreateHomebrewUse = /* GraphQL */ `
  subscription OnCreateHomebrewUse(
    $filter: ModelSubscriptionHomebrewUseFilterInput
    $owner: String
  ) {
    onCreateHomebrewUse(filter: $filter, owner: $owner) {
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
          webhooks
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
export const onUpdateHomebrewUse = /* GraphQL */ `
  subscription OnUpdateHomebrewUse(
    $filter: ModelSubscriptionHomebrewUseFilterInput
    $owner: String
  ) {
    onUpdateHomebrewUse(filter: $filter, owner: $owner) {
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
          webhooks
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
export const onDeleteHomebrewUse = /* GraphQL */ `
  subscription OnDeleteHomebrewUse(
    $filter: ModelSubscriptionHomebrewUseFilterInput
    $owner: String
  ) {
    onDeleteHomebrewUse(filter: $filter, owner: $owner) {
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
          webhooks
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
export const onCreateHomebrewVote = /* GraphQL */ `
  subscription OnCreateHomebrewVote(
    $filter: ModelSubscriptionHomebrewVoteFilterInput
    $owner: String
  ) {
    onCreateHomebrewVote(filter: $filter, owner: $owner) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHomebrewVote = /* GraphQL */ `
  subscription OnUpdateHomebrewVote(
    $filter: ModelSubscriptionHomebrewVoteFilterInput
    $owner: String
  ) {
    onUpdateHomebrewVote(filter: $filter, owner: $owner) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHomebrewVote = /* GraphQL */ `
  subscription OnDeleteHomebrewVote(
    $filter: ModelSubscriptionHomebrewVoteFilterInput
    $owner: String
  ) {
    onDeleteHomebrewVote(filter: $filter, owner: $owner) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
