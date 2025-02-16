import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
}

@Injectable()
export class ProductsRepository {
  
  
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'A powerful laptop for professionals.',
      price: 999.99,
      stock: true,
      imgUrl: 'https://example.com/laptop.jpg',
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'A smartphone with a great camera.',
      price: 599.99,
      stock: false,
      imgUrl: 'https://example.com/smartphone.jpg',
    },
  ];
  async getProducts() {
    return this.products;
  }

  async createProduct(product: Omit<Product, 'id'>) {
    const id = this.products.length + 1;
    this.products = [...this.products, { id, ...product }];
    return { id, ...product };
  }

  async getById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
