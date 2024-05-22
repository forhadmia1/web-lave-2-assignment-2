import { Request, Response } from 'express';
import { Order } from './orders.interface';
import { orderValidationSchema } from './order.validation';
import { orderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: Order = req.body;

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

export const orderController = {
  createOrder,
};
