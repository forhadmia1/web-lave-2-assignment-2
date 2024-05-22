import { Order } from './orders.interface';
import { OrderModel } from './orders.model';

const createOrderInDB = async (orderData: Order) => {
  const result = await OrderModel.create(orderData);
  return result;
};

const getAllOrderFromDB = async () => {
  const result = await OrderModel.find({});
  return result;
};

const getOrdersByEmailFromDB = async (email: string) => {
  const result = await OrderModel.find({ email });
  return result;
};

export const orderServices = {
  createOrderInDB,
  getAllOrderFromDB,
  getOrdersByEmailFromDB,
};
