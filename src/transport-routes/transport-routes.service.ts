import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransportRoute, TransportRouteDocument } from './transport-route.schema';
import { join } from 'path';
import { readdirSync, readFileSync, copyFileSync, existsSync, mkdirSync } from 'fs';

@Injectable()
export class TransportRoutesService {
  constructor(
    @InjectModel(TransportRoute.name) private transportRouteModel: Model<TransportRouteDocument>,
  ) {}

  create(data: Partial<TransportRoute>) {
    const created = new this.transportRouteModel(data);
    return created.save();
  }

  findAll() {
    return this.transportRouteModel.find().exec();
  }

  findOne(id: string) {
    return this.transportRouteModel.findById(id).exec();
  }

  update(id: string, data: Partial<TransportRoute>) {
    return this.transportRouteModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string) {
    return this.transportRouteModel.findByIdAndDelete(id).exec();
  }

  /**
   * Import all .geojson files from a source folder into the transport routes collection.
   * Returns number of inserted documents.
   */
  async importFromFolder(srcFolder: string) {
    const absSrc = join(process.cwd(), srcFolder);

    if (!existsSync(absSrc)) {
      throw new Error(`Source folder not found: ${absSrc}`);
    }

    const files = readdirSync(absSrc).filter((f) => f.toLowerCase().endsWith('.geojson'));
    if (!files.length) return 0;

    const uploadsDir = join(process.cwd(), 'uploads', 'transport-routes');
    if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

    const docs: Partial<TransportRoute & { geojson?: any }>[] = [];

    for (const file of files) {
      const srcPath = join(absSrc, file);
      const destFilename = `${Date.now()}-${file}`;
      const destPath = join(uploadsDir, destFilename);

      // copy file
      copyFileSync(srcPath, destPath);

      // parse content
      let geoobj = null;
      try {
        const raw = readFileSync(destPath, 'utf8');
        geoobj = JSON.parse(raw);
      } catch (e) {
        // skip parsing but still create entry with archivoUrl
        geoobj = null;
      }

      const nombre = file.replace(/\.[^.]+$/, '');

      docs.push({
        nombre,
        tipoArchivo: 'geojson',
        archivoUrl: `/uploads/transport-routes/${destFilename}`,
        geojson: geoobj,
      });
    }

    if (!docs.length) return 0;

    const inserted = await this.transportRouteModel.insertMany(docs as any);
    return Array.isArray(inserted) ? inserted.length : docs.length;
  }

  /**
   * Obtener todas las rutas desde los archivos GeoJSON en individual-rutes
   * Extrae los nombres de cada ruta desde las propiedades de los features y devuelve una lista
   * @returns Array de objetos con id, name, fileName y routeNumber
   */
  async getAllRoutesFromFiles(): Promise<Array<{id: string, name: string, fileName: string, routeNumber: number}>> {
    const routesFolder = join(process.cwd(), 'src', 'GeoJSON', 'individual-rutes');
    
    if (!existsSync(routesFolder)) {
      throw new Error(`Routes folder not found: ${routesFolder}`);
    }

    const files = readdirSync(routesFolder)
      .filter((f) => f.toLowerCase().endsWith('.geojson'))
      .sort((a, b) => {
        // Ordenar por número de ruta
        const numA = parseInt(a.match(/ruta_(\d+)/)?.[1] || '0');
        const numB = parseInt(b.match(/ruta_(\d+)/)?.[1] || '0');
        return numA - numB;
      });

    const routes: Array<{id: string, name: string, fileName: string, routeNumber: number}> = [];

    for (const file of files) {
      try {
        const filePath = join(routesFolder, file);
        const content = readFileSync(filePath, 'utf8');
        const geoJson = JSON.parse(content);

        // Extraer número de ruta del nombre del archivo
        const routeNumberMatch = file.match(/ruta_(\d+)/);
        const routeNumber = routeNumberMatch ? parseInt(routeNumberMatch[1]) : 0;

        // Extraer nombres de las rutas desde las propiedades de los features
        const hasNamedFeatures = geoJson?.features?.some((f: any) => f?.properties?.Name);
        
        if (hasNamedFeatures) {
          geoJson.features.forEach((feature: any, index: number) => {
            if (feature?.properties?.Name) {
              routes.push({
                id: `${routeNumber}_${index}`,
                name: feature.properties.Name,
                fileName: file,
                routeNumber: routeNumber
              });
            }
          });
        } else {
          // Si no hay features con nombres, usar el nombre del archivo como fallback
          routes.push({
            id: `${routeNumber}`,
            name: `Ruta ${routeNumber}`,
            fileName: file,
            routeNumber: routeNumber
          });
        }
      } catch (err) {
        console.error(`Error al leer archivo ${file}:`, err);
        // Continuar con el siguiente archivo
      }
    }

    // Ordenar por nombre
    return routes.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Obtener un archivo GeoJSON específico por nombre de archivo
   * @param fileName - Nombre del archivo GeoJSON (ej: ruta_2.geojson)
   * @returns Objeto GeoJSON parseado
   * @throws Error si el archivo no existe
   */
  async getRouteFile(fileName: string): Promise<any> {
    const filePath = join(process.cwd(), 'src', 'GeoJSON', 'individual-rutes', fileName);
    
    if (!existsSync(filePath)) {
      throw new Error(`Route file not found: ${fileName}`);
    }

    const content = readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  }
}
