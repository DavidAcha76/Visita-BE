import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'user', timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  declare id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  rol: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  debe_cambiar_password: boolean;

  @Prop({ default: 'activo' })
  estado: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
