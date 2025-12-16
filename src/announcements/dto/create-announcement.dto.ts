import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class LocationDto {
  @ApiProperty({
    description: 'Dirección del anuncio',
    example: 'Av. Kilian',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Lugar específico',
    example: 'Parque Killman',
  })
  @IsString()
  @IsNotEmpty()
  place: string;

  @ApiPropertyOptional({
    description: 'Coordenadas geográficas',
    example: { lng: '', lat: '' },
  })
  @IsOptional()
  @IsObject()
  coords?: {
    lng: string;
    lat: string;
  };
}

export class CreateAnnouncementDto {
  @ApiProperty({
    description: 'Fecha del anuncio',
    example: '2024-11-17T12:00:00.863Z',
  })
  @IsString()
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  date: string;

  @ApiPropertyOptional({
    description: 'URL de la imagen de portada',
    example: 'https://example.com/cover.jpg',
    default: '',
  })
  @IsString()
  @IsOptional()
  coverUrl?: string;

  @ApiPropertyOptional({
    description: 'Color del anuncio',
    example: 'red',
    default: 'red',
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({
    description: 'Indica si el anuncio está disponible',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @ApiPropertyOptional({
    description: 'Descripción del anuncio',
    example: 'Feria del Cuy',
    default: '',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Ubicación del anuncio',
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  location: LocationDto;

  @ApiProperty({
    description: 'Tipo de anuncio',
    example: 'Feria',
  })
  @IsString()
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  type: string;

  @ApiProperty({
    description: 'Título del anuncio',
    example: 'Feria del Cuy 🐹',
  })
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @ApiPropertyOptional({
    description: 'Orden de visualización',
    example: 50,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional({
    description: 'Enlace relacionado',
    example: 'https://example.com',
    default: '',
  })
  @IsString()
  @IsOptional()
  link?: string;
}
