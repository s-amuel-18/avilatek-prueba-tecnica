import { NextFunction, Request, Response } from 'express';
import { productService } from '../services/product.service';
import { Pagination } from '../interfaces/validations/pagination.interface';

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

  async findAll(req: Request, res: Response, next: NextFunction) {
    const query = req.query;

    try {
      const products = await productService.findAll(query);

      res.json({
        message: 'listado',
        data: { products },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
