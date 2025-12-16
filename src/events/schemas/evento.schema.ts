import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'events', timestamps: true })
export class Evento extends Document {
  @Prop()
  id: string;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: [String], default: [] })
  categorias: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  fechas: string;

  @Prop()
  horario: string;

  @Prop()
  lugar: string;

  @Prop()
  organizador: string;

  @Prop()
  telefono: string;

  @Prop()
  email: string;

  @Prop()
  precio: number;

  @Prop({ default: 'BOB' })
  moneda: string;

  @Prop({ default: false })
  gratis: boolean;

  @Prop()
  capacidad: number;

  @Prop()
  url_tickets: string;

  @Prop({ default: true })
  disponible: boolean;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);
