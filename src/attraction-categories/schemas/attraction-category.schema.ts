import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'attraction-categories', timestamps: true })
export class AttractionCategory extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ required: true })
  order: number;
}

export const AttractionCategorySchema = SchemaFactory.createForClass(AttractionCategory);
