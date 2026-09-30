import express, { type Router } from 'express'
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb'
import db, { tableName } from '../aws/aws.ts'
import { productIdParser, userIdParser } from '../middleware/idParsers.ts'
import { cartParser, jsonParser } from '../middleware/bodyParser.ts'
import { cartWithIdArraySchema, dbCartArraySchema, dbCartSchema, type Cart, type CartWithId } from '@project/shared'

// Skapar routern för alla cart-endpoints
const router: Router = express.Router()


// GET - hämtar hela kundvagnen för en user
router.get('/:userId',  //TODO: skanar typer
  userIdParser,
  async (_req, res): Promise<void> => {
    const userId = res.locals.userId //TODO: typinformationen går inte vidare

    try {

      // Hämtar alla cart-items som tillhör usern från DynamoDB
      const result = await db.send(new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {
          ':pk': `USER#${userId}`
        }
      }))

      // Kontrollerar att datan från DynamoDB har rätt format
      const cartData = dbCartArraySchema.safeParse(result.Items)

      if (cartData.error) {
        console.log(cartData.error)
        res.sendStatus(500)
        return
      }

      // Gör om DynamoDB-formatet till formatet som API:t ska returnera
      const cart: CartWithId[] = cartData.data.map(item => ({
        productId: item.sk.replace('PRODUCT#', ''),
        amount: item.amount
      }))

      // Kontrollerar att datan har rätt format innan den skickas TODO: tänk igen, man behöver inte parca data man själv skickat in
      const parsedResponse = cartWithIdArraySchema.parse(cart)

      // Skickar hela kundvagnen
      res.status(200).json(parsedResponse)

    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)


// GET - hämtar en specifik produkt från en users kundvagn
router.get('/:userId/product/:productId',
  userIdParser,
  productIdParser,
  async (_req, res): Promise<void> => {
    const userId = res.locals.userId
    const productId = res.locals.productId

    try {

      // Hämtar ett specifikt cart-item med userId + productId
      const result = await db.send(new GetCommand({
        TableName: tableName,
        Key: {
          pk: `USER#${userId}`,
          sk: `PRODUCT#${productId}`
        }
      }))

      // Returnerar 404 om produkten inte finns i kundvagnen
      if (!result.Item) {
        res.sendStatus(404)
        return
      }

      // Kontrollerar att datan från DynamoDB har rätt format
      const cartData = dbCartSchema.safeParse(result.Item)

      if (cartData.error) {
        console.log(cartData.error)
        res.sendStatus(500)
        return
      }

      // Gör om DynamoDB-formatet till API-format
      const cartItem = {
        productId: cartData.data.sk.replace('PRODUCT#', ''),
        amount: cartData.data.amount
      }

      // Skickar cart-itemet. kan använda send ist för json
      res.status(200).json(cartItem)

    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  }
)


// POST - lägger till en produkt i en users kundvagn
//ANDREAS: Skall man ha eller inte ha UserIdParam och ProductIdParam? 
// /svar; behöver vara med, göra en typ IDx2
router.post<{}, string, Cart>('/:userId/product/:productId',
  userIdParser,
  productIdParser,
  jsonParser,
  cartParser,
  async (req, res): Promise<void> => {
    const userId = res.locals.userId
    const productId = res.locals.productId
    const cart: Cart = req.body

    // Bygger itemet i det format som används i DynamoDB. TODO: använd data typ. dubbel
    const item = {
      pk: `USER#${userId}`,
      sk: `PRODUCT#${productId}`,
      ...cart
    }

    try {

      // Lägger till produkten om den inte redan finns i kundvagnen
      await db.send(new PutCommand({
        TableName: tableName,
        Item: item,
        ConditionExpression: 'attribute_not_exists(pk)'
      }))

      // Produkten skapades i kundvagnen
      res.status(201).send(productId)

    } catch (error) {

      // Produkten finns redan i kundvagnen
      if (error instanceof ConditionalCheckFailedException) {
        res.sendStatus(400)
        return
      }

      // Annat oväntat fel
      console.error(error)
      res.sendStatus(500)
    }
  }
)


// PUT - ändrar amount på en produkt som redan finns i kundvagnen
router.put<{}, string, Cart>('/:userId/product/:productId',
  userIdParser,
  productIdParser,
  jsonParser,
  cartParser,
  async (req, res): Promise<void> => {
    const userId = res.locals.userId
    const productId = res.locals.productId
    const cart: Cart = req.body

    try {

      // Hittar cart-itemet och uppdaterar amount
      await db.send(new UpdateCommand({
        TableName: tableName,
        Key: {
          pk: `USER#${userId}`,
          sk: `PRODUCT#${productId}`
        },
        UpdateExpression: 'SET amount = :amount',
        ConditionExpression: 'attribute_exists(pk)',
        ExpressionAttributeValues: {
          ':amount': cart.amount
        }
      }))

      // Uppdateringen lyckades
      res.sendStatus(200)

    } catch (error) {

      // Cart-itemet som skulle uppdateras finns inte
      if (error instanceof ConditionalCheckFailedException) {
        res.sendStatus(404)
        return
      }

      // Annat oväntat fel
      console.error(error)
      res.sendStatus(500)
    }
  }
)

// DELETE - tar bort en produkt från en users kundvagn
router.delete('/:userId/product/:productId',
  userIdParser,
  productIdParser,
  async (_, res): Promise<void> => {
    const userId = res.locals.userId
    const productId = res.locals.productId

    try {

      // Hittar och tar bort produkten från userns kundvagn
      const result = await db.send(new DeleteCommand({
        TableName: tableName,
        Key: {
          pk: `USER#${userId}`,
          sk: `PRODUCT#${productId}`,
        },
        // Returnerar produkten som fanns innan den togs bort
        ReturnValues: 'ALL_OLD',
      }))

      // Produkten fanns inte i kundvagnen
      if (!result.Attributes) {
        res.sendStatus(404)
        return
      }

      // Produkten togs bort
      res.sendStatus(204)

    } catch {

      // Något oväntat gick fel
      res.sendStatus(500)
    }
  },
)


// Exporterar routern så att den kan användas i entry.ts
export default router