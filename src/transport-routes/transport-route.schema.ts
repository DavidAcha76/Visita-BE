import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransportRouteDocument = TransportRoute & Document;

@Schema({ timestamps: true })
export class TransportRoute {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  archivoUrl: string;

  @Prop({ required: true, enum: ['kml', 'geojson'] })
  tipoArchivo: 'kml' | 'geojson';

  // If the uploaded file is a geojson, store the parsed GeoJSON object here
  @Prop({ type: Object, required: false })
  geojson?: any;
}

export const TransportRouteSchema = SchemaFactory.createForClass(TransportRoute);
