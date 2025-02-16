import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseInterceptors,
  ParseUUIDPipe,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/entities/order.entity';
import { ExcludePasswordInterceptor } from 'src/interceptors/exclude-password.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddOrderDto } from './orders.dto';

@ApiTags('Orders')
@Controller('orders')
@UseInterceptors(ExcludePasswordInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @ApiBody({
    description: 'Detalles de la orden a crear',
    type: AddOrderDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Orden creada correctamente',
    type: AddOrderDto,
  })
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(
    @Body('userId') userId: string,
    @Body('products') products: { id: string }[],
  ): Promise<AddOrderDto> {
    try {
      const result = await this.ordersService.addOrder(userId, products);
      if (!result) {
        throw new Error('Al menos uno de los productos no existe');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la orden');
    }
  }
  
  @ApiBearerAuth()
  @Get(':orderId')
  @UseGuards(AuthGuard)
  async getOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<Order> {
    try {
      const order = await this.ordersService.getOrder(orderId);
      if (!order) {
        throw new NotFoundException('Orden no encontrada.');
      }
      return order;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener la orden.');
    }
  }
}
