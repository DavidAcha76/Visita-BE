import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { TransportRoutesService } from './transport-routes.service';
import { CreateTransportRouteDto, TransportFileType } from './dto/create-transport-route.dto';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('transport-routes')
@Controller('transport-routes')
export class TransportRoutesController {
  constructor(private readonly service: TransportRoutesService) {}

  @Post('import')
  @ApiOperation({ summary: 'Import all geojson files from src/GeoJSON/individual-rutes' })
  async importFromFolder() {
    // source folder relative to project root
    const src = 'src/GeoJSON/individual-rutes';
    const inserted = await this.service.importFromFolder(src);
    return { inserted };
  }

  @Post()
  @ApiOperation({ summary: 'Create transport route via file upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        tipoArchivo: { type: 'string', enum: ['kml', 'geojson'] },
        file: { type: 'string', format: 'binary' },
      },
      required: ['nombre', 'tipoArchivo', 'file'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '..', '..', 'uploads', 'transport-routes');
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const name = file.originalname
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-_.]/g, '');
          const fileExt = extname(file.originalname);
          const timestamp = Date.now();
          cb(null, `${timestamp}-${Math.round(Math.random() * 1e9)}-${name}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedExt = ['.kml', '.geojson'];
        const fileExt = extname(file.originalname).toLowerCase();
        if (!allowedExt.includes(fileExt)) {
          return cb(new BadRequestException('Only .kml and .geojson files are allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    }),
  )
  async create(@Body() dto: CreateTransportRouteDto, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Ensure tipoArchivo matches file extension
    const ext = extname(file.originalname).toLowerCase();
    const extToType = ext === '.kml' ? TransportFileType.KML : TransportFileType.GEOJSON;
    if (dto.tipoArchivo !== extToType) {
      // Optionally: delete the uploaded file if mismatch
      throw new BadRequestException('tipoArchivo does not match uploaded file extension');
    }

    const archivoUrl = `/uploads/transport-routes/${file.filename}`;

    const payload: any = {
      nombre: dto.nombre,
      tipoArchivo: dto.tipoArchivo,
      archivoUrl,
    };

    // If geojson, read and parse file content and store in DB
    if (ext === '.geojson') {
      try {
        const uploadPath = join(__dirname, '..', '..', 'uploads', 'transport-routes', file.filename);
        const content = readFileSync(uploadPath, 'utf8');
        payload.geojson = JSON.parse(content);
      } catch (err) {
        // If parsing fails, respond with an error
        throw new BadRequestException('Uploaded geojson could not be parsed');
      }
    }

    const created = await this.service.create(payload);

    return created;
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('files/list')
  @ApiOperation({ summary: 'Obtener lista de todas las rutas desde archivos GeoJSON' })
  async getAllRoutesFromFiles() {
    return this.service.getAllRoutesFromFiles();
  }

  @Get('files/:fileName')
  @ApiOperation({ summary: 'Obtener archivo GeoJSON específico por nombre' })
  async getRouteFile(@Param('fileName') fileName: string) {
    return this.service.getRouteFile(fileName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
