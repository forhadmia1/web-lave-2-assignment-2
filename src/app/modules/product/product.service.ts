import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductInDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find({});
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

export const productService = {
  createProductInDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
