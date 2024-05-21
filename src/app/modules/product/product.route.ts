import Express from 'express';
import { productController } from './product.controller';

const router = Express.Router();

router.post('/', productController.createNewProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getSingleProduct);

export const productRoutes = router;
