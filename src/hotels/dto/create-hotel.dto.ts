import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class PrecioDto {
  @ApiProperty({
    description: 'Hora de check-in',
    example: '14:00',
  })
  @IsString()
  @IsNotEmpty()
  check_in: string;

  @ApiProperty({
    description: 'Hora de check-out',
    example: '12:00',
  })
  @IsString()
  @IsNotEmpty()
  check_out: string;
}

class UbicacionDto {
  @ApiPropertyOptional({
    description: 'Dirección del hotel',
    example: 'Av. Ballivián 123',
  })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Ciudad',
    example: 'Cochabamba',
  })
  @IsString()
  @IsOptional()
  ciudad?: string;

  @ApiPropertyOptional({
    description: 'País',
    example: 'Bolivia',
  })
  @IsString()
  @IsOptional()
  pais?: string;

  @ApiPropertyOptional({
    description: 'Coordenadas geográficas',
    example: { lat: -17.3935, lng: -66.1570 },
  })
  @IsOptional()
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

class ContactoDto {
  @ApiPropertyOptional({
    description: 'Teléfono de contacto',
    example: '+591 4 1234567',
  })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Email de contacto',
    example: 'info@hotel.com',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Sitio web del hotel',
    example: 'https://www.hotel.com',
  })
  @IsString()
  @IsOptional()
  sitio_web?: string;
}

export class CreateHotelDto {
  @ApiProperty({
    description: 'ID único del hotel',
    example: 'hotel-llajta',
  })
  @IsString()
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  id: string;

  @ApiPropertyOptional({
    description: 'Slug del hotel',
    example: 'hostal-andes',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Nombre del hotel',
    example: 'Hotel Llajta',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiProperty({
    description: 'Descripción del hotel',
    example: 'Hotel céntrico con desayuno incluido y WiFi',
  })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @ApiProperty({
    description: 'Cantidad de estrellas (1-5)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty({ message: 'Las estrellas son obligatorias' })
  estrellas: number;

  @ApiPropertyOptional({
    description: 'Calificación del hotel (0-5)',
    example: 4.3,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({
    description: 'Categorías del hotel',
    example: ['boutique', 'business'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categorias?: string[];

  @ApiPropertyOptional({
    description: 'Amenidades del hotel',
    example: ['WiFi', 'Parking', 'Desayuno'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenidades?: string[];

  @ApiPropertyOptional({
    description: 'Tipos de habitación disponibles',
    example: ['Simple', 'Doble', 'Suite'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tipos_habitacion?: string[];

  @ApiProperty({
    description: 'Horarios de check-in y check-out',
    type: PrecioDto,
  })
  @ValidateNested()
  @Type(() => PrecioDto)
  @IsNotEmpty({ message: 'Los horarios son obligatorios' })
  precio: PrecioDto;

  @ApiPropertyOptional({
    description: 'Ubicación del hotel',
    type: UbicacionDto,
  })
  @ValidateNested()
  @Type(() => UbicacionDto)
  @IsOptional()
  ubicacion?: UbicacionDto;

  @ApiPropertyOptional({
    description: 'Información de contacto',
    type: ContactoDto,
  })
  @ValidateNested()
  @Type(() => ContactoDto)
  @IsOptional()
  contacto?: ContactoDto;

  @ApiPropertyOptional({
    description: 'Indica si el hotel está disponible',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}
