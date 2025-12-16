import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly EventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo evento' })
  @ApiResponse({ status: 201, description: 'Evento creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.EventsService.create(createEventoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los eventos' })
  @ApiQuery({ name: 'categoria', required: false, description: 'Filtrar por categoría' })
  @ApiQuery({ name: 'proximos', required: false, description: 'Solo eventos próximos' })
  @ApiResponse({ status: 200, description: 'Lista de eventos' })
  findAll(@Query('categoria') categoria?: string, @Query('proximos') proximos?: string) {
    if (proximos === 'true') {
      return this.EventsService.findProximos();
    }
    if (categoria) {
      return this.EventsService.findByCategoria(categoria);
    }
    return this.EventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un evento por ID' })
  @ApiParam({ name: 'id', description: 'ID del evento' })
  @ApiResponse({ status: 200, description: 'Evento encontrado' })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  findOne(@Param('id') id: string) {
    return this.EventsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un evento' })
  @ApiParam({ name: 'id', description: 'ID del evento' })
  @ApiResponse({ status: 200, description: 'Evento actualizado' })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.EventsService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un evento' })
  @ApiParam({ name: 'id', description: 'ID del evento' })
  @ApiResponse({ status: 200, description: 'Evento eliminado' })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  remove(@Param('id') id: string) {
    return this.EventsService.remove(+id);
  }
}
