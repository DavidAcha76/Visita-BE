import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'main-categories', timestamps: true })
export class MainCategory extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  isFeatured: boolean;

  @Prop({ default: '' })
  photoUrl: string;

  @Prop({ default: '' })
  icon: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ required: true })
  order: number;
}

export const MainCategorySchema = SchemaFactory.createForClass(MainCategory);
