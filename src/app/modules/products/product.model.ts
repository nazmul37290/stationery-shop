import { Schema, model } from 'mongoose'
import { Tproduct } from './product.interface'

const productSchema = new Schema<Tproduct>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    brand: { type: String, required: [true, 'Brand name is required'] },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: {
        values: [
          'Writing',
          'Office Supplies',
          'Art Supplies',
          'Educational',
          'Technology',
        ],
        message: '{VALUE} is not a valid category',
      },

      required: [true, 'Category is required'],
    },
    description: { type: String, required: [true, 'Description is required'] },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be a positive number'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'inStock property is required'],
      default: true,
    },
  },
  { timestamps: true },
)

export const ProductModel = model<Tproduct>('Product', productSchema)
