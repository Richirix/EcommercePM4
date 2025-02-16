import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsArray } from 'class-validator';



export class AddOrderDto {
  /**
   * El ID del usuario que realiza la orden.
   * @example 'a232279b-0618-4684-aba8-65b60a6c1e48'
   */
  @ApiProperty({
    description: 'El ID del usuario que realiza la orden.',
    example: 'a232279b-0618-4684-aba8-65b60a6c1e48',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * Los productos asociados a esta orden. Cada producto tiene un ID único.
   * @example { id: '18ab3b2e-6fec-4623-a4c6-60b64b3b3a13' }
   */
  @ApiProperty({
    description: 'Lista de productos asociados a esta orden.',
    type: [Object], // Esto indica que es un array de objetos
    example: [
      { id: '18ab3b2e-6fec-4623-a4c6-60b64b3b3a13' },
      { id: '193101a2-8511-40b4-9c1a-424362523683' }
    ]
  })
  @IsArray()
  @IsNotEmpty()
  products: { id: string }[];
}
