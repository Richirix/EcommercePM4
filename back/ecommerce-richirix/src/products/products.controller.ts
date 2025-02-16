import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  ParseUUIDPipe,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/product.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProduct(@Query('page') page: number, @Query('limit') limit: number) {
    try {
      if (page && limit) {
        return await this.productsService.getProduct(page, limit);
      }
      return await this.productsService.getProduct(1, 5);
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener productos');
    }
  }

  @Get(`seeder`)
  async addProducts() {
    try {
      return await this.productsService.addProducts();
    } catch (error) {
      throw new InternalServerErrorException('Error al agregar productos');
    }
  }

  @Post()
  async createProduct(@Body() product: Product) {
    try {
      return await this.productsService.createProduct(product);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  @Get(':id')
  async getProductById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const product = await this.productsService.getProductById(id);
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener el producto');
    }
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProductById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Product,
  ) {
    try {
      const updatedProduct = await this.productsService.updateProductById(
        id,
        product,
      );
      if (!updatedProduct) {
        throw new NotFoundException('Producto no encontrado');
      }
      return updatedProduct;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  @Delete(':id')
  async deleteProductById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.productsService.deleteProductById(id);
      if (!result) {
        throw new NotFoundException('Producto no encontrado');
      }
      return { message: 'Producto eliminado correctamente' };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }
}
