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
import { AttractionsService } from './attractions.service';
import { CreateAtractivoDto } from './dto/create-atractivo.dto';
import { UpdateAtractivoDto } from './dto/update-atractivo.dto';

@ApiTags('attractions')
@Controller('attractions')
export class AttractionsController {
  constructor(private readonly attractionsService: AttractionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo atractivo' })
  @ApiResponse({ status: 201, description: 'Atractivo creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createAtractivoDto: CreateAtractivoDto) {
    return this.attractionsService.create(createAtractivoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los atractivos' })
  @ApiQuery({ name: 'categoria', required: false, description: 'Filtrar por categoría' })
  @ApiResponse({ status: 200, description: 'Lista de atractivos' })
  findAll(@Query('categoria') categoria?: string) {
    if (categoria) {
      return this.attractionsService.findByCategoria(categoria);
    }
    return this.attractionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un atractivo por ID' })
  @ApiParam({ name: 'id', description: 'ID del atractivo' })
  @ApiResponse({ status: 200, description: 'Atractivo encontrado' })
  @ApiResponse({ status: 404, description: 'Atractivo no encontrado' })
  findOne(@Param('id') id: string) {
    return this.attractionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un atractivo' })
  @ApiParam({ name: 'id', description: 'ID del atractivo' })
  @ApiResponse({ status: 200, description: 'Atractivo actualizado' })
  @ApiResponse({ status: 404, description: 'Atractivo no encontrado' })
  update(@Param('id') id: string, @Body() updateAtractivoDto: UpdateAtractivoDto) {
    return this.attractionsService.update(id, updateAtractivoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un atractivo' })
  @ApiParam({ name: 'id', description: 'ID del atractivo' })
  @ApiResponse({ status: 200, description: 'Atractivo eliminado' })
  @ApiResponse({ status: 404, description: 'Atractivo no encontrado' })
  remove(@Param('id') id: string) {
    return this.attractionsService.remove(id);
  }
}
