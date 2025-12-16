import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'reviews', timestamps: true })
export class Review extends Document {
  @Prop({ required: true })
  declare id: string;

  @Prop({ required: true })
  entidad_id: string;

  @Prop({ required: true })
  entidad_tipo: string;

  @Prop({ required: true })
  usuario: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  comentario: string;

  @Prop({ required: true })
  fecha: string;

  @Prop({ default: '' })
  viaje_tipo: string;

  @Prop({ type: [String], default: [] })
  aspectos_positivos: string[];

  @Prop({ type: [String], default: [] })
  aspectos_negativos: string[];

  @Prop({ default: false })
  recomendado: boolean;

  @Prop({ default: false })
  verificado: boolean;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
