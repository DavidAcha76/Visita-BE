import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PoisService } from './pois.service';
import { CreatePoiDto } from './dto/create-poi.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Puntos de Interés (POIs)')
@Controller('pois')
export class PoisController {
  constructor(private readonly poisService: PoisService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los puntos de interés' })
  @ApiResponse({ status: 200, description: 'Lista de POIs obtenida exitosamente' })
  async findAll() {
    return await this.poisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un POI por ID' })
  @ApiParam({ name: 'id', description: 'ID del POI (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'POI encontrado' })
  @ApiResponse({ status: 404, description: 'POI no encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.poisService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo punto de interés' })
  @ApiResponse({ status: 201, description: 'POI creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createPoiDto: CreatePoiDto) {
    return await this.poisService.create(createPoiDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un punto de interés' })
  @ApiParam({ name: 'id', description: 'ID del POI (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'POI actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'POI no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async update(@Param('id') id: string, @Body() updatePoiDto: UpdatePoiDto) {
    return await this.poisService.update(id, updatePoiDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un punto de interés' })
  @ApiParam({ name: 'id', description: 'ID del POI (MongoDB ObjectId)' })
  @ApiResponse({ status: 204, description: 'POI eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'POI no encontrado' })
  async delete(@Param('id') id: string) {
    return await this.poisService.delete(id);
  }
}
