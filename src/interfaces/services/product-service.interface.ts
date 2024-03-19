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
