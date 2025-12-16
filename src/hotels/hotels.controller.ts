import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Hoteles')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los hoteles' })
  @ApiResponse({ status: 200, description: 'Lista de hoteles obtenida exitosamente' })
  async findAll() {
    return await this.hotelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un hotel por ID' })
  @ApiParam({ name: 'id', description: 'ID del hotel (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Hotel encontrado' })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.hotelsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo hotel' })
  @ApiResponse({ status: 201, description: 'Hotel creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createHotelDto: CreateHotelDto) {
    return await this.hotelsService.create(createHotelDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un hotel' })
  @ApiParam({ name: 'id', description: 'ID del hotel (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Hotel actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return await this.hotelsService.update(id, updateHotelDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un hotel' })
  @ApiParam({ name: 'id', description: 'ID del hotel (MongoDB ObjectId)' })
  @ApiResponse({ status: 204, description: 'Hotel eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado' })
  async delete(@Param('id') id: string) {
    return await this.hotelsService.delete(id);
  }
}
