import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  /**
   * El identificador único de la categoría (UUID).
   * @example 550e8400-e29b-41d4-a716-446655440000
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

   /**
   * El nombre de la categoría. Debe ser único y no exceder los 50 caracteres.
   * @example Electrónica
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  /**
   * Los productos asociados a esta categoría. Es una relación con la entidad Product.
   * @example [
   *   { "id": "1", "name": "Laptop HP Envy", "price": 999.99 },
   *   { "id": "2", "name": "Mouse Logitech MX", "price": 49.99 }
   * ]
   */
  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn()
  products: Product[];
}
