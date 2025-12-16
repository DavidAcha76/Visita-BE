import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Metadata {
  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  views: number;
}

@Schema({ collection: 'foods', timestamps: true })
export class Food extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  order: number;

  @Prop({ default: 5 })
  rating: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: '' })
  coverUrl: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: Metadata, default: () => ({}) })
  metadata: Metadata;

  @Prop({ default: '' })
  slug: string;

  @Prop({ type: [String], default: [] })
  ingredients: string[];
}

export const FoodSchema = SchemaFactory.createForClass(Food);
