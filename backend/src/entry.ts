import express, { type Express } from 'express'
import { logger } from './middleware/logger.ts'
import productRouter from './routers/productRouter.ts'
import userRouter from './routers/userRouter.ts'
import cartRouter from './routers/cartRouter.ts'

const entry: Express = express()
const apiRouter = express.Router()

entry.use(logger)
entry.use('/api', apiRouter)

apiRouter.use('/products', productRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/cart', cartRouter)

export default entry