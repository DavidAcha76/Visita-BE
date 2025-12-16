import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAtractivoDto {
  @ApiProperty({ description: 'ID único del atractivo', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Nombre del atractivo', example: 'Cristo de la Concordia' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Descripción del atractivo', example: 'Monumento icónico de Cochabamba' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ description: 'Ubicación del atractivo', example: 'Cerro de San Pedro' })
  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @ApiProperty({ description: 'URL de la imagen', example: 'https://example.com/imagen.jpg' })
  @IsString()
  @IsNotEmpty()
  imagen: string;

  @ApiProperty({ description: 'Categoría del atractivo', example: 'Monumentos' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiPropertyOptional({ description: 'Horario de atención', example: 'Lunes a Domingo 9:00 - 18:00' })
  @IsString()
  @IsOptional()
  horario?: string;

  @ApiPropertyOptional({ description: 'Precio de entrada', example: 'Bs. 5' })
  @IsString()
  @IsOptional()
  precio?: string;

  @ApiPropertyOptional({ description: 'Teléfono de contacto', example: '4-4123456' })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({ description: 'Estado del atractivo', example: true, default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
