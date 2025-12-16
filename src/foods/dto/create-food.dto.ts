import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class MetadataDto {
  @ApiPropertyOptional({
    description: 'Cantidad de likes',
    example: 0,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  likes?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de visualizaciones',
    example: 0,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  views?: number;
}

export class CreateFoodDto {
  @ApiProperty({
    description: 'Nombre del plato',
    example: 'Café',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({
    description: 'Orden de visualización',
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El orden es obligatorio' })
  order: number;

  @ApiPropertyOptional({
    description: 'Calificación del plato (1-5)',
    example: 5,
    default: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({
    description: 'Descripción del plato',
    example: 'El café es una bebida popular y estimulante que se obtiene de las semillas',
  })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description: string;

  @ApiPropertyOptional({
    description: 'URL de la imagen de portada',
    example: 'https://firebasestorage.googleapis.com/v0/b/cocha-turismo.appspot.com/__',
    default: '',
  })
  @IsString()
  @IsOptional()
  coverUrl?: string;

  @ApiPropertyOptional({
    description: 'Indica si el plato está disponible',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @ApiPropertyOptional({
    description: 'Indica si el plato está activo',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiPropertyOptional({
    description: 'Metadatos (likes y views)',
    type: MetadataDto,
  })
  @ValidateNested()
  @Type(() => MetadataDto)
  @IsOptional()
  metadata?: MetadataDto;

  @ApiPropertyOptional({
    description: 'Slug del plato',
    example: 'cafe',
    default: '',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({
    description: 'Lista de ingredientes',
    example: ['Café molido', 'Agua', 'Azúcar'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ingredients?: string[];
}
