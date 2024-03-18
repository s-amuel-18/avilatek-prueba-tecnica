import { NextFunction, Request, Response } from 'express';
import { productService } from '../services/product.service';

class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    try {
      const newProduct = await productService.create(body);

      res.json({
        message: 'Producto creado correctamente.',
        data: { product: newProduct },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
