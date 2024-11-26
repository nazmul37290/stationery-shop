import { Request, Response } from 'express'
import { OrderServices } from './order.services'

const createOrders = async (req: Request, res: Response) => {
  try {
    const { orderDetails } = req.body
    const result = await OrderServices.createOrderIntoDB(orderDetails)
    res.status(200).json({
      success: true,
      message: 'Product Ordered successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateRevenueFromDB()
    res.status(200).json({
      success: true,
      message: 'Revenue generated successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    })
  }
}

export const OrderController = {
  createOrders,
  calculateRevenue,
}
