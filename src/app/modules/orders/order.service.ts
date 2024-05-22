import { Order } from './orders.interface';
import { OrderModel } from './orders.model';

const createOrderInDB = async (orderData: Order) => {
  const result = await OrderModel.create(orderData);
  return result;
};

export const orderServices = {
  createOrderInDB,
};
