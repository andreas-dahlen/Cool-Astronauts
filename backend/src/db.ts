import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { process } from "zod/v4/core";

const region = process.env.AWS_REGION;

if (!region) {
  throw new Error("AWS_REGION saknas");
}

const client : DynamoDBClient = new DynamoDBClient({
  region : region
})

const db : DynamoDBDocumentClient = DynamoDBDocumentClient.from(client);

export { db };