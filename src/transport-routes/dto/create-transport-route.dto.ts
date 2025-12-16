import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TransportFileType {
  KML = 'kml',
  GEOJSON = 'geojson',
}

export class CreateTransportRouteDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @ApiProperty({ description: 'Nombre de la ruta' })
  nombre: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  @ApiPropertyOptional({ description: 'URL pública del archivo (generada en servidor)' })
  archivoUrl?: string;

  @IsEnum(TransportFileType)
  @IsNotEmpty()
  @ApiProperty({ enum: TransportFileType, description: "Tipo de archivo: 'kml' o 'geojson'" })
  tipoArchivo: TransportFileType;
}
