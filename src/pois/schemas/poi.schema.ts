import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Ubicacion {
  @Prop()
  direccion?: string;

  @Prop()
  ciudad?: string;

  @Prop()
  pais?: string;

  @Prop({ type: Object })
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

@Schema({ collection: 'pois', timestamps: true })
export class Poi extends Document {
  @Prop({ required: true })
  declare id: string;

  @Prop()
  slug?: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: [String], default: [] })
  categorias: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Ubicacion })
  ubicacion?: Ubicacion;

  @Prop({ required: true })
  horario: string;

  @Prop({ default: 0 })
  costo_entrada: number;

  @Prop({ default: '' })
  moneda: string;

  @Prop({ default: false })
  gratis: boolean;

  @Prop({ type: [String], default: [] })
  actividades: string[];

  @Prop({ type: [String], default: [] })
  recomendaciones: string[];

  @Prop({ default: true })
  disponible: boolean;
}

export const PoiSchema = SchemaFactory.createForClass(Poi);
