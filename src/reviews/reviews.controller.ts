import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Reseñas')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las reseñas' })
  @ApiResponse({ status: 200, description: 'Lista de reseñas obtenida exitosamente' })
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @Get('entity/:entidadId')
  @ApiOperation({ summary: 'Obtener reseñas por entidad' })
  @ApiParam({ name: 'entidadId', description: 'ID de la entidad' })
  @ApiQuery({ name: 'tipo', description: 'Tipo de entidad (hotel, restaurant, etc.)', required: true })
  @ApiResponse({ status: 200, description: 'Reseñas encontradas' })
  async findByEntity(@Param('entidadId') entidadId: string, @Query('tipo') tipo: string) {
    return await this.reviewsService.findByEntity(entidadId, tipo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reseña por ID' })
  @ApiParam({ name: 'id', description: 'ID de la reseña (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Reseña encontrada' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  async findOne(@Param('id') id: string) {
    return await this.reviewsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewsService.create(createReviewDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una reseña' })
  @ApiParam({ name: 'id', description: 'ID de la reseña (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Reseña actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una reseña' })
  @ApiParam({ name: 'id', description: 'ID de la reseña (MongoDB ObjectId)' })
  @ApiResponse({ status: 204, description: 'Reseña eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  async delete(@Param('id') id: string) {
    return await this.reviewsService.delete(id);
  }
}
