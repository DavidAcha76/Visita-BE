export interface Metadata {
  likes?: number;
  views?: number;
}

export interface Food {
  _id?: string;
  name: string;
  order: number;
  rating?: number;
  description: string;
  coverUrl?: string;
  available?: boolean;
  active?: boolean;
  metadata?: Metadata;
  slug?: string;
  ingredients?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
