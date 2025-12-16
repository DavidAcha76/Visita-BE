import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRestaurantCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría de restaurante',
    example: 'Cafeterías',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiPropertyOptional({
    description: 'Indica si la categoría está disponible',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @ApiProperty({
    description: 'Orden de visualización',
    example: 30,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El orden es obligatorio' })
  order: number;
}
