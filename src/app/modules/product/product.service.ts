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

const searchProductFromDB = async (queryString: string) => {
  const result = await ProductModel.find({
    $text: { $search: queryString },
  });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

const updateProductById = async (id: string, productData: Product) => {
  const result = await ProductModel.updateOne(
    { _id: id },
    {
      $set: productData,
    },
  );
  return result;
};

const deleteProductById = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

export const productService = {
  createProductInDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductById,
  deleteProductById,
  searchProductFromDB,
};
