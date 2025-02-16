import { Category } from 'src/entities/categories.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './orderDetails.entity';

@Entity('products')
export class Product {
  
  /**
   * El identificador único del producto (UUID).
   * @example 550e8400-e29b-41d4-a716-446655440000
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * El nombre del producto. Debe ser único, no puede estar vacío y tiene un máximo de 50 caracteres.
   * @example Laptop HP Envy
   */
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  /**
   * La descripción del producto. No puede estar vacía y admite texto largo.
   * @example Laptop con procesador Intel i7, 16GB RAM y SSD de 512GB.
   */
  @Column({ type: 'text', nullable: false })
  description: string;


  /**
   * El precio del producto. Es un número decimal con hasta 10 dígitos en total y 2 decimales.
   * @example 999.99
   */
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * El stock disponible del producto. Es un número entero.
   * @example 25
   */
  @Column('int', { nullable: false })
  stock: number;

  /**
   * La URL de la imagen del producto. No puede estar vacía y admite texto largo.
   * @example https://example.com/images/laptop.jpg
   */
  @Column({ type: 'text', nullable: false, default: 'texto' })
  imgUrl: string;

  /**
   * La categoría a la que pertenece el producto. Es una relación con la entidad Category.
   * @example { "id": "1", "name": "Electrónica" }
   */
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({
    name: 'categoryId'
  })
  category: Category;

  /**
   * Detalles de las órdenes asociadas al producto. Es una relación con la entidad OrderDetail.
   * @example [{ "orderId": "1", "quantity": 2, "subtotal": 1999.98 }]
   */
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];
}