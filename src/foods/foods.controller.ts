import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Comidas Típicas')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las comidas típicas' })
  @ApiResponse({ status: 200, description: 'Lista de comidas obtenida exitosamente' })
  async findAll() {
    return await this.foodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una comida por ID' })
  @ApiParam({ name: 'id', description: 'ID de la comida (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Comida encontrada' })
  @ApiResponse({ status: 404, description: 'Comida no encontrada' })
  async findOne(@Param('id') id: string) {
    return await this.foodsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva comida típica' })
  @ApiResponse({ status: 201, description: 'Comida creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createFoodDto: CreateFoodDto) {
    return await this.foodsService.create(createFoodDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una comida típica' })
  @ApiParam({ name: 'id', description: 'ID de la comida (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Comida actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Comida no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return await this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una comida típica' })
  @ApiParam({ name: 'id', description: 'ID de la comida (MongoDB ObjectId)' })
  @ApiResponse({ status: 204, description: 'Comida eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Comida no encontrada' })
  async delete(@Param('id') id: string) {
    return await this.foodsService.delete(id);
  }
}
