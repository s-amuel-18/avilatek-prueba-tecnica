import { Pagination } from '../validations/pagination.interface';

export interface CreateProduct {
  name: string;
  price: number;
  stock: number;
  description?: string;
}

export interface UpdateProduct {
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
}

export interface CreateNewOrder {
  productId: number;
  quantity: number;
}

export interface FindAllOrdersParams extends Pagination {
  userId?: number;
  productId?: number;
  status?: number;
}
