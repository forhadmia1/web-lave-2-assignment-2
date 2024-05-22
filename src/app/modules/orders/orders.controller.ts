import { Request, Response } from 'express';
import { Order } from './orders.interface';
import { orderValidationSchema } from './order.validation';
import { orderServices } from './order.service';
import { productService } from '../product/product.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: Order = req.body;

    const product = await productService.getSingleProductFromDB(
      orderData.productId,
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.inventory.quantity < orderData.quantity) {
      return res.status(404).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    product.inventory.quantity -= orderData.quantity;
    if (product.inventory.quantity === 0) {
      product.inventory.inStock = false;
    }

    const { _id, ...rest } = product;

    await productService.updateProductById(orderData.productId, rest);

    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await orderServices.createOrderInDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const queryEmail = req.query.email as string;
    if (queryEmail) {
      const result = await orderServices.getOrdersByEmailFromDB(queryEmail);

      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      const result = await orderServices.getAllOrderFromDB();

      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
