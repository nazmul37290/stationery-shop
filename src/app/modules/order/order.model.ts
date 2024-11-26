import { Schema, model } from 'mongoose'
import { Torder } from './order.interface'
import { ProductModel } from '../products/product.model'

const orderSchema = new Schema<Torder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product id is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be minimum 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [1, 'Total price must be a positive number'],
    },
  },
  { timestamps: true },
)

orderSchema.post('save', async function (doc, next) {
  const product = await ProductModel.findByIdAndUpdate(
    { _id: this.product },
    { $inc: { quantity: -this.quantity } },
    { new: true },
  )
  if (product && product.quantity === 0) {
    await ProductModel.findByIdAndUpdate(
      { _id: this.product },
      { $set: { inStock: false } },
    )
  }
  next()
})

export const OrderModel = model<Torder>('Order', orderSchema)
