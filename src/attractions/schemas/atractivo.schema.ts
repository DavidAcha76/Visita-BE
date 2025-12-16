import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Subdocumentos
class Coords {
  @Prop()
  lng: string;

  @Prop()
  lat: string;
}

class Location {
  @Prop({ type: Coords })
  coords: Coords;

  @Prop()
  address: string;
}

class Contact {
  @Prop()
  link: string;

  @Prop()
  mail: string;

  @Prop()
  phone: string;
}

class Metadata {
  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  views: number;
}

@Schema({ collection: 'attractions', timestamps: true })
export class Atractivo extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Location })
  location: Location;

  @Prop()
  coverUrl: string;

  @Prop({ type: [String], default: [] })
  categories: string[];

  @Prop({ type: [String], default: [] })
  mainCategories: string[];

  @Prop()
  accessibility: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop()
  rating: number;

  @Prop()
  order: number;

  @Prop({ type: Contact })
  contact: Contact;

  @Prop({ type: Metadata, default: () => ({}) })
  metadata: Metadata;

  @Prop()
  slug: string;

  @Prop()
  historyId: string;

  @Prop({ type: [String], default: [] })
  faq: string[];

  @Prop({ type: [String], default: [] })
  foods: string[];
}

export const AtractivoSchema = SchemaFactory.createForClass(Atractivo);
