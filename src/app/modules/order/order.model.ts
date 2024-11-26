import { Schema, model, connect, Types } from 'mongoose'
import { Torder } from './order.interface'
import { ProductModel } from '../products/product.model'

const orderSchema = new Schema<Torder>(
  {
    email: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
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
