const { DynamoDBClient, PutItemCommand, QueryCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall, marshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient();

const createFactionRecord = async (factionInfo) => {

  const input = {
    "Item": marshall(factionInfo),
    "ReturnConsumedCapacity": "TOTAL",
    "TableName": process.env.FACTION_TABLE
  };
  const command = new PutItemCommand(input);
  return await client.send(command);

};

const getFactionRecord = async (channelId) => {

  const input = {
    "ExpressionAttributeValues": {
      ":v1": {
        "S": channelId
      }
    },
    "KeyConditionExpression": "channelId = :v1",
    "TableName": process.env.FACTION_TABLE
  };
  const command = new QueryCommand(input);
  const response = await client.send(command);

  if (response.Count === 0) {
    return {
      factionRecord: {},
      validFactionChannel: false
    }
  };

  return {
    factionRecord: unmarshall(response.Items[0]),
    validFactionChannel: true
  };

};

const updateFactionRecord = async ({ attribute, newValue, channelId }) => {

  const input = {
    "ExpressionAttributeNames": {
      "#A": attribute,
    },
    "ExpressionAttributeValues": {
      ":v": {
        "N": newValue
      },
    },
    "Key": {
      "channelId": {
        "S": channelId
      }
    },
    "ReturnValues": "ALL_NEW",
    "TableName": process.env.FACTION_TABLE,
    "UpdateExpression": "SET #A = :v"
  };
  const command = new UpdateItemCommand(input);
  const response = await client.send(command);

  return unmarshall(response.Attributes);

};

module.exports = {
  createFactionRecord,
  getFactionRecord,
  updateFactionRecord,
}