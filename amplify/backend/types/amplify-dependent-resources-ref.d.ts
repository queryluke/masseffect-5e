export type AmplifyDependentResourcesAttributes = {
  "api": {
    "masseffect5e": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "me5eauth": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "GoogleWebClient": "string",
      "HostedUIDomain": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "OAuthMetadata": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "adminsGroupRole": "string",
      "translatorsGroupRole": "string"
    }
  },
  "function": {
    "masseffect5eHomebrewTallies": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "me5estorage": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}