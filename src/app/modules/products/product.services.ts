import mongoose from 'mongoose'
import { Tproduct } from './product.interface'
import { ProductModel } from './product.model'

const createProductIntoDB = async (product: Tproduct) => {
  const result = await ProductModel.create(product)

  return result
}

const getProductsFromDB = async () => {
  const result = await ProductModel.find({})
  return result
}

const getSingleProductFromDB = async (id: string) => {
  const query = { _id: new mongoose.Types.ObjectId(id) }
  const result = await ProductModel.findOne(query)

  return result
}

const updateProductIntoDB = async (
  id: string,
  updatedFields: Partial<Tproduct>,
) => {
  const query = { _id: new mongoose.Types.ObjectId(id) }
  const result = await ProductModel.findOneAndUpdate(
    query,
    {
      $set: {
        ...updatedFields,
        updatedAt: new Date(),
      },
    },
    { new: true, runValidators: true },
  )
  if (!result) {
    throw new Error('Product not found')
  }

  return result
}

const deleteProductFromDB = async (id: string) => {
  const product = await ProductModel.findById(id)
  if (!product) {
    throw new Error('Product not found')
  }
  const result = await ProductModel.findByIdAndDelete(id)
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
