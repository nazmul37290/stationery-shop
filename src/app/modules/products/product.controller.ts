import { Request, Response } from 'express'
import { ProductServices } from './product.services'

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
      message: 'Something went wrong',
      success: false,
      error: err.message,
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
      message: 'Failed to fetch products',
      error: err.message,
    })
  }
}
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getSingleProductFromDB(productId)
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: err.message,
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { updatedData } = req.body
    const { productId } = req.params
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
      message: 'Failed to update product',
      error: err,
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.deleteProductFromDB(productId)
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
