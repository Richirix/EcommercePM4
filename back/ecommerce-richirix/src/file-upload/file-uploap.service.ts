import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepositoy } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FileUploapService {
  constructor(
    private fileUploadRepository: FileUploadRepositoy,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {

    const product = await this.productsRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const uploadImage = await this.fileUploadRepository.uploadImage(file);
    
    await this.productsRepository.update(product.id,{
      imgUrl: uploadImage.secure_url,
    })

    return await this.productsRepository.findOneBy({ id: productId });
  }
}
