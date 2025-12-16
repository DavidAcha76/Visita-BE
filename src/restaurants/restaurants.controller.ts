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
import { RestaurantsService } from './restaurants.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly RestaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo restaurante' })
  @ApiResponse({ status: 201, description: 'Restaurante creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createRestauranteDto: CreateRestauranteDto) {
    return this.RestaurantsService.create(createRestauranteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los restaurantes' })
  @ApiQuery({ name: 'categoria', required: false, description: 'Filtrar por categoría' })
  @ApiResponse({ status: 200, description: 'Lista de restaurantes' })
  findAll(@Query('categoria') categoria?: string) {
    if (categoria) {
      return this.RestaurantsService.findByCategoria(categoria);
    }
    return this.RestaurantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un restaurante por ID' })
  @ApiParam({ name: 'id', description: 'ID del restaurante' })
  @ApiResponse({ status: 200, description: 'Restaurante encontrado' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  findOne(@Param('id') id: string) {
    return this.RestaurantsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un restaurante' })
  @ApiParam({ name: 'id', description: 'ID del restaurante' })
  @ApiResponse({ status: 200, description: 'Restaurante actualizado' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  update(@Param('id') id: string, @Body() updateRestauranteDto: UpdateRestauranteDto) {
    return this.RestaurantsService.update(+id, updateRestauranteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un restaurante' })
  @ApiParam({ name: 'id', description: 'ID del restaurante' })
  @ApiResponse({ status: 200, description: 'Restaurante eliminado' })
  @ApiResponse({ status: 404, description: 'Restaurante no encontrado' })
  remove(@Param('id') id: string) {
    return this.RestaurantsService.remove(+id);
  }
}
