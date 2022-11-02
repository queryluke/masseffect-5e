export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "me5eauth": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "HostedUIDomain": "string",
            "OAuthMetadata": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "GoogleWebClient": "string"
        },
        "userPoolGroups": {
            "adminsGroupRole": "string",
            "translatorsGroupRole": "string"
        }
    },
    "api": {
        "masseffect5e": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "me5estorage": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "masseffect5eHomebrewTallies": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}