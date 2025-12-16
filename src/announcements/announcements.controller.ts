import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Anuncios')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los anuncios' })
  @ApiResponse({ status: 200, description: 'Lista de anuncios obtenida exitosamente' })
  async findAll() {
    return await this.announcementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un anuncio por ID' })
  @ApiParam({ name: 'id', description: 'ID del anuncio (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Anuncio encontrado' })
  @ApiResponse({ status: 404, description: 'Anuncio no encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.announcementsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo anuncio' })
  @ApiResponse({ status: 201, description: 'Anuncio creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return await this.announcementsService.create(createAnnouncementDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un anuncio' })
  @ApiParam({ name: 'id', description: 'ID del anuncio (MongoDB ObjectId)' })
  @ApiResponse({ status: 200, description: 'Anuncio actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Anuncio no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async update(@Param('id') id: string, @Body() updateAnnouncementDto: UpdateAnnouncementDto) {
    return await this.announcementsService.update(id, updateAnnouncementDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un anuncio' })
  @ApiParam({ name: 'id', description: 'ID del anuncio (MongoDB ObjectId)' })
  @ApiResponse({ status: 204, description: 'Anuncio eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Anuncio no encontrado' })
  async delete(@Param('id') id: string) {
    return await this.announcementsService.delete(id);
  }
}
