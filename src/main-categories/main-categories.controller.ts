import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MainCategoriesService } from './main-categories.service';
import { CreateMainCategoryDto } from './dto/create-main-category.dto';
import { UpdateMainCategoryDto } from './dto/update-main-category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Categorías Principales')
@Controller('main-categories')
export class MainCategoriesController {
  constructor(private readonly mainCategoriesService: MainCategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías principales' })
  @ApiResponse({ status: 200, description: 'Lista de categorías obtenida exitosamente' })
  async findAll() {
    return await this.mainCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría principal por ID' })
  @ApiParam({ name: 'id', description: 'ID de la categoría (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async findOne(@Param('id') id: string) {
    return await this.mainCategoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría principal' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createMainCategoryDto: CreateMainCategoryDto) {
    return await this.mainCategoriesService.create(createMainCategoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría principal' })
  @ApiParam({ name: 'id', description: 'ID de la categoría (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async update(@Param('id') id: string, @Body() updateMainCategoryDto: UpdateMainCategoryDto) {
    return await this.mainCategoriesService.update(id, updateMainCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una categoría principal' })
  @ApiParam({ name: 'id', description: 'ID de la categoría (MongoDB ObjectId)' })
  @ApiResponse({ status: 204, description: 'Categoría eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async delete(@Param('id') id: string) {
    return await this.mainCategoriesService.delete(id);
  }
}
