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
      contactMethod
      contactValue
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
      contactMethod
      contactValue
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
      contactMethod
      contactValue
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
export const createHomebrew = /* GraphQL */ `
  mutation CreateHomebrew(
    $input: CreateHomebrewInput!
    $condition: ModelHomebrewConditionInput
  ) {
    createHomebrew(input: $input, condition: $condition) {
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
export const updateHomebrew = /* GraphQL */ `
  mutation UpdateHomebrew(
    $input: UpdateHomebrewInput!
    $condition: ModelHomebrewConditionInput
  ) {
    updateHomebrew(input: $input, condition: $condition) {
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
export const deleteHomebrew = /* GraphQL */ `
  mutation DeleteHomebrew(
    $input: DeleteHomebrewInput!
    $condition: ModelHomebrewConditionInput
  ) {
    deleteHomebrew(input: $input, condition: $condition) {
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
export const createHomebrewUse = /* GraphQL */ `
  mutation CreateHomebrewUse(
    $input: CreateHomebrewUseInput!
    $condition: ModelHomebrewUseConditionInput
  ) {
    createHomebrewUse(input: $input, condition: $condition) {
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
export const updateHomebrewUse = /* GraphQL */ `
  mutation UpdateHomebrewUse(
    $input: UpdateHomebrewUseInput!
    $condition: ModelHomebrewUseConditionInput
  ) {
    updateHomebrewUse(input: $input, condition: $condition) {
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
export const deleteHomebrewUse = /* GraphQL */ `
  mutation DeleteHomebrewUse(
    $input: DeleteHomebrewUseInput!
    $condition: ModelHomebrewUseConditionInput
  ) {
    deleteHomebrewUse(input: $input, condition: $condition) {
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
export const createHomebrewVote = /* GraphQL */ `
  mutation CreateHomebrewVote(
    $input: CreateHomebrewVoteInput!
    $condition: ModelHomebrewVoteConditionInput
  ) {
    createHomebrewVote(input: $input, condition: $condition) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
export const updateHomebrewVote = /* GraphQL */ `
  mutation UpdateHomebrewVote(
    $input: UpdateHomebrewVoteInput!
    $condition: ModelHomebrewVoteConditionInput
  ) {
    updateHomebrewVote(input: $input, condition: $condition) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
export const deleteHomebrewVote = /* GraphQL */ `
  mutation DeleteHomebrewVote(
    $input: DeleteHomebrewVoteInput!
    $condition: ModelHomebrewVoteConditionInput
  ) {
    deleteHomebrewVote(input: $input, condition: $condition) {
      id
      owner
      homebrewId
      createdAt
      updatedAt
    }
  }
`;
