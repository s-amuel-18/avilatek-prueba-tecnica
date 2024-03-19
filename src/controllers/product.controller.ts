import { NextFunction, Request, Response } from 'express';
import { productService } from '../services/product.service';
import { Pagination } from '../interfaces/validations/pagination.interface';
import { matchedData } from 'express-validator';
import {
  CreateNewOrder,
  CreateProduct,
  UpdateProduct,
} from '../interfaces/services/product-service.interface';
import { User } from '../models/user.model';

class ProductController {
  // * Post Methods
  async create(req: Request, res: Response, next: NextFunction) {
    const body = matchedData(req) as CreateProduct;

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

  async newOrder(req: Request, res: Response, next: NextFunction) {
    const authUser = req.backpack.authUser as User;
    const productId = req.params.id;
    const { quantity } = matchedData(req);

    try {
      const order = await productService.createNewOrder(authUser, { quantity, productId: +productId });
      res.json({
        data: { order },
      });
    } catch (error) {
      next(error);
    }
  }

  // * Get Methods
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

  async findById(req: Request, res: Response, next: NextFunction) {
    const productId = +req.params.id;
    try {
      const product = await productService.findById(productId, { exceptionIfNotFound: true });

      res.json({
        data: { product },
      });
    } catch (error) {
      next(error);
    }
  }

  // * Patch Methods
  async update(req: Request, res: Response, next: NextFunction) {
    const productId = +req.params.id;
    const { id, ...body } = matchedData(req);

    try {
      const product = await productService.update(productId, body);

      res.json({
        data: {
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // * Delete Methods
  async remove(req: Request, res: Response, next: NextFunction) {
    const productId = +req.params.id;

    try {
      await productService.remove(productId);

      res.json({
        message: 'Producto eliminado correctamente.',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
