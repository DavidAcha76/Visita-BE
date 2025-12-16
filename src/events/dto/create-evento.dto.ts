import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventoDto {
  @ApiProperty({ description: 'ID único del evento', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Nombre del evento', example: 'Festival del Chocolate' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Descripción del evento', example: 'Celebración del chocolate cochabambino' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ description: 'Fecha del evento', example: '2024-05-27' })
  @IsString()
  @IsNotEmpty()
  fecha: string;

  @ApiProperty({ description: 'Lugar del evento', example: 'Plaza 14 de Septiembre' })
  @IsString()
  @IsNotEmpty()
  lugar: string;

  @ApiProperty({ description: 'URL de la imagen', example: 'https://example.com/imagen.jpg' })
  @IsString()
  @IsNotEmpty()
  imagen: string;

  @ApiPropertyOptional({ description: 'Hora del evento', example: '18:00' })
  @IsString()
  @IsOptional()
  hora?: string;

  @ApiPropertyOptional({ description: 'Organizador del evento', example: 'Municipalidad de Cochabamba' })
  @IsString()
  @IsOptional()
  organizador?: string;

  @ApiPropertyOptional({ description: 'Precio de entrada', example: 'Gratis' })
  @IsString()
  @IsOptional()
  precio?: string;

  @ApiPropertyOptional({ description: 'Categoría del evento', example: 'Cultural' })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiPropertyOptional({ description: 'Estado del evento', example: true, default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
