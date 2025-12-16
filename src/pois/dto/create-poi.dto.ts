import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UbicacionDto {
  @ApiPropertyOptional({
    description: 'Dirección del punto de interés',
    example: 'Av. Heroínas 123',
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

export class CreatePoiDto {
  @ApiProperty({
    description: 'ID único del punto de interés',
    example: 'cristo-concordia',
  })
  @IsString()
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  id: string;

  @ApiPropertyOptional({
    description: 'Slug del POI',
    example: 'laguna-alalay',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Nombre del punto de interés',
    example: 'Cristo de la Concordia',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiProperty({
    description: 'Descripción del punto de interés',
    example: 'Estatua de Cristo más grande del mundo, ofrece vista panorámica de la ciudad',
  })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @ApiPropertyOptional({
    description: 'Categorías del POI',
    example: ['turismo', 'religioso'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categorias?: string[];

  @ApiPropertyOptional({
    description: 'Tags del POI',
    example: ['mirador', 'monumento'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Ubicación del punto de interés',
    type: UbicacionDto,
  })
  @ValidateNested()
  @Type(() => UbicacionDto)
  @IsOptional()
  ubicacion?: UbicacionDto;

  @ApiProperty({
    description: 'Horario de atención',
    example: '09:00 - 18:00',
  })
  @IsString()
  @IsNotEmpty({ message: 'El horario es obligatorio' })
  horario: string;

  @ApiPropertyOptional({
    description: 'Costo de entrada',
    example: 5,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  costo_entrada?: number;

  @ApiPropertyOptional({
    description: 'Moneda del costo',
    example: 'BOB',
    default: '',
  })
  @IsString()
  @IsOptional()
  moneda?: string;

  @ApiPropertyOptional({
    description: 'Indica si la entrada es gratis',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  gratis?: boolean;

  @ApiPropertyOptional({
    description: 'Actividades disponibles',
    example: ['Senderismo', 'Fotografía', 'Observación'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  actividades?: string[];

  @ApiPropertyOptional({
    description: 'Recomendaciones para visitantes',
    example: ['Llevar agua', 'Usar protector solar', 'Calzado cómodo'],
    default: [],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  recomendaciones?: string[];

  @ApiPropertyOptional({
    description: 'Indica si el POI está disponible',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}
