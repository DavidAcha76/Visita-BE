import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAttractionCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Iglesias',
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
    example: 70,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El orden es obligatorio' })
  order: number;
}
