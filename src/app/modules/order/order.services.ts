import { ProductModel } from '../products/product.model'
import { Torder } from './order.interface'
import { OrderModel } from './order.model'

const createOrderIntoDB = async (orderDetails: Torder) => {
  const { product, quantity: orderQuantity } = orderDetails
  const validProduct = await ProductModel.findById({ _id: product })

  if (!validProduct) {
    throw new Error('Product Not Found')
  }
  const productQuantity = validProduct?.quantity
  if (productQuantity < orderQuantity) {
    throw new Error('Not enough stock')
  }

  const result = await OrderModel.create(orderDetails)
  return result
}

const calculateRevenueFromDB = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        revenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: { _id: 0, totalOrders: 0 },
    },
  ])

  return result[0]
}

export const OrderServices = {
  createOrderIntoDB,
  calculateRevenueFromDB,
}
