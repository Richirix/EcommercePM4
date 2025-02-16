import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './orderDetails.entity';
import { User } from './users.entity';
@Entity('orders')
export class Order {
  /**
   * El identificador único de la orden (UUID).
   * @example 550e8400-e29b-41d4-a716-446655440000
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * La fecha en que se generó la orden. Por defecto, se establece como la fecha y hora actual.
   * @example 2024-12-17T10:30:00Z
   */
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  /**
   * Los detalles de la orden. Es una relación con la entidad OrderDetail.
   * @example [
   *   { "id": "1", "price": 99.99, "product": { "id": "1", "name": "Laptop HP Envy" } },
   *   { "id": "2", "price": 49.99, "product": { "id": "2", "name": "Mouse Logitech MX" } }
   * ]
   */
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail[]; // Cambiado aquí

  /**
   * El usuario asociado a la orden. Es una relación con la entidad User.
   * @example { "id": "1", "name": "Ross Geller", "email": "ross@gmail.com" }
   */
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * El total de la orden. Es un número decimal con hasta 10 dígitos en total y 2 decimales.
   * @example 149.98
   */
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;
}
