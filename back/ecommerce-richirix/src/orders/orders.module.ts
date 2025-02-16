import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { OrderDetail } from 'src/entities/orderDetails.entity';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, OrderDetail, User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
