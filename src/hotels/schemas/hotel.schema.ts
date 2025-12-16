import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Precio {
  @Prop({ required: true })
  check_in: string;

  @Prop({ required: true })
  check_out: string;
}

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

class Contacto {
  @Prop()
  telefono?: string;

  @Prop()
  email?: string;

  @Prop()
  sitio_web?: string;
}

@Schema({ collection: 'hotels', timestamps: true })
export class Hotel extends Document {
  @Prop({ required: true })
  declare id: string;

  @Prop()
  slug?: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  estrellas: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ type: [String], default: [] })
  categorias: string[];

  @Prop({ type: [String], default: [] })
  amenidades: string[];

  @Prop({ type: [String], default: [] })
  tipos_habitacion: string[];

  @Prop({ type: Precio, required: true })
  precio: Precio;

  @Prop({ type: Ubicacion })
  ubicacion?: Ubicacion;

  @Prop({ type: Contacto })
  contacto?: Contacto;

  @Prop({ default: true })
  disponible: boolean;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
