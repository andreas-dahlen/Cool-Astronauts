import entry from './entry.ts'
import {
  DynamoDBClient,
  ListTablesCommand,
} from '@aws-sdk/client-dynamodb'

import { getAccessKeys } from './aws/keys.ts'

const keys = getAccessKeys()

const client = new DynamoDBClient({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: keys.accessKey,
    secretAccessKey: keys.secretAccessKey,
  },
})

const result = await client.send(new ListTablesCommand({}))

console.log(result.TableNames)

const port: number = 3001


entry.listen(port, (): void => {
  console.log(`server is listening on port ${port}. Stop it with ctrl+c`)
})

// entry.post<
//   Params,
//   ResBody,
//   ReqBody,
//   ReqQuery,
//   Locals
// >(
//   '/whatever',
//   middlewareA,
//   middlewareB,
//   middlewareC,
//   (req, res) => {
//     // handler
//   }
// );