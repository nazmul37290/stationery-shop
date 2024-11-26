/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { ProductServices } from './product.services'
import { ProductModel } from './product.model'

const createProduct = async (req: Request, res: Response) => {
  try {
    const { productData } = req.body
    const result = await ProductServices.createProductIntoDB(productData)

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      message: err._message,
      success: false,
      error: err,
      stack: err.stack,
    })
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getProductsFromDB()
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err._message,
      error: err,
      stack: err.stack,
    })
  }
}
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getSingleProductFromDB(productId)
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: result,
      })
    }
    return res.status(404).json({
      success: false,
      message: 'Product not found',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err._message,
      error: err,
      stack: err.stack,
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { updatedData } = req.body
    const { productId } = req.params

    const schemaFields = Object.keys(ProductModel.schema.obj)

    const invalidFields = Object.keys(updatedData).filter(
      key => !schemaFields.includes(key),
    )

    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`)
    }

    const result = await ProductServices.updateProductIntoDB(
      productId,
      updatedData,
    )
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
      stack: err.stack,
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    await ProductServices.deleteProductFromDB(productId)
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {},
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: err,
      stack: err.stack,
    })
  }
}

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
