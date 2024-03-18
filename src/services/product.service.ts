import { CreateProduct } from '../interfaces/services/product-service.interface';
import { Product } from '../models/product.model';
import { BadRequestException } from '../utils/error-exeptions.util';

class ProductService {
  // * Create
  async create(createProduct: CreateProduct) {
    await this.throwExceptionIfNameExists(createProduct.name);

    return await Product.create({
      name: createProduct.name,
      price: createProduct.price,
      stock: createProduct.stock,
      description: createProduct.description,
    });
  }

  // * Find
  async findAll() {}

  async findOne() {}

  async findByName(name: string) {
    return await Product.findOne({ where: { name } });
  }

  // * Update
  async update(productId: number) {}

  // * Remove
  async remove(productId: number) {}

  // * Exceptions
  async throwExceptionIfNameExists(name: string) {
    const product = await this.findByName(name);
    if (product) throw new BadRequestException('El nombre del producto ya se encuentra registrado.');
  }
}

export const productService = new ProductService();
