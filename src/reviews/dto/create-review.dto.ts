import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsArray, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'ID único de la reseña',
    example: 'review-hotel-llajta-1',
  })
  @IsString()
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  id: string;

  @ApiProperty({
    description: 'ID de la entidad relacionada (hotel, restaurante, etc.)',
    example: 'hotel-llajta',
  })
  @IsString()
  @IsNotEmpty({ message: 'El ID de la entidad es obligatorio' })
  entidad_id: string;

  @ApiProperty({
    description: 'Tipo de entidad (hotel, restaurant, poi, etc.)',
    example: 'hotel',
  })
  @IsString()
  @IsNotEmpty({ message: 'El tipo de entidad es obligatorio' })
  entidad_tipo: string;

  @ApiProperty({
    description: 'Nombre del usuario que hace la reseña',
    example: 'María González',
  })
  @IsString()
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  usuario: string;

  @ApiProperty({
    description: 'Calificación de 1 a 5',
    example: 4.5,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty({ message: 'El rating es obligatorio' })
  rating: number;

  @ApiProperty({
    description: 'Título de la reseña',
    example: 'Excelente ubicación y servicio',
  })
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @ApiProperty({
    description: 'Comentario detallado',
    example: 'El hotel tiene una ubicación perfecta, el desayuno es delicioso y el personal muy atento',
  })
  @IsString()
  @IsNotEmpty({ message: 'El comentario es obligatorio' })
  comentario: string;

  @ApiProperty({
    description: 'Fecha de la reseña',
    example: '2024-11-15',
  })
  @IsString()
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  fecha: string;

  @ApiPropertyOptional({
    description: 'Tipo de viaje',
    example: 'familia',
    default: '',
  })
  @IsString()
  @IsOptional()
  viaje_tipo?: string;

  @ApiPropertyOptional({
    description: 'Aspectos positivos destacados',
    example: ['Ubicación', 'Limpieza', 'Personal amable'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  aspectos_positivos?: string[];

  @ApiPropertyOptional({
    description: 'Aspectos negativos mencionados',
    example: ['Ruido en la noche'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  aspectos_negativos?: string[];

  @ApiPropertyOptional({
    description: 'Indica si el usuario recomienda el lugar',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  recomendado?: boolean;

  @ApiPropertyOptional({
    description: 'Indica si la reseña está verificada',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  verificado?: boolean;
}
