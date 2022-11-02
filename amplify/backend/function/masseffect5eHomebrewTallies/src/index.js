/* Amplify Params - DO NOT EDIT
	API_MASSEFFECT5E_GRAPHQLAPIENDPOINTOUTPUT
	API_MASSEFFECT5E_GRAPHQLAPIIDOUTPUT
	API_MASSEFFECT5E_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const https = require('https')
const urlParse = require('url').URL
const region = process.env.REGION
const appsyncUrl = process.env.API_MASSEFFECT5E_GRAPHQLAPIENDPOINTOUTPUT

const getHomebrew = /* GraphQL */ `
  query GetHomebrew($id: ID!) {
    getHomebrew(id: $id) {
      id
      usageCount
      voteCount
      model
      private
    }
  }
`
const updateHomebrew = /* GraphQL */ `
  mutation UpdateHomebrew(
    $input: UpdateHomebrewInput!
    $condition: ModelHomebrewConditionInput
  ) {
    updateHomebrew(input: $input, condition: $condition) {
      id
    }
  }
`

function graphqlRequest (queryDetails) {
  const req = new AWS.HttpRequest(appsyncUrl, region)
  const endpoint = new urlParse(appsyncUrl).hostname.toString()

  req.method = 'POST'
  req.path = '/graphql'
  req.headers.host = endpoint
  req.headers['Content-Type'] = 'application/json'
  req.body = JSON.stringify(queryDetails)

  const signer = new AWS.Signers.V4(req, 'appsync', true)
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

  return new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      let data = ''

      result.on('data', (chunk) => {
        data += chunk
      })

      result.on('end', () => {
        resolve(JSON.parse(data.toString()))
      })
    })

    httpRequest.write(req.body)
    httpRequest.end()
  })
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  for (const record of event.Records) {
    let adder = 0
    let data = null
    if (record.eventName === 'INSERT') {
      adder = 1
      data = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
    }
    if (record.eventName === 'REMOVE') {
      adder = -1
      data = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage)
    }
    if (!data) {
      continue
    }
    const dbModel = data.__typename
    if (!dbModel || !['HomebrewVote', 'HomebrewUse'].includes(dbModel)) {
      continue
    }
    const { data: { getHomebrew: homebrew } } = await graphqlRequest(
      {
        query: getHomebrew,
        variables: {
          id: data.homebrewId
        }
      }
    )
    if (!homebrew) {
      continue
    }
    if (!homebrew.published && dbModel === 'HomebrewVote') {
      continue
    }

    const input = {
      id: data.homebrewId,
      model: homebrew.model,
      private: homebrew.private
    }
    if (dbModel === 'HomebrewVote') {
      input.voteCount = Math.max(0, homebrew.voteCount + adder)
      input.usageCount = homebrew.usageCount
    } else {
      input.usageCount = Math.max(0, homebrew.usageCount + adder)
      input.voteCount = homebrew.voteCount
    }
    await graphqlRequest(
      {
        query: updateHomebrew,
        variables: {
          input
        }
      }
    )
  }
  return Promise.resolve('Successfully processed DynamoDB record')
}
