import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json';
import { Category } from 'src/entities/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProduct(page: number, limit: number) {
    const products = await this.productsRepository.find();

    const start = (+page - 1) * +limit;
    const end = start + +limit;
    return products.slice(start, end);
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    data.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      const product = new Product();

      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.category = category;
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'stock'], ['name'])
        .execute();
    });
    return 'Product Added'
  }

  async createProduct(product: Omit<Product, 'id'>) {
    const newProduct = this.productsRepository.create(product);
    return await this.productsRepository.save(newProduct);
  }

  async getProductById(id: string) {
    return await this.productsRepository.findOneBy({ id });
  }

  async updateProductById(id: string, product: Partial<Product>) {
    const oldProduct = await this.productsRepository.findOneBy({ id });
  
    if (!oldProduct) {
      return null;
    }
    const updatedProduct = { ...oldProduct, ...product };
  
    await this.productsRepository.save(updatedProduct);
  
    return updatedProduct;
  }

  async deleteProductById(id: string) {
    return await this.productsRepository.delete(id);
  }
}