import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/orderDetails.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { AddOrderDto } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async addOrder(
    userId: string,
    products: { id: string }[],
  ): Promise<AddOrderDto> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const newOrder = this.ordersRepository.create({ user });
    const savedOrder = await this.ordersRepository.save(newOrder);

    let total = 0;
    const orderDetails = [];

    
    if (!products || products.length === 0) {
      throw new Error('La lista de productos no puede estar vacía');
    }

    
    for (const productData of products) {
      const product = await this.productsRepository.findOneBy({
        id: productData.id,
      });

      if (!product) {
        throw new Error(`Producto con id ${productData.id} no encontrado`);
      }

      if (product.stock <= 0) {
        continue; 
      }

      const price = Number(product.price);
      if (isNaN(price) || price <= 0) {
        continue; 
      }

      product.stock -= 1; 
      await this.productsRepository.save(product);

      const orderDetail = {
        product: product,
        order: savedOrder,
        price: price,
        quantity: 1,
      };

      orderDetails.push(orderDetail);
      total += price; 
    }

    
    await this.orderDetailsRepository.save(orderDetails);

    
    savedOrder.total = Math.round(total * 100) / 100;
    await this.ordersRepository.save(savedOrder);

    
    const responseObject: AddOrderDto = {
      userId: savedOrder.user.id,
      products: products.map((productData) => ({ id: productData.id })),
    };

    return responseObject;
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['orderDetail', 'orderDetail.product'],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
}
