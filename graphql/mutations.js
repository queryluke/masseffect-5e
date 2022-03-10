/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBookmark = /* GraphQL */ `
  mutation CreateBookmark(
    $input: CreateBookmarkInput!
    $condition: ModelBookmarkConditionInput
  ) {
    createBookmark(input: $input, condition: $condition) {
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
export const updateBookmark = /* GraphQL */ `
  mutation UpdateBookmark(
    $input: UpdateBookmarkInput!
    $condition: ModelBookmarkConditionInput
  ) {
    updateBookmark(input: $input, condition: $condition) {
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
export const deleteBookmark = /* GraphQL */ `
  mutation DeleteBookmark(
    $input: DeleteBookmarkInput!
    $condition: ModelBookmarkConditionInput
  ) {
    deleteBookmark(input: $input, condition: $condition) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
export const createCharacter = /* GraphQL */ `
  mutation CreateCharacter(
    $input: CreateCharacterInput!
    $condition: ModelCharacterConditionInput
  ) {
    createCharacter(input: $input, condition: $condition) {
      id
      owner
      data
      createdOn
      updatedOn
    }
  }
`;
export const updateCharacter = /* GraphQL */ `
  mutation UpdateCharacter(
    $input: UpdateCharacterInput!
    $condition: ModelCharacterConditionInput
  ) {
    updateCharacter(input: $input, condition: $condition) {
      id
      owner
      data
      createdOn
      updatedOn
    }
  }
`;
export const deleteCharacter = /* GraphQL */ `
  mutation DeleteCharacter(
    $input: DeleteCharacterInput!
    $condition: ModelCharacterConditionInput
  ) {
    deleteCharacter(input: $input, condition: $condition) {
      id
      owner
      data
      createdOn
      updatedOn
    }
  }
`;
export const createModel = /* GraphQL */ `
  mutation CreateModel(
    $input: CreateModelInput!
    $condition: ModelModelConditionInput
  ) {
    createModel(input: $input, condition: $condition) {
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
export const updateModel = /* GraphQL */ `
  mutation UpdateModel(
    $input: UpdateModelInput!
    $condition: ModelModelConditionInput
  ) {
    updateModel(input: $input, condition: $condition) {
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
export const deleteModel = /* GraphQL */ `
  mutation DeleteModel(
    $input: DeleteModelInput!
    $condition: ModelModelConditionInput
  ) {
    deleteModel(input: $input, condition: $condition) {
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
export const createHomebrew = /* GraphQL */ `
  mutation CreateHomebrew(
    $input: CreateHomebrewInput!
    $condition: ModelHomebrewConditionInput
  ) {
    createHomebrew(input: $input, condition: $condition) {
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
export const updateHomebrew = /* GraphQL */ `
  mutation UpdateHomebrew(
    $input: UpdateHomebrewInput!
    $condition: ModelHomebrewConditionInput
  ) {
    updateHomebrew(input: $input, condition: $condition) {
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
export const deleteHomebrew = /* GraphQL */ `
  mutation DeleteHomebrew(
    $input: DeleteHomebrewInput!
    $condition: ModelHomebrewConditionInput
  ) {
    deleteHomebrew(input: $input, condition: $condition) {
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
