import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Location {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  place: string;

  @Prop({ type: Object })
  coords: {
    lng: string;
    lat: string;
  };
}

@Schema({ collection: 'announcements', timestamps: true })
export class Announcement extends Document {
  @Prop({ required: true })
  date: string;

  @Prop({ default: '' })
  coverUrl: string;

  @Prop({ default: 'red' })
  color: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: Location, required: true })
  location: Location;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: '' })
  link: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
