/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBookmarkByUserId = /* GraphQL */ `
  subscription OnCreateBookmarkByUserId($userId: ID!) {
    onCreateBookmarkByUserId(userId: $userId) {
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
export const onDeleteBookmarkByUserId = /* GraphQL */ `
  subscription OnDeleteBookmarkByUserId($userId: ID!) {
    onDeleteBookmarkByUserId(userId: $userId) {
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
export const onUpdateProfileByUserId = /* GraphQL */ `
  subscription OnUpdateProfileByUserId($id: ID!) {
    onUpdateProfileByUserId(id: $id) {
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
