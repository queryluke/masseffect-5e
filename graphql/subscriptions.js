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
  subscription OnCreateHomebrewUse($owner: String) {
    onCreateHomebrewUse(owner: $owner) {
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
export const onUpdateHomebrewUse = /* GraphQL */ `
  subscription OnUpdateHomebrewUse($owner: String) {
    onUpdateHomebrewUse(owner: $owner) {
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
export const onDeleteHomebrewUse = /* GraphQL */ `
  subscription OnDeleteHomebrewUse($owner: String) {
    onDeleteHomebrewUse(owner: $owner) {
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
export const onCreateHomebrewVote = /* GraphQL */ `
  subscription OnCreateHomebrewVote($owner: String) {
    onCreateHomebrewVote(owner: $owner) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHomebrewVote = /* GraphQL */ `
  subscription OnUpdateHomebrewVote($owner: String) {
    onUpdateHomebrewVote(owner: $owner) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHomebrewVote = /* GraphQL */ `
  subscription OnDeleteHomebrewVote($owner: String) {
    onDeleteHomebrewVote(owner: $owner) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
