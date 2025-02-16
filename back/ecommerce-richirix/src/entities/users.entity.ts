import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
   /**
   * El identificador único del usuario (UUID).
   * @example 550e8400-e29b-41d4-a716-446655440000
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()
/**
   * El email del usuario. Debe ser único y no puede estar vacío.
   * @example rrz@gmail.com
   */

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  /**
   * El nombre del usuario. No puede estar vacío y tiene un máximo de 50 caracteres.
   * @example Ricardo
   */
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /**
   * La contraseña del usuario. Debe estar cifrada en la base de datos
   * @example Ricardo123!
   */
  @Column({ type: 'varchar', nullable: false })
  password: string;

  /**
   * El número de teléfono del usuario.
   * @example 1234567890
   */
  @Column('varchar', { length: 15, nullable: true })
  phone: number;

  /**
   * El país del usuario. Es opcional y tiene un máximo de 50 caracteres.
   * @example Mexico
   */
  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  /**
   * La dirección del usuario. Es opcional y puede ser un texto largo.
   * @example Calle Falsa 123
   */
  @Column('text', { nullable: true })
  address: string;

  /**
   * La ciudad del usuario. Es opcional y tiene un máximo de 50 caracteres.
   * @example Tlaxcala
   */
  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  /**
   * Indica si el usuario es administrador. Por defecto es falso.
   * @example true
   */
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  /**
   * Las órdenes asociadas al usuario. Es una relación con la entidad Order.
   * @example [{ "id": "1", "total": 100, "status": "completed" }]
   */
  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'ordersId' })
  orders?: Order[];
}
