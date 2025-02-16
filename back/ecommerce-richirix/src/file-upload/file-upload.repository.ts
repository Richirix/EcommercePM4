import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import toStrem = require('buffer-to-stream');
@Injectable()
export class FileUploadRepositoy {
  async uploadImage(file: Express.Multer.File) {
    const upload = () => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );
        toStrem(file.buffer).pipe(uploadStream);
      });
    };
    return await upload();
  }
}
