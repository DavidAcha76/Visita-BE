import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMainCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría principal',
    example: 'Religioso',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiPropertyOptional({
    description: 'Indica si la categoría es destacada',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    description: 'URL de la foto de la categoría',
    example: 'https://firebasestorage.googleapis.com/v0/b/cocha-turismo.appspot.com/__',
    default: '',
  })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiPropertyOptional({
    description: 'Icono de la categoría',
    example: 'mapsphone-outline',
    default: '',
  })
  @IsString()
  @IsOptional()
  icon?: string;

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
    example: 60,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El orden es obligatorio' })
  order: number;
}
