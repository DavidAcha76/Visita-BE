import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'restaurant-categories', timestamps: true })
export class RestaurantCategory extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ required: true })
  order: number;
}

export const RestaurantCategorySchema = SchemaFactory.createForClass(RestaurantCategory);
