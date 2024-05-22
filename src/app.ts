import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/orders/orders.route';

const app: Application = express();

//parser
app.use(express.json());

//cors
app.use(cors());

//application route
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

//catch undefined route
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
