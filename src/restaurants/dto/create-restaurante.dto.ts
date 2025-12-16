import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRestauranteDto {
  @ApiProperty({ description: 'ID único del restaurante', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Nombre del restaurante', example: 'Casa de la Pasta' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Descripción del restaurante', example: 'Restaurante italiano tradicional' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ description: 'Ubicación del restaurante', example: 'Centro de Cochabamba' })
  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @ApiProperty({ description: 'URL de la imagen', example: 'https://example.com/imagen.jpg' })
  @IsString()
  @IsNotEmpty()
  imagen: string;

  @ApiProperty({ description: 'Categoría del restaurante', example: 'Comida Italiana' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiPropertyOptional({ description: 'Horario de atención', example: 'Lunes a Domingo 12:00 - 23:00' })
  @IsString()
  @IsOptional()
  horario?: string;

  @ApiPropertyOptional({ description: 'Precio promedio', example: 'Bs. 50 - Bs. 80' })
  @IsString()
  @IsOptional()
  precioPromedio?: string;

  @ApiPropertyOptional({ description: 'Teléfono de contacto', example: '4-4123456' })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({ description: 'Especialidades del restaurante', example: ['Pizza', 'Pasta', 'Lasagna'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  especialidades?: string[];

  @ApiPropertyOptional({ description: 'Estado del restaurante', example: true, default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
