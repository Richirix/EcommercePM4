import { Module } from '@nestjs/common';
import { FileUploapService } from './file-uploap.service';
import { FileUploapController } from './file-uploap.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadRepositoy } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploapController],
  providers: [FileUploapService, CloudinaryConfig, FileUploadRepositoy],
})
export class FileUploapModule {}
