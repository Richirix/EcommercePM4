import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity('order_details')
export class OrderDetail {
  /**
   * El identificador único del detalle de la orden (UUID).
   * @example 550e8400-e29b-41d4-a716-446655440000
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

   /**
   * El precio asociado al producto en esta orden. Es un número decimal con hasta 10 dígitos en total y 2 decimales.
   * @example 99.99
   */
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  /**
   * El producto asociado a este detalle de la orden. Es una relación con la entidad Product.
   * @example { "id": "1", "name": "Laptop HP Envy", "price": 999.99 }
   */
  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn({
    name: 'productId',
  })
  product: Product;

   /**
   * La orden a la que pertenece este detalle. Es una relación con la entidad Order.
   * @example { "id": "1", "total": 1999.98, "status": "completed" }
   */
  @ManyToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn({
    name: 'orderId',
  })
  order: Order;

  
}