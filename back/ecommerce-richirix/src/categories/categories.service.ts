import { Injectable } from '@nestjs/common';
import * as data from '../data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  addCategories() {
   

    data.map(async (product) => {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: product.category })
        .onConflict(`("name")DO NOTHING`)
        .execute();
    });
    return 'Categories Added'
  }

  async getCategoires() {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

}
