import { Op } from 'sequelize';
import {
  CreateProduct,
  UpdateProduct,
  CreateNewOrder,
} from '../interfaces/services/product-service.interface';
import { Pagination } from '../interfaces/validations/pagination.interface';
import { Product } from '../models/product.model';
import { BadRequestException, NotFoundException } from '../utils/error-exeptions.util';
import { FindOneOptions } from '../interfaces/service.interface';
import { User } from '../models/user.model';
import { OrderHistory, pendingStatusOrder } from '../models/order-history.model';

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

  // TODO: Se debería implementar transaciones
  async createNewOrder(user: User, createNewOrder: CreateNewOrder) {
    const { productId, quantity } = createNewOrder;
    const product = await this.findById(productId, { exceptionIfNotFound: true });
    const productStock = product!.stock;
    const quantityExceedsStock = quantity > productStock;

    if (quantityExceedsStock)
      throw new BadRequestException('La cantidad solicitada excede el stock actual del producto.');

    const remainingStock = productStock - quantity;

    const order = await OrderHistory.create({
      status: pendingStatusOrder,
      productId,
      quantity,
      userId: user.id,
      requestedOn: new Date(),
    });

    await this.update(productId, {
      stock: remainingStock,
    });

    return await this.findOrderById(order.id);
  }

  // * Find
  async findAll(pagination: Pagination) {
    const { limit = 10, page = 1, search = null } = pagination;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      offset,
      limit,
      where: {
        ...(search ? { [Op.or]: [{ name: { [Op.iLike]: `%${search}%` } }] } : {}),
      },
    });
    return products;
  }

  async findById(id: number, findOneOptions: FindOneOptions = {}) {
    const { exceptionIfNotFound = true, notFoundMsg = 'El producto no se encuentra registrado.' } =
      findOneOptions;

    const product = await Product.findOne({ where: { id } });
    if (exceptionIfNotFound && !product) throw new NotFoundException(notFoundMsg);
    return product;
  }

  async findByName(name: string) {
    return await Product.findOne({ where: { name } });
  }

  async findOrderById(orderId: number, findOneOptions: FindOneOptions = {}) {
    const { exceptionIfNotFound = true, notFoundMsg = 'La orden no se encuentra registrado.' } =
      findOneOptions;

    const order = await OrderHistory.findOne({
      where: { id: orderId },
      include: [{ model: User }, { model: Product }],
    });

    if (exceptionIfNotFound && !order) throw new NotFoundException(notFoundMsg);
    return order;
  }

  // * Update
  async update(productId: number, updateProduct: UpdateProduct) {
    const product = await this.findById(productId, { exceptionIfNotFound: true });
    await product?.update(updateProduct);

    return this.findById(productId);
  }

  // * Remove
  async remove(productId: number) {
    const product = await this.findById(productId, { exceptionIfNotFound: true });
    await Product.destroy({ where: { id: productId } });
  }

  // * Exceptions
  async throwExceptionIfNameExists(name: string) {
    const product = await this.findByName(name);
    if (product) throw new BadRequestException('El nombre del producto ya se encuentra registrado.');
  }
}

export const productService = new ProductService();
