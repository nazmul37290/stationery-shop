import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/products/product.routes'
import { OrderRoutes } from './app/modules/order/order.routes'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes

app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to our stationery shop')
})

export default app
